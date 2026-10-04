"""
EventEase Luxury Edition - Backend API Server (Deployable on Render.com)
Founder & Lead Architect: Warisha Noor (warishanoor301@gmail.com | 0340 8704093)
12 Pakistani Cities | 72+ Verified Vendors | Granular 22-Requirement Cost Engine
"""

import os
import json
import uuid
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

from algorithm import (
    PAKISTANI_CITIES,
    CATEGORY_TAXONOMY,
    DEFAULT_VENDORS,
    generate_countdown_and_day_schedule
)

load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app, resources={r"/api/*": {"origins": "*"}})

DATABASE_URL = os.environ.get("DATABASE_URL", "").strip()
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

MEMORY_VENDORS = list(DEFAULT_VENDORS)
MEMORY_PLANS = []
MEMORY_SPECIAL_EVENTS = [
    {
        "special_code": "SPEC-701",
        "user_name": "Warisha Noor",
        "user_email": "warishanoor301@gmail.com",
        "user_phone": "0340 8704093",
        "event_date": "2026-12-20",
        "custom_domain": "Heritage Fort Nikkah & Qawwali Mehfil",
        "title": "Shahi Mughal Fort Nikkah & Qawwali Mehfil",
        "city": "Lahore",
        "custom_location": "Royal Heritage Courtyard, Walled City View, Lahore",
        "guests": 350,
        "total_budget_pkr": 1250000,
        "signature_elements": "Velvet Burgundy & Antique Gold Stage, Live Classical Qawwali Ensemble, Copper Handi Mutton Raan Feast, Valet & Protocol Security",
        "created_at": "2026-10-04 12:00 UTC"
    }
]
MEMORY_USERS = {
    "warishanoor301@gmail.com": {
        "full_name": "Warisha Noor",
        "email": "warishanoor301@gmail.com",
        "phone": "0340 8704093",
        "city": "Lahore",
        "role": "Founder & Lead Event Architect"
    }
}
MEMORY_MESSAGES = []


def get_db_connection():
    if not DATABASE_URL:
        return None
    try:
        import psycopg2
        from psycopg2.extras import RealDictCursor
        return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor, connect_timeout=6)
    except Exception as e:
        print(f"[EventEase DB Warning] {e}")
        return None


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/api/health", methods=["GET"])
def api_health():
    conn = get_db_connection()
    db_connected = conn is not None
    if conn:
        conn.close()
    return jsonify({
        "status": "ok",
        "project": "EventEase Luxury Edition",
        "architect": "Warisha Noor",
        "contact_email": "warishanoor301@gmail.com",
        "contact_phone": "0340 8704093",
        "cities_count": len(PAKISTANI_CITIES),
        "vendors_count": len(MEMORY_VENDORS),
        "neon_db_connected": db_connected
    })


@app.route("/api/categories", methods=["GET"])
def api_categories():
    return jsonify({
        "cities": PAKISTANI_CITIES,
        "categories": CATEGORY_TAXONOMY
    })


@app.route("/api/analyze", methods=["POST"])
def api_analyze():
    """
    Accepts the full granular 22-Requirement Configurator payload, computes
    the day-by-day & event-day hourly schedule, compares Estimated Budget vs Actual Cost,
    and saves the generated plan.
    """
    data = request.get_json(silent=True) or {}
    plan_code = "EE-" + uuid.uuid4().hex[:6].upper()

    event_title = data.get("client_name", "Royal Event Plan")
    city = data.get("city", "Lahore")
    location_mode = data.get("location_mode", "On-Site")
    event_date = data.get("event_date", "2026-11-15")
    start_time = data.get("start_time", "19:00")
    duration_hours = int(data.get("duration_hours", 4))

    schedule_data = generate_countdown_and_day_schedule(
        event_date_str=event_date,
        start_time_str=start_time,
        duration_hours=duration_hours,
        event_title=event_title,
        city=city,
        location_mode=location_mode
    )

    response_payload = {
        "status": "ok",
        "plan_code": plan_code,
        "generated_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC"),
        "schedule": schedule_data,
        "submitted": data
    }

    MEMORY_PLANS.insert(0, {
        "plan_code": plan_code,
        "client_name": event_title,
        "main_category": data.get("main_category", "Social & Family"),
        "sub_category": data.get("sub_category", "Weddings (Barat & Nikkah)"),
        "city": city,
        "guests": int(data.get("guests", 250)),
        "estimated_budget_pkr": int(data.get("estimated_budget", 650000)),
        "actual_cost_pkr": int(data.get("actual_cost", 650000)),
        "event_date": event_date,
        "created_at": response_payload["generated_at"]
    })

    return jsonify(response_payload)


