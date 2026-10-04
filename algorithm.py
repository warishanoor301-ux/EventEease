"""
EventEase Luxury Edition - Granular Interactive Event Planner & Cost Engine
Founder & Lead Architect: Warisha Noor (warishanoor301@gmail.com | 0340 8704093)
100% English Interface | 12 Pakistani Cities | 72 Unique Vendor Images | 22-Requirement Engine
"""

from datetime import datetime, timedelta

PAKISTANI_CITIES = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Abbottabad"
]

CATEGORY_TAXONOMY = {
    "Social & Family": {
        "theme_key": "burgundy-gold",
        "theme_label": "Royal Burgundy & Imperial Gold",
        "subcategories": [
            "Weddings (Barat & Nikkah)",
            "Walima Receptions",
            "Mehndi & Mayun Nights",
            "Birthdays & Milestone Parties",
            "Wedding Anniversaries",
            "Family Reunions & Grand Dawats",
            "Baby Showers & Godh Bharai",
            "Aqeeqa Ceremonies",
            "Engagement & Mangni Ceremonies",
            "Bridal Showers & Dholki"
        ]
    },
    "Corporate & Business": {
        "theme_key": "slate-gold",
        "theme_label": "Executive Obsidian & Champagne Gold",
        "subcategories": [
            "Corporate Conferences",
            "Team Building Retreats",
            "Executive Seminars & Workshops",
            "Board of Directors Meetings",
            "Trade Exhibitions & Expos",
            "Flagship Product Launches",
            "Annual Excellence Award Galas",
            "Corporate Networking Dinners",
            "Investor & FinTech Summits",
            "Brand Activations"
        ]
    },
    "Entertainment & Performance": {
        "theme_key": "plum-gold",
        "theme_label": "Velvet Crimson Plum & Stage Gold",
        "subcategories": [
            "Live Music Concerts",
            "Standup Comedy Specials",
            "Theater & Stage Dramas",
            "Cultural & Food Festivals",
            "Couture Fashion Shows",
            "Sufi Qawwali Nights",
            "Ghazal & Mushaira Evenings",
            "Film Premieres & Screenings",
            "Artist Meet & Greets",
            "Youth Performing Arts Carnivals"
        ]
    },
    "Academic & Educational": {
        "theme_key": "navy-gold",
        "theme_label": "Royal Navy Blue & Academic Gold",
        "subcategories": [
            "Academic Conventions",
            "Inter-University & School Quizzes",
            "Professional Training Sessions",
            "Tech & Leadership Bootcamps",
            "School & College Annual Fests",
            "University Convocations",
            "Science & Robotics Olympiads",
            "Research & Medical Symposia",
            "Career & Admissions Fairs",
            "Parliamentary Debate Championships"
        ]
    },
    "Community & Cultural": {
        "theme_key": "emerald-gold",
        "theme_label": "Heritage Emerald & Mughal Gold",
        "subcategories": [
            "Religious Gatherings (Milad, Iftar, Khatam)",
            "Charity Fundraising Galas",
            "Community Townhall Meetups",
            "Local Welfare & Civic Drives",
            "Spring & Heritage Cultural Melas",
            "Artisans & Crafts Bazaars",
            "Free Medical & Blood Donation Camps",
            "Literary Book Fairs",
            "Civic Award Ceremonies",
            "Neighborhood Harmony Dinners"
        ]
    }
}

CITY_AREAS = {
    "Lahore": ["Main Gulberg Boulevard", "Canal Bank Johar Town", "Bedian Road DHA Phase 7"],
    "Karachi": ["Clifton Block 4 & Sea View", "DHA Phase 8 Creek", "Shahrah-e-Faisal PECHS"],
    "Islamabad": ["Kashmir Highway E-11", "Constitution Ave Blue Area", "Bani Gala Park Road"],
    "Rawalpindi": ["Bahria Town Phase 7", "Main Murree Road Saddar", "Chaklala Scheme III"],
    "Faisalabad": ["Main Canal Expressway", "Peoples Colony D-Ground", "Susan Road Kohinoor"],
    "Multan": ["Main Bosan Road", "Multan Cantt Quaid Ave", "Gulgasht Colony"],
    "Peshawar": ["University Road Town", "Hayatabad Phase 3", "Peshawar Cantt Mall Road"],
    "Quetta": ["Jinnah Road Cantt", "Zarghoon Road", "Samungli Road"],
    "Sialkot": ["Cantt Aziz Shaheed Road", "Kashmir Road", "Citi Housing Boulevard"],
    "Gujranwala": ["Main GT Road Model Town", "Citi Housing Phase 1", "Civil Lines"],
    "Hyderabad": ["Autobahn Road Latifabad", "Qasimabad Main Boulevard", "Thandi Sarak"],
    "Abbottabad": ["Mansehra Road Supply", "PMA Kakul Road", "Mall Road Pine View"]
}


