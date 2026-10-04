"""
EventEase Luxury Edition - Backend API Server (Deployable on Render.com)
Founder & Lead Architect: Warisha Noor (warishanoor301@gmail.com | 0340 8704093)
12 Pakistani Cities | 72+ Verified Vendors | Real Neon PostgreSQL Persistence
with Automatic In-Memory Fallback (works even without a database connected).
"""

import os
import uuid
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
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

# ----------------------------------------------------------------------------
# IN-MEMORY FALLBACK STORE (used automatically whenever Neon/Postgres is
# unreachable, so the site keeps working end-to-end even without a database).
# ----------------------------------------------------------------------------
MEMORY_VENDORS = list(DEFAULT_VENDORS)
MEMORY_PLANS = []
MEMORY_SPECIAL_EVENTS = []
MEMORY_USERS = {
    "warishanoor301@gmail.com": {
        "full_name": "Warisha Noor",
        "email": "warishanoor301@gmail.com",
        "phone": "0340 8704093",
        "city": "Lahore",
        "role": "Founder & Lead Event Architect",
        "password_hash": generate_password_hash("warisha123")
    }
}
MEMORY_MESSAGES = []


def get_db_connection():
    """Returns a live psycopg2 connection, or None if unreachable/unset."""
    if not DATABASE_URL:
        return None
    try:
        import psycopg2
        from psycopg2.extras import RealDictCursor
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor, connect_timeout=6)
        return conn
    except Exception as e:
        print(f"[EventEase DB Warning] {e}")
        return None


class _DbUnavailable:
    """Sentinel distinguishing 'database unreachable' from a legitimate empty/None result."""
    def __repr__(self):
        return "DB_UNAVAILABLE"


DB_UNAVAILABLE = _DbUnavailable()


def db_query(query, params=None, fetch="all", commit=False):
    """
    Helper to run a query against Neon. Returns the sentinel DB_UNAVAILABLE
    if the database is unreachable so callers can gracefully fall back to
    the in-memory store. A legitimate "no rows found" result returns None
    (for fetch="one") or an empty list (for fetch="all"), never the sentinel.
    """
    conn = get_db_connection()
    if conn is None:
        return DB_UNAVAILABLE
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(query, params or ())
                if commit:
                    conn.commit()
                if fetch == "all":
                    return [dict(row) for row in cur.fetchall()]
                if fetch == "one":
                    row = cur.fetchone()
                    return dict(row) if row else None
                return True
    except Exception as e:
        print(f"[EventEase DB Query Warning] {e}")
        return DB_UNAVAILABLE
    finally:
        conn.close()


def ensure_vendors_seeded():
    """On first ever startup with a connected Neon DB, auto-seed all 72 vendors."""
    existing = db_query("SELECT COUNT(*) AS total FROM vendors;", fetch="one")
    if existing is DB_UNAVAILABLE:
        return  # DB unreachable -- in-memory fallback will be used instead
    if existing and int(existing.get("total", 0)) > 0:
        return  # already seeded
    for v in DEFAULT_VENDORS:
        db_query(
            """
            INSERT INTO vendors (
                vendor_name, vendor_type, venue_subtype, main_category, city,
                onsite_location, manager_name, manager_title, years_experience,
                events_completed, certification_record, capacity_range,
                starting_rate_pkr, per_head_charge, contact_phone, rating,
                image_url, specialties, added_by_user
            ) VALUES (
                %(vendor_name)s, %(vendor_type)s, %(venue_subtype)s, %(main_category)s, %(city)s,
                %(onsite_location)s, %(manager_name)s, %(manager_title)s, %(years_experience)s,
                %(events_completed)s, %(certification_record)s, %(capacity_range)s,
                %(starting_rate_pkr)s, %(per_head_charge)s, %(contact_phone)s, %(rating)s,
                %(image_url)s, %(specialties)s, %(added_by_user)s
            );
            """,
            v, fetch="none", commit=True
        )
    print(f"[EventEase] Auto-seeded {len(DEFAULT_VENDORS)} vendors into Neon database.")