@app.route("/api/vendors", methods=["GET", "POST"])
def api_vendors():
    if request.method == "GET":
        city = request.args.get("city")
        category = request.args.get("category")
        vtype = request.args.get("type")
        results = list(MEMORY_VENDORS)
        if city and city != "All":
            results = [v for v in results if v["city"].lower() == city.lower()]
        if category and category != "All":
            results = [v for v in results if v["main_category"] == category]
        if vtype and vtype != "All":
            results = [v for v in results if v["vendor_type"] == vtype]
        return jsonify({"count": len(results), "vendors": results})

    data = request.get_json(silent=True) or {}
    new_vendor = {
        "id": len(MEMORY_VENDORS) + 100,
        "vendor_name": (data.get("vendor_name") or "Premier Banquet & Resource").strip(),
        "vendor_type": data.get("vendor_type", "Banquet & Marquee"),
        "venue_subtype": data.get("venue_subtype", "Banquet Hall"),
        "main_category": data.get("main_category", "Social & Family"),
        "city": data.get("city", "Lahore"),
        "onsite_location": (data.get("onsite_location") or "Main Boulevard, Central District").strip(),
        "manager_name": (data.get("manager_name") or "Senior Hospitality Director").strip(),
        "manager_title": (data.get("manager_title") or "Managing Partner & Event Head").strip(),
        "years_experience": int(data.get("years_experience", 12)),
        "events_completed": int(data.get("events_completed", 450)),
        "certification_record": (data.get("certification_record") or "Verified Hospitality & Food Authority Partner").strip(),
        "capacity_range": (data.get("capacity_range") or "100 to 800 Guests").strip(),
        "starting_rate_pkr": int(data.get("starting_rate_pkr", 150000)),
        "per_head_charge": int(data.get("per_head_charge", 150)),
        "contact_phone": (data.get("contact_phone") or "0340 8704093").strip(),
        "rating": 5.0,
        "image_url": data.get("image_url") or "assets/images/pakistani-banquet-marquee.jpg",
        "specialties": (data.get("specialties") or "Custom Stage Design, Chiller AC, Standby Generator & Full Catering").strip(),
        "added_by_user": data.get("added_by_user") or "Warisha Noor"
    }
    MEMORY_VENDORS.insert(0, new_vendor)
    return jsonify({"status": "created", "vendor": new_vendor})


@app.route("/api/special-events", methods=["GET", "POST"])
def api_special_events():
    if request.method == "GET":
        return jsonify({"special_events": MEMORY_SPECIAL_EVENTS})

    data = request.get_json(silent=True) or {}
    special_code = data.get("special_code") or ("SPEC-" + uuid.uuid4().hex[:5].upper())
    entry = {
        "special_code": special_code,
        "user_name": (data.get("user_name") or "Guest User").strip(),
        "user_email": (data.get("user_email") or "").strip(),
        "user_phone": (data.get("user_phone") or "").strip(),
        "event_date": data.get("event_date", ""),
        "custom_domain": (data.get("custom_domain") or "Custom Event Domain").strip(),
        "title": (data.get("title") or "Bespoke Signature Event").strip(),
        "city": data.get("city", "Lahore"),
        "custom_location": (data.get("custom_location") or "Private Heritage Venue").strip(),
        "guests": int(data.get("guests", 250)),
        "total_budget_pkr": int(data.get("total_budget_pkr", 850000)),
        "signature_elements": (data.get("signature_elements") or "Custom Stage, VIP Protocol, Live Catering").strip(),
        "created_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
    }
    MEMORY_SPECIAL_EVENTS.insert(0, entry)
    return jsonify({
        "status": "created",
        "special_event": entry,
        "note": f"A complete custom response will be emailed by Warisha Noor (warishanoor301@gmail.com) to {entry['user_email']}."
    })


@app.route("/api/auth/signup", methods=["POST"])
def api_signup():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    if not email:
        return jsonify({"error": "Email is required"}), 400
    user = {
        "full_name": (data.get("full_name") or "Event Host").strip(),
        "email": email,
        "phone": (data.get("phone") or "0340 8704093").strip(),
        "city": data.get("city", "Lahore"),
        "role": data.get("role", "Event Host & Planner")
    }
    MEMORY_USERS[email] = user
    return jsonify({"status": "ok", "user": user})


@app.route("/api/auth/login", methods=["POST"])
def api_login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "warishanoor301@gmail.com").strip().lower()
    user = MEMORY_USERS.get(email) or {
        "full_name": "Warisha Noor" if "warisha" in email else email.split("@")[0].title(),
        "email": email,
        "phone": "0340 8704093",
        "city": "Lahore",
        "role": "Founder & Lead Event Architect" if "warisha" in email else "Registered Event Planner"
    }
    MEMORY_USERS[email] = user
    return jsonify({"status": "ok", "user": user})


@app.route("/api/contact", methods=["POST"])
def api_contact():
    data = request.get_json(silent=True) or {}
    msg = {
        "sender_name": data.get("sender_name", "Guest"),
        "sender_email": data.get("sender_email", ""),
        "sender_phone": data.get("sender_phone", ""),
        "event_category": data.get("event_category", "Social & Family"),
        "message": data.get("message", ""),
        "created_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
    }
    MEMORY_MESSAGES.insert(0, msg)
    return jsonify({"status": "received", "recipient": "Warisha Noor (warishanoor301@gmail.com | 0340 8704093)", "entry": msg})


@app.route("/api/dashboard", methods=["GET"])
def api_dashboard():
    return jsonify({
        "saved_plans": MEMORY_PLANS[:12],
        "special_events": MEMORY_SPECIAL_EVENTS[:12],
        "vendors": MEMORY_VENDORS[:24]
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