def build_comprehensive_vendors():
    """
    Generates 72 verified vendors (6 per city across all 12 Pakistani cities),
    each assigned its own unique image file assets/images/vendors/vendor-{vid}.jpg.
    """
    vendors = []
    vid = 1
    for city in PAKISTANI_CITIES:
        areas = CITY_AREAS.get(city, ["Main Boulevard", "Central Avenue", "Cantt Road"])
        city_templates = [
            {
                "vendor_name": f"Qasar-e-Shahi Grand Marquee ({city})",
                "vendor_type": "Banquet & Marquee",
                "venue_subtype": "Grand Marquee",
                "main_category": "Social & Family",
                "onsite_location": f"Plot 12-A, {areas[0]}, {city}",
                "manager_name": f"Mian Tariq Mehmood ({city})",
                "manager_title": "Managing Director & Chief Venue Architect",
                "years_experience": 16,
                "events_completed": 1350,
                "certification_record": f"{city} Hospitality & Food Authority Grade-A (#HFA-{vid}01)",
                "capacity_range": "200 to 1,200 Guests",
                "starting_rate_pkr": 185000,
                "per_head_charge": 250,
                "contact_phone": f"0300 41122{vid:02d}",
                "rating": 4.9,
                "specialties": "Royal Barat & Walima Stages, Chiller AC, Standby Generator, Valet Parking"
            },
            {
                "vendor_name": f"Imperial Crown Boutique & Banquet Hall ({city})",
                "vendor_type": "Banquet & Marquee",
                "venue_subtype": "Banquet Hall",
                "main_category": "Corporate & Business",
                "onsite_location": f"Executive Tower, {areas[1]}, {city}",
                "manager_name": f"Syed Farhan Ali ({city})",
                "manager_title": "Director Corporate & Boutique Events",
                "years_experience": 14,
                "events_completed": 980,
                "certification_record": f"{city} Chamber of Commerce Verified (#CC-{vid}02)",
                "capacity_range": "80 to 650 Guests",
                "starting_rate_pkr": 115000,
                "per_head_charge": 180,
                "contact_phone": f"0321 84455{vid:02d}",
                "rating": 4.8,
                "specialties": "Corporate Galas, Boutique Weddings, SMD LED Wall, Acoustic Sound, Backup Power"
            },
            {
                "vendor_name": f"Heritage Green Lawn & Farmhouse ({city})",
                "vendor_type": "Outdoor Lawn & Farmhouse",
                "venue_subtype": "Outdoor Lawn / Farmhouse",
                "main_category": "Entertainment & Performance",
                "onsite_location": f"Garden Estate, {areas[2]}, {city}",
                "manager_name": f"Zainab Afridi ({city})",
                "manager_title": "Creative Producer & Outdoor Venue Head",
                "years_experience": 12,
                "events_completed": 720,
                "certification_record": f"{city} Development Authority Approved (#DA-{vid}03)",
                "capacity_range": "100 to 1,000 Guests",
                "starting_rate_pkr": 135000,
                "per_head_charge": 140,
                "contact_phone": f"0333 51122{vid:02d}",
                "rating": 4.9,
                "specialties": "Sufi Qawwali Nights, Mehndi Lawns, Concerts, Waterproof German Tent Option"
            },
            {
                "vendor_name": f"Aiwan-e-Ilm Academic & Cultural Auditorium ({city})",
                "vendor_type": "Convention & Auditorium",
                "venue_subtype": "Convention Auditorium",
                "main_category": "Academic & Educational",
                "onsite_location": f"University Avenue, {areas[0]}, {city}",
                "manager_name": f"Dr. Kamran Siddiqui ({city})",
                "manager_title": "Director Academic Conventions & Seminars",
                "years_experience": 18,
                "events_completed": 890,
                "certification_record": f"HEC & Civic Council Certified (#HEC-{vid}04)",
                "capacity_range": "100 to 1,400 Delegates",
                "starting_rate_pkr": 125000,
                "per_head_charge": 120,
                "contact_phone": f"0345 67788{vid:02d}",
                "rating": 4.8,
                "specialties": "Convocations, Quizzes, Bootcamps, Charity Galas, Digital Podium & Projection"
            },
            {
                "vendor_name": f"Shahi Dastarkhwan Copper Handi Caterers ({city})",
                "vendor_type": "Royal Catering",
                "venue_subtype": "Catering Partner",
                "main_category": "Social & Family",
                "onsite_location": f"Culinary Complex, {areas[1]}, {city}",
                "manager_name": f"Haji Abdul Rehman Qureshi ({city})",
                "manager_title": "Master Executive Chef & Culinary Director",
                "years_experience": 22,
                "events_completed": 2900,
                "certification_record": f"ISO 22000 & Halal Food Authority (#HFA-CAT-{vid}05)",
                "capacity_range": "50 to 3,500 Guests",
                "starting_rate_pkr": 1350,
                "per_head_charge": 0,
                "contact_phone": f"0301 77889{vid:02d}",
                "rating": 5.0,
                "specialties": "Mutton Raan Roast, Zafrani Pulao, Live Seekh Kabab Grill, Kunafa & Kashmiri Chai"
            },
            {
                "vendor_name": f"Noor-e-Jahan Floral Decor & Cinema Studio ({city})",
                "vendor_type": "Decor, Sound & Photography",
                "venue_subtype": "Decor & Media Partner",
                "main_category": "Community & Cultural",
                "onsite_location": f"Design Studio 9, {areas[2]}, {city}",
                "manager_name": f"Bilal & Ayesha Mansoor ({city})",
                "manager_title": "Principal Stage Decorator & Visual Director",
                "years_experience": 11,
                "events_completed": 1120,
                "certification_record": f"Pakistan Event Designers Guild (#PEDG-{vid}06)",
                "capacity_range": "All Event Sizes",
                "starting_rate_pkr": 65000,
                "per_head_charge": 0,
                "contact_phone": f"0312 99001{vid:02d}",
                "rating": 4.9,
                "specialties": "Fresh Rose & Mughal Stages, DMX Truss Lighting, Line-Array Sound, 4K Drone & DSLR"
            }
        ]
        for item in city_templates:
            vendors.append({
                "id": vid,
                "city": city,
                "image_url": f"assets/images/vendors/vendor-{vid}.jpg",
                "added_by_user": "Warisha Noor (Verified)",
                **item
            })
            vid += 1
    return vendors