def ensure_founder_account():
    """Auto-creates the default Warisha Noor founder account inside Neon if missing."""
    existing = db_query("SELECT id FROM users WHERE email = %s;", ("warishanoor301@gmail.com",), fetch="one")
    if existing is DB_UNAVAILABLE:
        return  # DB unreachable -- in-memory fallback account already exists
    if existing:
        return  # founder account already present
    db_query(
        """
        INSERT INTO users (full_name, email, phone, city, role, password_hash)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (email) DO NOTHING;
        """,
        (
            "Warisha Noor", "warishanoor301@gmail.com", "0340 8704093",
            "Lahore", "Founder & Lead Event Architect",
            generate_password_hash("warisha123")
        ),
        fetch="none", commit=True
    )



with app.app_context():
    try:
        ensure_vendors_seeded()
        ensure_founder_account()
    except Exception as e:
        print(f"[EventEase Startup Seed Warning] {e}")


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/api/health", methods=["GET"])
def api_health():
    conn = get_db_connection()
    db_connected = conn is not None
    vendor_count = len(MEMORY_VENDORS)
    if conn:
        conn.close()
        result = db_query("SELECT COUNT(*) AS total FROM vendors;", fetch="one")
        if result and result is not DB_UNAVAILABLE:
            vendor_count = int(result.get("total", vendor_count))
    return jsonify({
        "status": "ok",
        "project": "EventEase Luxury Edition",
        "architect": "Warisha Noor",
        "contact_email": "warishanoor301@gmail.com",
        "contact_phone": "0340 8704093",
        "cities_count": len(PAKISTANI_CITIES),
        "vendors_count": vendor_count,
        "neon_db_connected": db_connected,
        "storage_mode": "Neon PostgreSQL (Live Database)" if db_connected else "In-Memory Fallback (Offline Mode)"
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
    the day-by-day & event-day hourly schedule, and persists the generated
    plan into Neon (falls back to in-memory if the database is unreachable).
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

    saved_row = db_query(
        """
        INSERT INTO saved_plans (
            plan_code, client_name, main_category, sub_category, city,
            location_mode, guests, estimated_budget_pkr, actual_cost_pkr,
            event_date, start_time, duration_hours
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *;
        """,
        (
            plan_code, event_title, data.get("main_category", "Social & Family"),
            data.get("sub_category", "Weddings (Barat & Nikkah)"), city, location_mode,
            int(data.get("guests", 250)), int(data.get("estimated_budget", 650000)),
            int(data.get("actual_cost", 650000)), event_date, start_time, duration_hours
        ),
        fetch="one", commit=True
    )

    if saved_row is DB_UNAVAILABLE:
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
            "created_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
        })

    return jsonify({
        "status": "ok",
        "plan_code": plan_code,
        "generated_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC"),
        "schedule": schedule_data,
        "persisted_to_database": saved_row is not DB_UNAVAILABLE,
        "submitted": data
    })