DEFAULT_VENDORS = build_comprehensive_vendors()


def generate_countdown_and_day_schedule(event_date_str, start_time_str, duration_hours, event_title, city, location_mode):
    """
    Generates a complete Day-by-Day preparation calendar from Today (2026-10-04)
    up to the user's selected Final Event Date, plus an Hour-by-Hour schedule for Event Day.
    """
    today = datetime(2026, 10, 4)
    try:
        target_date = datetime.strptime(event_date_str, "%Y-%m-%d")
    except Exception:
        target_date = today + timedelta(days=30)

    if target_date <= today:
        target_date = today + timedelta(days=14)

    days_remaining = (target_date - today).days

    def fmt_date(dt):
        return dt.strftime("%d %b %Y (%A)")

    d_lock = today
    d_venue = today + timedelta(days=max(1, int(days_remaining * 0.12)))
    d_invites = today + timedelta(days=max(2, int(days_remaining * 0.30)))
    d_catering = today + timedelta(days=max(3, int(days_remaining * 0.50)))
    d_decor_av = today + timedelta(days=max(4, int(days_remaining * 0.72)))
    d_rehearsal = target_date - timedelta(days=2)
    d_eve = target_date - timedelta(days=1)

    pre_event_milestones = [
        {
            "date": fmt_date(d_lock),
            "phase": "Day 01 — Today (Master Plan & Budget Lock)",
            "tasks": f"Lock total budget, finalize guest count, and confirm '{event_title}' master blueprint in {city}."
        },
        {
            "date": fmt_date(d_venue),
            "phase": "Phase 02 — Venue / Platform Booking & 30% Advance",
            "tasks": (
                "Configure Virtual Meeting Room links, streaming test & registration form."
                if location_mode == "Online"
                else f"Sign written contract with selected {city} Venue/Hall, pay 30% booking advance, and lock generator & AC clauses."
            )
        },
        {
            "date": fmt_date(d_invites),
            "phase": "Phase 03 — Guest List & Invitations Dispatch",
            "tasks": "Finalize VIP, Family & Delegate list; send out WhatsApp Digital Invites and printed cards with location pin."
        },
        {
            "date": fmt_date(d_catering),
            "phase": "Phase 04 — Catering Menu Tasting & Ration Lock",
            "tasks": "Confirm selected dishes, per-head count (+5% buffer), welcome drinks, and special dietary arrangements."
        },
        {
            "date": fmt_date(d_decor_av),
            "phase": "Phase 05 — Stage Decor, Sound, Lighting & Media Briefing",
            "tasks": "Approve stage floral color palette, DMX lighting plan, wireless mics, and photography/drone shot list."
        },
        {
            "date": fmt_date(d_rehearsal),
            "phase": "Phase 06 — 48 Hours Before Event (NOC, Security & Staff Briefing)",
            "tasks": "Confirm waiters, security guards, walkthrough gate, parking/shuttle plan, and municipal NOC permits."
        },
        {
            "date": fmt_date(d_eve),
            "phase": "Phase 07 — 24 Hours Before Event (Power Backup & Medical Kit Check)",
            "tasks": "Verify generator diesel tank full, prepare final vendor payment envelopes, and pack First-Aid medical kit."
        }
    ]

    try:
        hr, mn = [int(x) for x in start_time_str.split(":")]
    except Exception:
        hr, mn = 19, 0

    base_dt = target_date.replace(hour=hr, minute=mn)
    dur = max(2, min(10, int(duration_hours or 4)))

    def fmt_t(dt_obj):
        return dt_obj.strftime("%I:%M %p")

    event_day_hourly = [
        {
            "time": fmt_t(base_dt - timedelta(hours=3)),
            "activity": "On-Site Setup & Stage / Tent Inspection",
            "detail": "Stage florals, seating rows, table covers, and washroom hygiene inspection completed."
        },
        {
            "time": fmt_t(base_dt - timedelta(hours=1, minutes=30)),
            "activity": "Power Backup, Sound & Lighting Line-Check",
            "detail": "Test standby diesel generator switchover, wireless microphones, stage spotlights, and chiller AC."
        },
        {
            "time": fmt_t(base_dt - timedelta(minutes=45)),
            "activity": "Catering Arrival, Security Gate & Staff Deployment",
            "detail": "Hot food chaffing dishes positioned; security guards, valet team, and reception ushers take positions."
        },
        {
            "time": fmt_t(base_dt),
            "activity": "Guest Arrival & Welcome Drinks Reception",
            "detail": "Guests welcomed at entrance archway; welcome drinks served and portrait photography begins."
        },
        {
            "time": fmt_t(base_dt + timedelta(minutes=45)),
            "activity": "Main Program / Stage Ceremony / Keynote",
            "detail": "Formal stage arrival, anchor announcements, main event ceremony, performances, or speeches."
        },
        {
            "time": fmt_t(base_dt + timedelta(hours=max(1, dur - 2))),
            "activity": "Grand Buffet / Catering Service Opens",
            "detail": "VIP tables and main buffet counters open smoothly; live BBQ, tandoor naans, and desserts served."
        },
        {
            "time": fmt_t(base_dt + timedelta(hours=max(2, dur - 1))),
            "activity": "Kashmiri Chai / Coffee Service & Group Portraits",
            "detail": "Hot beverages served; family/delegate group photos and guest farewell."
        },
        {
            "time": fmt_t(base_dt + timedelta(hours=dur)),
            "activity": "Vendor Final Settlement, Food Packing & Venue Cleanup",
            "detail": "Pack surplus food safely, count rental crockery/furniture, clear vendor balances, and complete cleanup."
        }
    ]

    return {
        "today_date": fmt_date(today),
        "event_date": fmt_date(target_date),
        "days_remaining": days_remaining,
        "pre_event_milestones": pre_event_milestones,
        "event_day_hourly": event_day_hourly
    }