@app.route("/api/vendors", methods=["GET", "POST"])
def api_vendors():
    if request.method == "GET":
        city = request.args.get("city")
        category = request.args.get("category")
        vtype = request.args.get("type")

        db_results = db_query("SELECT * FROM vendors ORDER BY id ASC;")
        results = db_results if db_results is not DB_UNAVAILABLE else list(MEMORY_VENDORS)

        if city and city != "All":
            results = [v for v in results if v["city"].lower() == city.lower()]
        if category and category != "All":
            results = [v for v in results if v["main_category"] == category]
        if vtype and vtype != "All":
            results = [v for v in results if v["vendor_type"] == vtype]

        return jsonify({
            "count": len(results),
            "vendors": results,
            "source": "neon_database" if db_results is not DB_UNAVAILABLE else "in_memory_fallback"
        })

    data = request.get_json(silent=True) or {}
    new_vendor_payload = {
        "vendor_name": (data.get("vendor_name") or "Premier Banquet & Resource").strip(),
        "vendor_type": data.get("vendor_type", "Banquet & Marquee"),
        "venue_subtype": data.get("venue_subtype", data.get("vendor_type", "Banquet Hall")),
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

    saved_row = db_query(
        """
        INSERT INTO vendors (
            vendor_name, vendor_type, venue_subtype, main_category, city,
            onsite_location, manager_name, manager_title, years_experience,
            events_completed, certification_record, capacity_range,
            starting_rate_pkr, per_head_charge, contact_phone, rating,
            image_url, specialties, added_by_user
        ) VALUES (
            %(vendor_name)s, %(vendor_type)s, %(venue_subtype)s, %(main_category)s, %(city)s,
            %(onsite_location)s, %(manager_name)s, %(manager_title)s, %(years_experience)s,
            %(events_completed)s, %(certification_record)s, %(capacity_range)s,
            %(starting_rate_pkr)s, %(per_head_charge)s, %(contact_phone)s, %(rating)s,
            %(image_url)s, %(specialties)s, %(added_by_user)s
        ) RETURNING *;
        """,
        new_vendor_payload, fetch="one", commit=True
    )

    if saved_row is not DB_UNAVAILABLE:
        return jsonify({"status": "created", "vendor": saved_row, "persisted_to_database": True})

    new_vendor_payload["id"] = len(MEMORY_VENDORS) + 100
    MEMORY_VENDORS.insert(0, new_vendor_payload)
    return jsonify({"status": "created", "vendor": new_vendor_payload, "persisted_to_database": False})


@app.route("/api/special-events", methods=["GET", "POST"])
def api_special_events():
    if request.method == "GET":
        db_results = db_query("SELECT * FROM special_events ORDER BY id DESC;")
        results = db_results if db_results is not DB_UNAVAILABLE else list(MEMORY_SPECIAL_EVENTS)
        return jsonify({
            "special_events": results,
            "source": "neon_database" if db_results is not DB_UNAVAILABLE else "in_memory_fallback"
        })

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
        "signature_elements": (data.get("signature_elements") or "Custom Stage, VIP Protocol, Live Catering").strip()
    }

    saved_row = db_query(
        """
        INSERT INTO special_events (
            special_code, user_name, user_email, user_phone, event_date,
            custom_domain, title, city, custom_location, guests,
            total_budget_pkr, signature_elements
        ) VALUES (%(special_code)s, %(user_name)s, %(user_email)s, %(user_phone)s, %(event_date)s,
            %(custom_domain)s, %(title)s, %(city)s, %(custom_location)s, %(guests)s,
            %(total_budget_pkr)s, %(signature_elements)s)
        RETURNING *;
        """,
        entry, fetch="one", commit=True
    )

    if saved_row is DB_UNAVAILABLE:
        entry["created_at"] = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
        MEMORY_SPECIAL_EVENTS.insert(0, entry)

    final_entry = saved_row if saved_row is not DB_UNAVAILABLE else entry
    return jsonify({
        "status": "created",
        "special_event": final_entry,
        "persisted_to_database": saved_row is not DB_UNAVAILABLE,
        "note": f"A complete custom response will be emailed by Warisha Noor (warishanoor301@gmail.com) to {entry['user_email']}."
    })


@app.route("/api/auth/signup", methods=["POST"])
def api_signup():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()
    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    full_name = (data.get("full_name") or "Event Host").strip()
    phone = (data.get("phone") or "0340 8704093").strip()
    city = data.get("city", "Lahore")
    role = data.get("role", "Event Host & Planner")
    pw_hash = generate_password_hash(password)

    existing = db_query("SELECT id FROM users WHERE email = %s;", (email,), fetch="one")

    if existing is not DB_UNAVAILABLE:
        if existing:
            return jsonify({"error": "This email is already registered. Please login instead."}), 409
        saved_row = db_query(
            """
            INSERT INTO users (full_name, email, phone, city, role, password_hash)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id, full_name, email, phone, city, role, created_at;
            """,
            (full_name, email, phone, city, role, pw_hash), fetch="one", commit=True
        )
        return jsonify({"status": "ok", "user": saved_row, "persisted_to_database": True})

    # DB unreachable -- offline fallback mode
    if email in MEMORY_USERS:
        return jsonify({"error": "This email is already registered. Please login instead."}), 409
    user = {
        "full_name": full_name, "email": email, "phone": phone,
        "city": city, "role": role, "password_hash": pw_hash
    }
    MEMORY_USERS[email] = user
    public_user = {k: v for k, v in user.items() if k != "password_hash"}
    return jsonify({"status": "ok", "user": public_user, "persisted_to_database": False})


@app.route("/api/auth/login", methods=["POST"])
def api_login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()

    db_user = db_query("SELECT * FROM users WHERE email = %s;", (email,), fetch="one")

    if db_user is not DB_UNAVAILABLE:
        if not db_user:
            return jsonify({"error": "No account found with this email. Please sign up first."}), 404
        if not check_password_hash(db_user["password_hash"], password):
            return jsonify({"error": "Incorrect password. Please try again."}), 401
        public_user = {k: v for k, v in db_user.items() if k != "password_hash"}
        return jsonify({"status": "ok", "user": public_user, "persisted_to_database": True})

    # DB unreachable -- offline fallback mode (lenient, for demo continuity)
    user = MEMORY_USERS.get(email)
    if user is None:
        user = {
            "full_name": "Warisha Noor" if "warisha" in email else email.split("@")[0].title(),
            "email": email,
            "phone": "0340 8704093",
            "city": "Lahore",
            "role": "Founder & Lead Event Architect" if "warisha" in email else "Registered Event Planner",
            "password_hash": generate_password_hash(password or "demo123")
        }
        MEMORY_USERS[email] = user
    public_user = {k: v for k, v in user.items() if k != "password_hash"}
    return jsonify({"status": "ok", "user": public_user, "persisted_to_database": False})


@app.route("/api/contact", methods=["POST"])
def api_contact():
    data = request.get_json(silent=True) or {}
    msg = {
        "sender_name": data.get("sender_name", "Guest"),
        "sender_email": data.get("sender_email", ""),
        "sender_phone": data.get("sender_phone", ""),
        "event_category": data.get("event_category", "Social & Family"),
        "message": data.get("message", "")
    }

    saved_row = db_query(
        """
        INSERT INTO contact_messages (sender_name, sender_email, sender_phone, event_category, message)
        VALUES (%(sender_name)s, %(sender_email)s, %(sender_phone)s, %(event_category)s, %(message)s)
        RETURNING *;
        """,
        msg, fetch="one", commit=True
    )

    if saved_row is DB_UNAVAILABLE:
        msg["created_at"] = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
        MEMORY_MESSAGES.insert(0, msg)

    return jsonify({
        "status": "received",
        "recipient": "Warisha Noor (warishanoor301@gmail.com | 0340 8704093)",
        "entry": saved_row if saved_row is not DB_UNAVAILABLE else msg,
        "persisted_to_database": saved_row is not DB_UNAVAILABLE
    })


@app.route("/api/dashboard", methods=["GET"])
def api_dashboard():
    db_plans = db_query("SELECT * FROM saved_plans ORDER BY id DESC LIMIT 15;")
    db_special = db_query("SELECT * FROM special_events ORDER BY id DESC LIMIT 15;")
    db_vendors = db_query("SELECT * FROM vendors ORDER BY id DESC LIMIT 24;")

    return jsonify({
        "saved_plans": db_plans if db_plans is not DB_UNAVAILABLE else MEMORY_PLANS[:15],
        "special_events": db_special if db_special is not DB_UNAVAILABLE else MEMORY_SPECIAL_EVENTS[:15],
        "vendors": db_vendors if db_vendors is not DB_UNAVAILABLE else MEMORY_VENDORS[:24],
        "source": "neon_database" if db_plans is not DB_UNAVAILABLE else "in_memory_fallback"
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
