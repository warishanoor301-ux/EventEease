/**
 * EventEase Luxury Edition — Granular 22-Requirement Interactive Planner & Cost Engine
 * Founder & Lead Architect: Warisha Noor (warishanoor301@gmail.com | 0340 8704093)
 * 100% English Interface | 12 Pakistani Cities | 72 Unique Vendor Images | Auto Domain Theme
 */

const DEFAULT_RENDER_API_URL = "https://eventeease.onrender.com";

function getApiBaseUrl() {
    const saved = localStorage.getItem("EVENTEASE_API_URL");
    if (saved && saved.trim() !== "") {
        return saved.trim().replace(/\/+$/, "");
    }
    return DEFAULT_RENDER_API_URL.replace(/\/+$/, "");
}

function formatPKR(num) {
    return "PKR " + Math.round(Number(num || 0)).toLocaleString();
}

// ============================================================================
// 1. 12 MAJOR PAKISTANI CITIES & 5 EXPANDED EVENT DOMAINS (UNIQUE DOMAIN IMAGES)
// ============================================================================
const PAKISTANI_CITIES = [
    "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
    "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Abbottabad"
];

const CITY_AREAS = {
    Lahore: ["Main Gulberg Boulevard", "Canal Bank Johar Town", "Bedian Road DHA Phase 7"],
    Karachi: ["Clifton Block 4 & Sea View", "DHA Phase 8 Creek", "Shahrah-e-Faisal PECHS"],
    Islamabad: ["Kashmir Highway E-11", "Constitution Ave Blue Area", "Bani Gala Park Road"],
    Rawalpindi: ["Bahria Town Phase 7", "Main Murree Road Saddar", "Chaklala Scheme III"],
    Faisalabad: ["Main Canal Expressway", "Peoples Colony D-Ground", "Susan Road Kohinoor"],
    Multan: ["Main Bosan Road", "Multan Cantt Quaid Ave", "Gulgasht Colony"],
    Peshawar: ["University Road Town", "Hayatabad Phase 3", "Peshawar Cantt Mall Road"],
    Quetta: ["Jinnah Road Cantt", "Zarghoon Road", "Samungli Road"],
    Sialkot: ["Cantt Aziz Shaheed Road", "Kashmir Road", "Citi Housing Boulevard"],
    Gujranwala: ["Main GT Road Model Town", "Citi Housing Phase 1", "Civil Lines"],
    Hyderabad: ["Autobahn Road Latifabad", "Qasimabad Main Boulevard", "Thandi Sarak"],
    Abbottabad: ["Mansehra Road Supply", "PMA Kakul Road", "Mall Road Pine View"]
};

const CATEGORY_TAXONOMY = {
    "Social & Family": {
        theme_key: "burgundy-gold",
        theme_label: "Royal Burgundy & Imperial Gold",
        image: "assets/images/domain-social-family.jpg",
        description: "Palatial Pakistani Barat, Walima, Mehndi, milestone birthdays, anniversaries, family reunions, and baby showers styled in royal burgundy and antique gold.",
        subcategories: [
            "Weddings (Barat & Nikkah)", "Walima Receptions", "Mehndi & Mayun Nights",
            "Birthdays & Milestone Parties", "Wedding Anniversaries", "Family Reunions & Grand Dinners",
            "Baby Showers", "Aqeeqa Ceremonies", "Engagement Ceremonies", "Bridal Showers"
        ]
    },
    "Corporate & Business": {
        theme_key: "slate-gold",
        theme_label: "Executive Obsidian & Champagne Gold",
        image: "assets/images/domain-corporate-business.jpg",
        description: "High-impact executive conferences, team building retreats, seminars, board meetings, trade exhibitions, and excellence award galas.",
        subcategories: [
            "Corporate Conferences", "Team Building Retreats", "Executive Seminars & Workshops",
            "Board of Directors Meetings", "Trade Exhibitions & Expos", "Flagship Product Launches",
            "Annual Excellence Award Galas", "Corporate Networking Dinners", "Investor & FinTech Summits", "Brand Activations"
        ]
    },
    "Entertainment & Performance": {
        theme_key: "plum-gold",
        theme_label: "Velvet Crimson Plum & Stage Gold",
        image: "assets/images/pakistani-concert-fest.jpg",
        description: "Live music concerts, standup comedy specials, theater dramas, cultural festivals, couture fashion shows, and Sufi Qawwali nights.",
        subcategories: [
            "Live Music Concerts", "Standup Comedy Specials", "Theater & Stage Dramas",
            "Cultural & Food Festivals", "Couture Fashion Shows", "Sufi Qawwali Nights",
            "Ghazal & Literary Evenings", "Film Premieres & Screenings", "Artist Meet & Greets", "Youth Performing Arts Carnivals"
        ]
    },
    "Academic & Educational": {
        theme_key: "navy-gold",
        theme_label: "Royal Navy Blue & Academic Gold",
        image: "assets/images/domain-academic-edu.jpg",
        description: "Dignified university convocations, academic conventions, inter-college quizzes, training sessions, bootcamps, and school/college fests.",
        subcategories: [
            "Academic Conventions", "Inter-University & School Quizzes", "Professional Training Sessions",
            "Tech & Leadership Bootcamps", "School & College Annual Fests", "University Convocations",
            "Science & Robotics Olympiads", "Research & Medical Symposia", "Career & Admissions Fairs", "Parliamentary Debate Championships"
        ]
    },
    "Community & Cultural": {
        theme_key: "emerald-gold",
        theme_label: "Heritage Emerald & Mughal Gold",
        image: "assets/images/pakistani-community-gala.jpg",
        description: "Reverent religious gatherings, charity fundraising galas, civic meetups, cultural festivals, and local community drives.",
        subcategories: [
            "Religious Gatherings", "Charity Fundraising Galas", "Community Townhall Meetups",
            "Local Community Drives", "Spring & Heritage Cultural Festivals", "Artisans & Crafts Bazaars",
            "Free Medical & Blood Donation Camps", "Literary Book Fairs", "Civic Award Ceremonies", "Neighborhood Harmony Dinners"
        ]
    }
};

// ============================================================================
// 2. BUILD 72 VERIFIED VENDORS ACROSS 12 CITIES (EACH WITH ITS OWN UNIQUE IMAGE)
// ============================================================================
function generateAllCityVendors() {
    const list = [];
    let vid = 1;
    PAKISTANI_CITIES.forEach(city => {
        const areas = CITY_AREAS[city] || ["Main Boulevard", "Central Avenue", "Cantt Road"];
        const templates = [
            {
                vendor_name: `Qasar-e-Shahi Grand Marquee (${city})`,
                vendor_type: "Banquet & Marquee",
                venue_subtype: "Grand Marquee",
                main_category: "Social & Family",
                onsite_location: `Plot 12-A, ${areas[0]}, ${city}`,
                manager_name: `Mian Tariq Mehmood (${city})`,
                manager_title: "Managing Director & Chief Venue Architect",
                years_experience: 16,
                events_completed: 1350,
                certification_record: `${city} Hospitality & Food Authority Grade-A (#HFA-${vid}01)`,
                capacity_range: "200 to 1,200 Guests",
                starting_rate_pkr: 185000,
                per_head_charge: 220,
                contact_phone: `0300 41122${String(vid).padStart(2, "0")}`,
                rating: 4.9,
                specialties: "Royal Barat & Walima Stages, Chiller AC, Standby Generator, Valet Parking"
            },
            {
                vendor_name: `Imperial Crown Boutique & Banquet Hall (${city})`,
                vendor_type: "Banquet & Marquee",
                venue_subtype: "Banquet Hall",
                main_category: "Corporate & Business",
                onsite_location: `Executive Tower, ${areas[1]}, ${city}`,
                manager_name: `Syed Farhan Ali (${city})`,
                manager_title: "Director Corporate & Boutique Events",
                years_experience: 14,
                events_completed: 980,
                certification_record: `${city} Chamber of Commerce Verified (#CC-${vid}02)`,
                capacity_range: "80 to 650 Guests",
                starting_rate_pkr: 110000,
                per_head_charge: 160,
                contact_phone: `0321 84455${String(vid).padStart(2, "0")}`,
                rating: 4.8,
                specialties: "Corporate Galas, Boutique Functions, SMD LED Wall, Acoustic Sound, Backup Power"
            },
            {
                vendor_name: `Heritage Green Lawn & Farmhouse (${city})`,
                vendor_type: "Outdoor Lawn & Farmhouse",
                venue_subtype: "Outdoor Lawn / Farmhouse",
                main_category: "Entertainment & Performance",
                onsite_location: `Garden Estate, ${areas[2]}, ${city}`,
                manager_name: `Zainab Afridi (${city})`,
                manager_title: "Creative Producer & Outdoor Venue Head",
                years_experience: 12,
                events_completed: 720,
                certification_record: `${city} Development Authority Approved (#DA-${vid}03)`,
                capacity_range: "100 to 1,000 Guests",
                starting_rate_pkr: 130000,
                per_head_charge: 130,
                contact_phone: `0333 51122${String(vid).padStart(2, "0")}`,
                rating: 4.9,
                specialties: "Sufi Qawwali Nights, Mehndi Lawns, Concerts, Waterproof German Tent Option"
            },
            {
                vendor_name: `Aiwan-e-Ilm Academic & Convention Auditorium (${city})`,
                vendor_type: "Convention & Auditorium",
                venue_subtype: "Convention Auditorium",
                main_category: "Academic & Educational",
                onsite_location: `University Avenue, ${areas[0]}, ${city}`,
                manager_name: `Dr. Kamran Siddiqui (${city})`,
                manager_title: "Director Academic Conventions & Seminars",
                years_experience: 18,
                events_completed: 890,
                certification_record: `HEC & Civic Council Certified (#HEC-${vid}04)`,
                capacity_range: "100 to 1,400 Delegates",
                starting_rate_pkr: 120000,
                per_head_charge: 110,
                contact_phone: `0345 67788${String(vid).padStart(2, "0")}`,
                rating: 4.8,
                specialties: "Convocations, Quizzes, Bootcamps, Charity Galas, Digital Podium & Projection"
            },
            {
                vendor_name: `Shahi Dastarkhwan Copper Handi Caterers (${city})`,
                vendor_type: "Royal Catering",
                venue_subtype: "Catering Partner",
                main_category: "Social & Family",
                onsite_location: `Culinary Complex, ${areas[1]}, ${city}`,
                manager_name: `Haji Abdul Rehman Qureshi (${city})`,
                manager_title: "Master Executive Chef & Culinary Director",
                years_experience: 22,
                events_completed: 2900,
                certification_record: `ISO 22000 & Halal Food Authority (#HFA-CAT-${vid}05)`,
                capacity_range: "50 to 3,500 Guests",
                starting_rate_pkr: 1350,
                per_head_charge: 0,
                contact_phone: `0301 77889${String(vid).padStart(2, "0")}`,
                rating: 5.0,
                specialties: "Mutton Raan Roast, Zafrani Pulao, Live Seekh Kabab Grill, Kunafa & Kashmiri Chai"
            },
            {
                vendor_name: `Noor-e-Jahan Floral Decor & Cinema Studio (${city})`,
                vendor_type: "Decor, Sound & Photography",
                venue_subtype: "Decor & Media Partner",
                main_category: "Community & Cultural",
                onsite_location: `Design Studio 9, ${areas[2]}, ${city}`,
                manager_name: `Bilal & Ayesha Mansoor (${city})`,
                manager_title: "Principal Stage Decorator & Visual Director",
                years_experience: 11,
                events_completed: 1120,
                certification_record: `Pakistan Event Designers Guild (#PEDG-${vid}06)`,
                capacity_range: "All Event Sizes",
                starting_rate_pkr: 65000,
                per_head_charge: 0,
                contact_phone: `0312 99001${String(vid).padStart(2, "0")}`,
                rating: 4.9,
                specialties: "Fresh Rose & Mughal Stages, DMX Truss Lighting, Line-Array Sound, 4K Drone & DSLR"
            }
        ];
        templates.forEach(t => {
            list.push({
                id: vid,
                city,
                image_url: `assets/images/vendors/vendor-${vid}.jpg`,
                added_by_user: "Warisha Noor (Verified)",
                ...t
            });
            vid++;
        });
    });
    return list;
}

// ============================================================================
// 3. GRANULAR FOOD DISHES CATALOG (PER-GUEST PRICE * GUESTS)
// ============================================================================
const DISHES_CATALOG = [
    {
        course: "1. Welcome Drinks & Cold Beverages",
        dishes: [
            { id: "d_mint", name: "Fresh Mint Margarita / Welcome Mocktail", rate_per_guest: 95, default_tier: ["standard", "luxury"] },
            { id: "d_rooh", name: "Chilled Traditional Sharbat & Fresh Lime", rate_per_guest: 55, default_tier: ["economy"] },
            { id: "d_soft", name: "Assorted Soft Drinks & Mineral Water Bottles", rate_per_guest: 110, default_tier: ["economy", "standard", "luxury"], checked: true }
        ]
    },
    {
        course: "2. Main Course Dishes (Mutton, Beef & Chicken)",
        dishes: [
            { id: "d_mutton_qorma", name: "Mutton Badami Qorma / Mutton Kunna", rate_per_guest: 640, default_tier: ["standard", "luxury"], checked: true },
            { id: "d_mutton_raan", name: "Whole Roasted Stuffed Mutton Leg (Raan)", rate_per_guest: 820, default_tier: ["luxury"] },
            { id: "d_chk_karahi", name: "Chicken White Makhni Karahi / Achari Handi", rate_per_guest: 390, default_tier: ["economy", "standard", "luxury"], checked: true },
            { id: "d_chk_qorma", name: "Royal Chicken Badami Qorma", rate_per_guest: 350, default_tier: ["economy"] },
            { id: "d_beef_steak", name: "Beef Pepper Steak Strips / Pasanday", rate_per_guest: 460, default_tier: [] },
            { id: "d_hitea_box", name: "Corporate/Academic Hi-Tea (Club Sandwiches, Patties & Shashlik)", rate_per_guest: 450, default_tier: [] }
        ]
    },
    {
        course: "3. Rice (Biryani / Pulao) & Live Tandoor Breads",
        dishes: [
            { id: "d_mutton_pulao", name: "Mutton Yakhni / Afghani Kabuli Pulao", rate_per_guest: 410, default_tier: ["standard", "luxury"], checked: true },
            { id: "d_chk_biryani", name: "Special Saffron Chicken Biryani / Pulao", rate_per_guest: 310, default_tier: ["economy"] },
            { id: "d_tandoor_naan", name: "Live Tandoor Roghni Naan, Garlic Naan & Taftan", rate_per_guest: 95, default_tier: ["economy", "standard", "luxury"], checked: true }
        ]
    },
    {
        course: "4. Live BBQ Grill & Fresh Salad Bar",
        dishes: [
            { id: "d_seekh", name: "Live Charcoal Chicken / Beef Seekh Kabab", rate_per_guest: 185, default_tier: ["standard", "luxury"], checked: true },
            { id: "d_malai_boti", name: "Chicken Malai Tikka Boti / Kasturi Boti", rate_per_guest: 220, default_tier: ["luxury"] },
            { id: "d_fried_fish", name: "Crispy Fried Finger Fish with Tartar Sauce", rate_per_guest: 330, default_tier: ["luxury"] },
            { id: "d_salad_bar", name: "Russian Salad, Fresh Garden Salad & Mint Raita Bar", rate_per_guest: 85, default_tier: ["economy", "standard", "luxury"], checked: true }
        ]
    },
    {
        course: "5. Signature Desserts & Hot Beverages (Tea / Coffee)",
        dishes: [
            { id: "d_gulab", name: "Hot Gulab Jamun with Vanilla Ice Cream", rate_per_guest: 165, default_tier: ["standard", "luxury"], checked: true },
            { id: "d_kheer", name: "Royal Almond Kheer / Carrot Halwa / Zarda", rate_per_guest: 125, default_tier: ["economy"] },
            { id: "d_jalebi_rabri", name: "Live Hot Jalebi & Rabri Counter + Kunafa", rate_per_guest: 230, default_tier: ["luxury"] },
            { id: "d_kashmiri_chai", name: "Kashmiri Pink Tea with Pistachios & Brewed Coffee", rate_per_guest: 95, default_tier: ["standard", "luxury"], checked: true }
        ]
    }
];

// ============================================================================
// 4. INTERACTIVE CHECKBOXES FOR REMAINING REQUIREMENTS (#5 & #7 TO #22 — 100% ENGLISH)
// ============================================================================
const REQUIREMENTS_CATALOG = [
    {
        no: 5,
        title: "5. Invitations",
        timing: "2-3 Weeks Before Event",
        options: [
            { id: "r5_whatsapp", label: "Digital WhatsApp E-Card & Location Pin Design", cost: 3500, per_guest: 0, checked: true },
            { id: "r5_video", label: "Animated Motion Video Invitation", cost: 8500, per_guest: 0, checked: false },
            { id: "r5_printed", label: "Printed Luxury Event Invitation Cards (1 per 2 Guests)", cost: 0, per_guest: 65, checked: true }
        ]
    },
    {
        no: 7,
        title: "7. Seating & Furniture",
        timing: "1-2 Weeks Before Event",
        options: [
            { id: "r7_tables", label: "Round Banquet Tables, Covers & Tiffany Chairs (Scaled by Guests)", cost: 0, per_guest: 140, checked: true },
            { id: "r7_vip_sofa", label: "VIP Family / Chief Guest Velvet Lounge Sofas", cost: 22000, per_guest: 0, checked: true },
            { id: "r7_stage_carp", label: "Elevated Stage Platform & Red Carpet Runner", cost: 18000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 8,
        title: "8. Decoration & Theme Setup",
        timing: "1-2 Weeks Before Event",
        options: [
            { id: "r8_basic_stage", label: "Standard Thematic Stage Backdrop & Silk/Fresh Florals", cost: 45000, per_guest: 0, checked: true },
            { id: "r8_royal_stage", label: "Full 3D Royal Architectural Stage with Fresh Roses", cost: 95000, per_guest: 0, checked: false },
            { id: "r8_walkway", label: "Floral Entrance Tunnel & Table Candle Centerpieces", cost: 28000, per_guest: 0, checked: true }
        ]
    },
    {
        no: 9,
        title: "9. Sound System",
        timing: "1 Week Before Event",
        options: [
            { id: "r9_basic_pa", label: "Dual PA Speakers, Mixer & 2 Wireless Microphones", cost: 15000, per_guest: 0, checked: true },
            { id: "r9_line_array", label: "Full Line-Array Acoustic Sound & DJ Console", cost: 35000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 10,
        title: "10. Lighting",
        timing: "1 Week Before Event",
        options: [
            { id: "r10_stage_spots", label: "Warm Stage Spotlights (For Photography) & Hall Wash", cost: 16000, per_guest: 0, checked: true },
            { id: "r10_fairy_dmx", label: "Overhead Fairy Light Canopy & DMX Moving-Head Beams", cost: 28000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 11,
        title: "11. Power Backup (Mandatory)",
        timing: "1 Week Before Event",
        options: [
            { id: "r11_generator", label: "Heavy Standby Diesel Generator + 4-Hour Fuel Reserve", cost: 32000, per_guest: 0, checked: true },
            { id: "r11_ups", label: "Zero-Delay Online UPS Backup for Sound & Stage Lights", cost: 10000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 12,
        title: "12. Photography & Videography",
        timing: "2 Weeks Before Event",
        options: [
            { id: "r12_photo_video", label: "Professional DSLR Photographer + Cinematic Videographer", cost: 48000, per_guest: 0, checked: true },
            { id: "r12_drone_album", label: "4K Drone Aerial Coverage + Printed Luxury Photobook", cost: 26000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 13,
        title: "13. Entertainment / Program",
        timing: "1 Week Before Event",
        options: [
            { id: "r13_anchor", label: "Event Host / Anchor & Cold Pyro Sparkler Entry", cost: 20000, per_guest: 0, checked: true },
            { id: "r13_qawwali", label: "Live Musical / Sufi Ensemble or Stage Activity", cost: 65000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 14,
        title: "14. Staff (Waiters, Coordinator & Cleaners)",
        timing: "3-5 Days Before Event",
        options: [
            { id: "r14_waiters", label: "Uniformed Catering Waiters & Table Service (Scaled by Guests)", cost: 0, per_guest: 85, checked: true },
            { id: "r14_coord", label: "Dedicated On-Site Event Coordinator & Ushers", cost: 14000, per_guest: 0, checked: true }
        ]
    },
    {
        no: 15,
        title: "15. Parking & Transport",
        timing: "3-5 Days Before Event",
        options: [
            { id: "r15_valet", label: "Valet Parking Team, Traffic Cones & Car Tokens", cost: 12000, per_guest: 0, checked: true },
            { id: "r15_shuttle", label: "Guest Shuttle Coaster / Transport Van Service", cost: 25000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 16,
        title: "16. Washrooms & Hygiene",
        timing: "On Event Day",
        options: [
            { id: "r16_attendant", label: "Dedicated Washroom Attendants, Tissues & Handwash Kit", cost: 6000, per_guest: 0, checked: true },
            { id: "r16_portable", label: "Executive Portable Luxury Restroom Setup (For Outdoor Lawns)", cost: 30000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 17,
        title: "17. Security & Crowd Control",
        timing: "3 Days Before Event",
        options: [
            { id: "r17_guards", label: "Uniformed Gate Security Guards & Entry Card Check", cost: 12000, per_guest: 0, checked: true },
            { id: "r17_walkthrough", label: "Walk-Through Metal Detector Gate & Handheld Scanners", cost: 14000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 18,
        title: "18. First Aid / Emergency Plan",
        timing: "1 Day Before Event",
        options: [
            { id: "r18_kit", label: "Complete Medical First-Aid Kit, Fire Extinguisher & Exit Plan", cost: 4500, per_guest: 0, checked: true },
            { id: "r18_paramedic", label: "On-Site Paramedic / Standby Emergency Vehicle", cost: 15000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 19,
        title: "19. Permits & Permissions",
        timing: "1 Week Before Event",
        options: [
            { id: "r19_noc", label: "Venue Time-Compliance & Local Society / Sound NOC Approval", cost: 5000, per_guest: 0, checked: true }
        ]
    },
    {
        no: 20,
        title: "20. Weather Backup",
        timing: "3-5 Days Before Event",
        options: [
            { id: "r20_climate", label: "Indoor AC / Heating Verification OR Standby Waterproof Canopy", cost: 18000, per_guest: 0, checked: true },
            { id: "r20_german_tent", label: "Full Waterproof German Span Tent (For Monsoon / Outdoor)", cost: 55000, per_guest: 0, checked: false }
        ]
    },
    {
        no: 21,
        title: "21. Payments & Advances",
        timing: "Pre & Post Event",
        options: [
            { id: "r21_ledger", label: "Vendor Advance Receipts Folder & 5% Contingency Cash Envelopes", cost: 15000, per_guest: 0, checked: true }
        ]
    },
    {
        no: 22,
        title: "22. Cleanup & Post-Event Wrap",
        timing: "Immediately After Event",
        options: [
            { id: "r22_cleanup", label: "Post-Event Cleaning Crew, Surplus Food Packing & Rental Return Check", cost: 9000, per_guest: 0, checked: true }
        ]
    }
];

// ============================================================================
// 5. STATE MANAGEMENT
// ============================================================================
const ALL_72_VENDORS = generateAllCityVendors();
let stateVendors = JSON.parse(localStorage.getItem("EE_VENDORS_V3") || "null");
if (!stateVendors || stateVendors.length < 50) {
    stateVendors = [...ALL_72_VENDORS];
}
let stateSavedPlans = JSON.parse(localStorage.getItem("EE_SAVED_PLANS_V3") || "[]");
let stateSpecialEvents = JSON.parse(localStorage.getItem("EE_SPECIAL_EVENTS_V3") || "[]");

let isAccountLoggedIn = localStorage.getItem("EE_LOGGED_IN") === "true";
let currentUser = JSON.parse(localStorage.getItem("EE_USER_V3") || "null") || {
    full_name: "Warisha Noor",
    email: "warishanoor301@gmail.com",
    phone: "0340 8704093",
    city: "Lahore",
    role: "Founder & Lead Architect"
};

function saveLocalState() {
    localStorage.setItem("EE_VENDORS_V3", JSON.stringify(stateVendors));
    localStorage.setItem("EE_SAVED_PLANS_V3", JSON.stringify(stateSavedPlans));
    localStorage.setItem("EE_SPECIAL_EVENTS_V3", JSON.stringify(stateSpecialEvents));
    localStorage.setItem("EE_USER_V3", JSON.stringify(currentUser));
    localStorage.setItem("EE_LOGGED_IN", isAccountLoggedIn ? "true" : "false");
}

function updateAuthUI() {
    const dashTab = document.getElementById("navDashboardTab");
    const loginBtn = document.getElementById("navLoginBtn");
    const signupBtn = document.getElementById("navSignupBtn");
    const userBadge = document.getElementById("navUserBadge");
    const userLabel = document.getElementById("navUserLabel");

    if (isAccountLoggedIn) {
        dashTab.classList.remove("hidden");
        userBadge.classList.remove("hidden");
        loginBtn.classList.add("hidden");
        signupBtn.classList.add("hidden");
        userLabel.textContent = currentUser.full_name;
    } else {
        dashTab.classList.add("hidden");
        userBadge.classList.add("hidden");
        loginBtn.classList.remove("hidden");
        signupBtn.classList.remove("hidden");
    }
}

// ============================================================================
// 6. AUTOMATIC DOMAIN-BASED THEME ENGINE & VIEW NAVIGATION
// ============================================================================
function applyDomainTheme(domainName) {
    const info = CATEGORY_TAXONOMY[domainName] || CATEGORY_TAXONOMY["Social & Family"];
    document.documentElement.setAttribute("data-theme", info.theme_key);
    const indicator = document.getElementById("activeDomainThemeIndicator");
    if (indicator) {
        indicator.textContent = `${domainName} — ${info.theme_label}`;
    }
}

function navigateToView(viewId) {
    document.querySelectorAll(".page-view").forEach(v => {
        v.classList.toggle("active-view", v.id === `view-${viewId}`);
    });
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.dataset.nav === viewId);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (viewId === "dashboard") renderDashboard();
    if (viewId === "vendors") renderVendorsDirectory();
    if (viewId === "special-event") renderSpecialEventsArchive();
}

// ============================================================================
// 7. BUILD INTERACTIVE CONFIGURATOR UI (VENUES, DISHES, 22 REQUIREMENTS)
// ============================================================================
function renderLandingCategories() {
    const grid = document.getElementById("landingCategoriesGrid");
    if (!grid) return;

    grid.innerHTML = Object.entries(CATEGORY_TAXONOMY).map(([domainName, info], index) => `
        <article class="domain-card">
            <div class="domain-img-box">
                <img src="${info.image}" alt="${domainName}" />
                <span class="domain-theme-ribbon">0${index + 1} • ${info.theme_label}</span>
            </div>
            <div class="domain-body">
                <div>
                    <h3>${domainName}</h3>
                    <p class="domain-desc">${info.description}</p>
                    <div class="subcat-tags-wrap">
                        ${info.subcategories.map(sub => `
                            <button type="button" class="subcat-chip" data-pick-domain="${domainName}" data-pick-sub="${sub}">
                                ${sub}
                            </button>
                        `).join("")}
                    </div>
                </div>
                <div class="domain-footer">
                    <span class="step-tag">${info.subcategories.length} Subcategories</span>
                    <button type="button" class="btn-gold-sm" data-pick-domain="${domainName}" data-pick-sub="${info.subcategories[0]}">
                        Plan ${domainName}
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll("[data-pick-domain]").forEach(btn => {
        btn.addEventListener("click", () => {
            const dom = btn.dataset.pickDomain;
            const sub = btn.dataset.pickSub;
            applyDomainTheme(dom);
            document.getElementById("mainCategory").value = dom;
            populateSubcategoryDropdown(dom, sub);
            navigateToView("plan-builder");
            recalculateLiveBillAndGenerateReport(false);
        });
    });
}

function populateSubcategoryDropdown(mainCategory, selectedSub = null) {
    const subSelect = document.getElementById("subCategory");
    if (!subSelect) return;
    const catInfo = CATEGORY_TAXONOMY[mainCategory] || CATEGORY_TAXONOMY["Social & Family"];
    applyDomainTheme(mainCategory);
    subSelect.innerHTML = catInfo.subcategories.map(sub => `
        <option value="${sub}" ${selectedSub === sub ? "selected" : ""}>${sub}</option>
    `).join("");
}

function renderCityVenueVendorOptions() {
    const city = document.getElementById("city")?.value || "Lahore";
    const venuePref = document.getElementById("venuePreference")?.value || "Banquet Hall";
    const guests = parseInt(document.getElementById("guests")?.value || 300, 10);

    document.getElementById("selectedCityVenueLabel").textContent = city;

    const cityHalls = stateVendors.filter(
        v => v.city.toLowerCase() === city.toLowerCase() &&
        ["Banquet & Marquee", "Outdoor Lawn & Farmhouse", "Convention & Auditorium"].includes(v.vendor_type)
    );

    const container = document.getElementById("cityVenueVendorCards");
    if (!container) return;

    if (venuePref === "Home Setup") {
        document.getElementById("venueSmartSuggestion").textContent =
            `Home Setup Selected in ${city}: PKR 0 Hall Rent! We recommend ticking Tent & Furniture in Requirement #7 below.`;
    } else {
        document.getElementById("venueSmartSuggestion").textContent =
            `Algorithm Suggestion for ${guests} Guests in ${city}: Select one of the verified ${city} venues below.`;
    }

    const cardsHtml = cityHalls.map((v, idx) => {
        const totalHallCost = v.starting_rate_pkr + (v.per_head_charge || 0) * guests;
        const isChecked = venuePref !== "Home Setup" && idx === 0;
        return `
            <label class="check-card">
                <input type="radio" name="selectedCityVenue" class="venue-vendor-radio"
                    value="${v.id}"
                    data-name="${v.vendor_name}"
                    data-location="${v.onsite_location}"
                    data-base="${v.starting_rate_pkr}"
                    data-perhead="${v.per_head_charge || 0}"
                    ${isChecked ? "checked" : ""} />
                <div class="check-card-body">
                    <strong>${v.vendor_name}</strong>
                    <span>${v.onsite_location} | Capacity: ${v.capacity_range}</span>
                    <span>Director: ${v.manager_name} (${v.years_experience} Yrs Exp)</span>
                    <em class="cost-tag">Base ${formatPKR(v.starting_rate_pkr)} + PKR ${v.per_head_charge || 0}/guest = ${formatPKR(totalHallCost)}</em>
                </div>
            </label>
        `;
    }).join("");

    const homeOptionHtml = `
        <label class="check-card">
            <input type="radio" name="selectedCityVenue" class="venue-vendor-radio"
                value="home"
                data-name="Home / Private Residence Lawn or Rooftop (${city})"
                data-location="Own Residence / Community Ground, ${city}"
                data-base="0"
                data-perhead="0"
                ${venuePref === "Home Setup" ? "checked" : ""} />
            <div class="check-card-body">
                <strong>Own Home Lawn / Rooftop / Self-Arranged Space (${city})</strong>
                <span>Zero Hall Rent — Only pay for Tent &amp; Furniture in Requirement #7</span>
                <em class="cost-tag">PKR 0 Hall Rent</em>
            </div>
        </label>
    `;

    container.innerHTML = cardsHtml + homeOptionHtml;

    const cityCaterers = stateVendors.filter(
        v => v.city.toLowerCase() === city.toLowerCase() && v.vendor_type === "Royal Catering"
    );
    const catSelect = document.getElementById("cityCatererSelect");
    if (catSelect) {
        catSelect.innerHTML = cityCaterers.map(c => `
            <option value="${c.vendor_name} (${c.onsite_location})">
                ${c.vendor_name} — Chef/Director: ${c.manager_name} | ${c.certification_record}
            </option>
        `).join("") + `<option value="Self-Arranged / In-House Venue Catering">In-House Venue / Self-Arranged Catering</option>`;
    }

    container.querySelectorAll(".venue-vendor-radio").forEach(r => {
        r.addEventListener("change", () => recalculateLiveBillAndGenerateReport(false));
    });
}

function renderDishesConfigurator() {
    const container = document.getElementById("dishesConfiguratorContainer");
    if (!container) return;
    const guests = parseInt(document.getElementById("guests")?.value || 300, 10);

    container.innerHTML = DISHES_CATALOG.map(group => `
        <div class="dish-course-box">
            <h4 class="dish-course-title">${group.course}</h4>
            <div class="checkbox-cards-grid">
                ${group.dishes.map(d => {
                    const totalDishCost = d.rate_per_guest * guests;
                    return `
                        <label class="check-card">
                            <input type="checkbox" class="dish-check-input"
                                id="${d.id}"
                                data-dish-id="${d.id}"
                                data-dish-name="${d.name}"
                                data-rate="${d.rate_per_guest}"
                                ${d.checked ? "checked" : ""} />
                            <div class="check-card-body">
                                <strong>${d.name}</strong>
                                <span>Rate: PKR ${d.rate_per_guest} / guest &times; <b class="dish-guest-mul">${guests}</b> guests</span>
                                <em class="cost-tag dish-total-tag" data-for-dish="${d.id}">${formatPKR(totalDishCost)}</em>
                            </div>
                        </label>
                    `;
                }).join("")}
            </div>
        </div>
    `).join("");

    container.querySelectorAll(".dish-check-input").forEach(cb => {
        cb.addEventListener("change", () => recalculateLiveBillAndGenerateReport(false));
    });
}

function updateDishMultipliersUI(guests) {
    document.getElementById("foodGuestsCountLabel").textContent = guests;
    document.querySelectorAll(".dish-guest-mul").forEach(el => {
        el.textContent = guests;
    });
    document.querySelectorAll(".dish-check-input").forEach(cb => {
        const rate = parseInt(cb.dataset.rate || 0, 10);
        const tag = document.querySelector(`.dish-total-tag[data-for-dish="${cb.dataset.dishId}"]`);
        if (tag) {
            tag.textContent = formatPKR(rate * guests);
        }
    });
}

function renderRequirementsCheckboxes() {
    const container = document.getElementById("requirementsCheckboxesContainer");
    if (!container) return;
    const guests = parseInt(document.getElementById("guests")?.value || 300, 10);

    container.innerHTML = REQUIREMENTS_CATALOG.map(req => `
        <div class="req-config-box" data-req-no="${req.no}">
            <div class="req-config-head">
                <h4>${req.title}</h4>
                <span class="pill-tag">${req.timing}</span>
            </div>
            <div class="req-options-list">
                ${req.options.map(opt => {
                    const computedCost = opt.cost + (opt.per_guest * guests);
                    return `
                        <label class="req-opt-row">
                            <span class="req-opt-left">
                                <input type="checkbox" class="req-opt-check"
                                    id="${opt.id}"
                                    data-req-no="${req.no}"
                                    data-req-title="${req.title}"
                                    data-opt-label="${opt.label}"
                                    data-fixed-cost="${opt.cost}"
                                    data-per-guest="${opt.per_guest}"
                                    ${opt.checked ? "checked" : ""} />
                                <span>${opt.label}</span>
                            </span>
                            <span class="req-opt-cost" data-cost-for="${opt.id}">${formatPKR(computedCost)}</span>
                        </label>
                    `;
                }).join("")}
            </div>
        </div>
    `).join("");

    container.querySelectorAll(".req-opt-check").forEach(cb => {
        cb.addEventListener("change", () => recalculateLiveBillAndGenerateReport(false));
    });
}

function updateRequirementOptionCostsUI(guests) {
    document.querySelectorAll(".req-opt-check").forEach(cb => {
        const fixed = parseInt(cb.dataset.fixedCost || 0, 10);
        const perG = parseInt(cb.dataset.perGuest || 0, 10);
        const labelEl = document.querySelector(`[data-cost-for="${cb.id}"]`);
        if (labelEl) {
            labelEl.textContent = formatPKR(fixed + perG * guests);
        }
    });
}

// ============================================================================
// 8. LIVE BILL CALCULATOR & FULL REPORT GENERATOR (100% ENGLISH)
// ============================================================================
function computeCountdownAndHourlySchedule(eventDateStr, startTimeStr, durationHours, eventTitle, city, locationMode) {
    const today = new Date("2026-10-04T00:00:00");
    let targetDate = new Date(eventDateStr + "T00:00:00");
    if (isNaN(targetDate.getTime()) || targetDate <= today) {
        targetDate = new Date(today.getTime() + 30 * 86400000);
    }
    const daysRemaining = Math.max(1, Math.round((targetDate - today) / 86400000));

    const fmtDate = dt => dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", weekday: "short" });
    const addDays = (base, d) => new Date(base.getTime() + d * 86400000);

    const preEventMilestones = [
        {
            date: fmtDate(today),
            phase: "Day 01 — Today (Master Plan & Budget Lock)",
            tasks: `Lock Estimated vs Actual Budget and confirm '${eventTitle}' master blueprint in ${city}.`
        },
        {
            date: fmtDate(addDays(today, Math.max(1, Math.round(daysRemaining * 0.12)))),
            phase: "Phase 02 — Venue / Platform Booking & 30% Advance",
            tasks: locationMode === "Online"
                ? "Configure Zoom/Meet/Teams links, webinar registration & streaming test."
                : `Sign contract with selected ${city} Venue/Hall, pay 30% advance, and lock generator & AC clauses.`
        },
        {
            date: fmtDate(addDays(today, Math.max(2, Math.round(daysRemaining * 0.30)))),
            phase: "Phase 03 — Guest List & Invitations Dispatch",
            tasks: "Finalize VIP, Family & Friends guest list; dispatch WhatsApp E-Invites and printed cards."
        },
        {
            date: fmtDate(addDays(today, Math.max(3, Math.round(daysRemaining * 0.52)))),
            phase: "Phase 04 — Catering Menu & Per-Head Dish Lock",
            tasks: "Confirm selected dishes with caterer, lock guest count (+5% buffer), and verify dietary needs."
        },
        {
            date: fmtDate(addDays(today, Math.max(4, Math.round(daysRemaining * 0.75)))),
            phase: "Phase 05 — Stage Decor, Sound, Lighting & Media Briefing",
            tasks: "Approve floral backdrop palette, DMX stage lights, wireless mics, and photography shot list."
        },
        {
            date: fmtDate(addDays(targetDate, -2)),
            phase: "Phase 06 — 48 Hours Before Event (NOC, Staff & Security)",
            tasks: "Confirm waiters, coordinator, security guards, walkthrough gate, parking/shuttle, and permits."
        },
        {
            date: fmtDate(addDays(targetDate, -1)),
            phase: "Phase 07 — 24 Hours Before Event (Generator Fuel & First Aid)",
            tasks: "Verify standby generator fuel tank full, prepare final vendor settlement envelopes, and pack First-Aid kit."
        }
    ];

    const [hrStr, mnStr] = (startTimeStr || "19:00").split(":");
    const startHr = parseInt(hrStr || 19, 10);
    const startMn = parseInt(mnStr || 0, 10);
    const dur = parseInt(durationHours || 4, 10);

    const fmtHour = (offsetMinutes) => {
        const dt = new Date(targetDate);
        dt.setHours(startHr, startMn + offsetMinutes, 0);
        return dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const eventDayHourly = [
        { time: fmtHour(-180), activity: "On-Site Setup, Furniture & Decor Inspection", detail: "Stage florals, seating rows, table covers, and washroom hygiene verified." },
        { time: fmtHour(-90), activity: "Power Backup, Sound & Lighting Line-Check", detail: "Test standby diesel generator switchover, wireless mics, stage spotlights, and AC/heaters." },
        { time: fmtHour(-45), activity: "Catering Chaffing Setup, Security Gate & Staff Briefing", detail: "Food counters heated; security guards, valet team, and ushers deployed at gates." },
        { time: fmtHour(0), activity: "Guest Arrival & Welcome Drinks Reception", detail: "Guests welcomed at entrance archway; welcome drinks served and portrait photography begins." },
        { time: fmtHour(45), activity: "Main Stage Ceremony / Program / Keynote", detail: "Formal stage entry, anchor announcements, speeches, or performances." },
        { time: fmtHour(Math.max(60, (dur - 2) * 60)), activity: "Grand Buffet / Selected Dishes Service Opens", detail: "VIP tables and main catering counters open; live BBQ, tandoor naans, and main dishes served." },
        { time: fmtHour(Math.max(120, (dur - 1) * 60)), activity: "Desserts, Kashmiri Tea / Coffee & Group Photos", detail: "Hot desserts and tea/coffee served; family and group portraits." },
        { time: fmtHour(dur * 60), activity: "Final Vendor Settlement, Food Packing & Cleanup", detail: "Pack surplus food safely, count rental items, pay final vendor balances, and complete cleanup." }
    ];

    return {
        eventDateFormatted: fmtDate(targetDate),
        daysRemaining,
        preEventMilestones,
        eventDayHourly
    };
}

async function recalculateLiveBillAndGenerateReport(scrollToReport = false) {
    const clientName = document.getElementById("clientName")?.value.trim() || "Valued Host";
    const mainCategory = document.getElementById("mainCategory")?.value || "Social & Family";
    const subCategory = document.getElementById("subCategory")?.value || "Weddings (Barat & Nikkah)";
    const estimatedBudget = Math.max(10000, parseInt(document.getElementById("totalBudget")?.value || 850000, 10));
    const guests = Math.max(10, parseInt(document.getElementById("guests")?.value || 300, 10));
    const guestBreakdownNote = document.getElementById("guestBreakdownNote")?.value || `${guests} Total Guests`;
    const eventDate = document.getElementById("eventDate")?.value || "2026-11-15";
    const startTime = document.getElementById("eventStartTime")?.value || "19:00";
    const durationHours = parseInt(document.getElementById("eventDuration")?.value || 4, 10);
    const season = document.getElementById("seasonSelect")?.value || "Winter";
    const locationMode = document.getElementById("locationMode")?.value || "On-Site";
    const city = document.getElementById("city")?.value || "Lahore";

    applyDomainTheme(mainCategory);
    updateDishMultipliersUI(guests);
    updateRequirementOptionCostsUI(guests);

    // 1. Venue / Online Platform Cost (Req #3)
    let venueCost = 0;
    let selectedVenueSummary = "";
    if (locationMode === "Online") {
        const pickedOnline = [];
        document.querySelectorAll(".online-opt-check:checked").forEach(cb => {
            const c = parseInt(cb.dataset.cost || 0, 10);
            venueCost += c;
            pickedOnline.push(`${cb.dataset.name} (${formatPKR(c)})`);
        });
        selectedVenueSummary = pickedOnline.length > 0
            ? `Online Platform: ${pickedOnline.join(" + ")}`
            : "Online Event (Standard Meeting Link — PKR 0)";
    } else {
        const checkedRadio = document.querySelector(".venue-vendor-radio:checked");
        if (checkedRadio) {
            const base = parseInt(checkedRadio.dataset.base || 0, 10);
            const perHead = parseInt(checkedRadio.dataset.perhead || 0, 10);
            venueCost = base + perHead * guests;
            selectedVenueSummary = `${checkedRadio.dataset.name} — ${checkedRadio.dataset.location}`;
        } else {
            selectedVenueSummary = `On-Site Venue in ${city}`;
        }
    }

    // 2. Selected Food Dishes Cost (Req #6)
    let foodCost = 0;
    let perGuestFoodRate = 0;
    const selectedDishes = [];
    document.querySelectorAll(".dish-check-input:checked").forEach(cb => {
        const rate = parseInt(cb.dataset.rate || 0, 10);
        const dishTotal = rate * guests;
        perGuestFoodRate += rate;
        foodCost += dishTotal;
        selectedDishes.push({
            name: cb.dataset.dishName,
            rate,
            total: dishTotal
        });
    });

    // 3. Remaining Requirements Checkboxes (#5, #7 to #22)
    const reqSelectionsMap = {};
    let extraReqsTotalCost = 0;

    REQUIREMENTS_CATALOG.forEach(r => {
        reqSelectionsMap[r.no] = { items: [], cost: 0, timing: r.timing };
    });

    document.querySelectorAll(".req-opt-check:checked").forEach(cb => {
        const reqNo = parseInt(cb.dataset.reqNo, 10);
        const fixed = parseInt(cb.dataset.fixedCost || 0, 10);
        const perG = parseInt(cb.dataset.perGuest || 0, 10);
        const itemCost = fixed + perG * guests;
        extraReqsTotalCost += itemCost;
        if (reqSelectionsMap[reqNo]) {
            reqSelectionsMap[reqNo].items.push(cb.dataset.optLabel);
            reqSelectionsMap[reqNo].cost += itemCost;
        }
    });

    const actualTotalCost = venueCost + foodCost + extraReqsTotalCost;
    const actualPerGuest = Math.round(actualTotalCost / guests);
    const variance = estimatedBudget - actualTotalCost;

    // Update Sticky Live Bill Bar
    document.getElementById("liveEstBudget").textContent = formatPKR(estimatedBudget);
    document.getElementById("liveActualCost").textContent = formatPKR(actualTotalCost);
    document.getElementById("livePerGuest").textContent = `${formatPKR(actualPerGuest)} / Guest`;

    const badgeEl = document.getElementById("liveVarianceBadge");
    if (variance >= 0) {
        badgeEl.textContent = `Under Budget: Save ${formatPKR(variance)}`;
        badgeEl.style.color = "#86efac";
    } else {
        badgeEl.textContent = `Over Budget by ${formatPKR(Math.abs(variance))}`;
        badgeEl.style.color = "#fca5a5";
    }

    // Populate Final Master Report
    const catInfo = CATEGORY_TAXONOMY[mainCategory] || CATEGORY_TAXONOMY["Social & Family"];
    document.getElementById("outThemeBadge").textContent = `${mainCategory} • ${catInfo.theme_label}`;
    document.getElementById("outPlanTitle").textContent = `${clientName} — ${subCategory} (${locationMode === "Online" ? "Online Event" : city})`;
    document.getElementById("outSubtitle").textContent = `${guests} Guests (${guestBreakdownNote}) | Location: ${selectedVenueSummary}`;

    document.getElementById("kpiEstimatedBudget").textContent = formatPKR(estimatedBudget);
    document.getElementById("kpiCity").textContent = locationMode === "Online" ? "Mode: Online Virtual" : `City: ${city}`;
    document.getElementById("kpiActualCost").textContent = formatPKR(actualTotalCost);
    document.getElementById("kpiPerHead").textContent = `${formatPKR(actualPerGuest)} / Guest Actual`;

    if (variance >= 0) {
        document.getElementById("kpiVariance").textContent = `+ ${formatPKR(variance)} Saved`;
        document.getElementById("kpiVarianceStatus").textContent = "Within Your Estimated Budget!";
        document.getElementById("outCostVerdict").textContent =
            `Budget Verdict (Within Target): Your Estimated Budget is ${formatPKR(estimatedBudget)} and your Actual Calculated Cost across all selected venues, ${selectedDishes.length} dishes, and requirements is ${formatPKR(actualTotalCost)} — saving you ${formatPKR(variance)}!`;
    } else {
        document.getElementById("kpiVariance").textContent = `- ${formatPKR(Math.abs(variance))} Over`;
        document.getElementById("kpiVarianceStatus").textContent = "Exceeds Estimated Budget";
        document.getElementById("outCostVerdict").textContent =
            `Budget Verdict (Optimization Tip): Your Actual Calculated Cost (${formatPKR(actualTotalCost)}) is ${formatPKR(Math.abs(variance))} higher than your Estimated Budget (${formatPKR(estimatedBudget)}). Recommendation: Untick 1–2 extra dishes or switch to a Standard Venue/Backdrop to bring Actual Cost within ${formatPKR(estimatedBudget)}.`;
    }

    const sched = computeCountdownAndHourlySchedule(eventDate, startTime, durationHours, clientName, city, locationMode);
    document.getElementById("kpiEventDate").textContent = sched.eventDateFormatted;
    document.getElementById("kpiDaysLeft").textContent = `${sched.daysRemaining} Days Preparation Window`;
    document.getElementById("outCountdownTag").textContent = `Today (04 Oct 2026) to ${sched.eventDateFormatted} (${sched.daysRemaining} Days)`;

    document.getElementById("outWeatherAlert").textContent =
        locationMode === "Online"
            ? "Online Readiness Advisory: Conduct a full audio/video screen-share rehearsal 24 hours before event start and keep a backup mobile 5G hotspot ready."
            : `Season & Climate Advisory (${season} in ${city}): Ensure your contract includes standby generator fuel and climate protection (${season === "Summer" || season === "Monsoon" ? "Chiller AC & Waterproof Canopy" : "Indoor Heating / Warm Lighting"}).`;

    // Module 1: Actual Cost Breakdown
    const decorAndSetupCost = (reqSelectionsMap[7]?.cost || 0) + (reqSelectionsMap[8]?.cost || 0) + (reqSelectionsMap[10]?.cost || 0) + (reqSelectionsMap[11]?.cost || 0);
    const mediaAndProgCost = (reqSelectionsMap[9]?.cost || 0) + (reqSelectionsMap[12]?.cost || 0) + (reqSelectionsMap[13]?.cost || 0);
    const staffAndSafetyCost = (reqSelectionsMap[14]?.cost || 0) + (reqSelectionsMap[15]?.cost || 0) + (reqSelectionsMap[16]?.cost || 0) + (reqSelectionsMap[17]?.cost || 0) + (reqSelectionsMap[18]?.cost || 0);
    const adminAndWrapCost = (reqSelectionsMap[5]?.cost || 0) + (reqSelectionsMap[19]?.cost || 0) + (reqSelectionsMap[20]?.cost || 0) + (reqSelectionsMap[21]?.cost || 0) + (reqSelectionsMap[22]?.cost || 0);

    const safeDiv = Math.max(1, actualTotalCost);
    const breakdownBuckets = [
        { label: "Venue / Hall / Online Platform (#3)", cost: venueCost, note: selectedVenueSummary },
        { label: `Food & Drinks (${selectedDishes.length} Selected Dishes) (#6)`, cost: foodCost, note: `PKR ${perGuestFoodRate}/guest × ${guests} guests` },
        { label: "Seating, Decor, Lighting & Power (#7, #8, #10, #11)", cost: decorAndSetupCost, note: "Furniture, Stage Florals, Lights & Generator" },
        { label: "Sound, Photography & Entertainment (#9, #12, #13)", cost: mediaAndProgCost, note: "PA/DJ Sound, DSLR/Video & Program Host" },
        { label: "Staff, Parking, Washrooms & Security (#14–#18)", cost: staffAndSafetyCost, note: "Waiters, Valet, Guards & First-Aid" },
        { label: "Invites, Permits, Weather Backup & Cleanup (#5, #19–#22)", cost: adminAndWrapCost, note: "Invitations, NOC, Contingency & Cleanup" }
    ];

    document.getElementById("outLocationModeBadge").textContent = `${locationMode} Mode • ${city}`;
    document.getElementById("budgetBreakdownGrid").innerHTML = breakdownBuckets.map(b => {
        const pct = Math.round((b.cost / safeDiv) * 100);
        return `
            <div class="budget-card-item">
                <div class="budget-top">
                    <span>${b.label} (${pct}%)</span>
                    <strong>${formatPKR(b.cost)}</strong>
                </div>
                <div class="budget-bar-track">
                    <div class="budget-bar-fill" style="width: ${Math.min(100, pct * 1.6)}%"></div>
                </div>
                <div class="budget-foot">
                    <span>${b.note}</span>
                    <strong>${formatPKR(Math.round(b.cost / guests))} / guest</strong>
                </div>
            </div>
        `;
    }).join("");

    // Module 2: Selected Dishes & Ration
    const catererName = document.getElementById("cityCatererSelect")?.value || `Verified Caterer (${city})`;
    document.getElementById("outCatererNameBadge").textContent = catererName;

    const dishesBox = document.getElementById("selectedDishesSummaryBox");
    if (selectedDishes.length === 0) {
        dishesBox.innerHTML = `<div class="advisory-item advisory-climate">No catering dishes selected (PKR 0). Tick dishes in Step 03 above if food is required.</div>`;
    } else {
        dishesBox.innerHTML = selectedDishes.map(d => `
            <div class="selected-dish-pill">
                <span><strong>${d.name}</strong> (PKR ${d.rate} &times; ${guests})</span>
                <strong class="gold-highlight">${formatPKR(d.total)}</strong>
            </div>
        `).join("");
    }

    const guestsWithMargin = Math.ceil(guests * 1.05);
    document.getElementById("rationGuestsLabel").textContent = `${guests} Guests (+5% safety buffer = ${guestsWithMargin} covers)`;
    document.getElementById("rationGrid").innerHTML = `
        <div class="ration-box-item"><strong>${(guestsWithMargin * 0.18).toFixed(1)} KG</strong><span>Mutton / Chicken (Main)</span></div>
        <div class="ration-box-item"><strong>${(guestsWithMargin * 0.15).toFixed(1)} KG</strong><span>Basmati Rice (Pulao/Biryani)</span></div>
        <div class="ration-box-item"><strong>${Math.round(guestsWithMargin * 2.5)} Pcs</strong><span>BBQ Seekh / Tikka Boti</span></div>
        <div class="ration-box-item"><strong>${Math.ceil(guestsWithMargin * 1.6)} Naans</strong><span>Live Tandoor Naan / Taftan</span></div>
        <div class="ration-box-item"><strong>${(guestsWithMargin * 0.12).toFixed(1)} KG</strong><span>Signature Dessert / Halwa</span></div>
        <div class="ration-box-item"><strong>${Math.ceil(guestsWithMargin * 1.25)} Bottles</strong><span>Mineral Water &amp; Drinks</span></div>
    `;

    // Module 3: Timeline
    document.getElementById("preEventTimelineList").innerHTML = sched.preEventMilestones.map(m => `
        <div class="timeline-item">
            <span class="timeline-time">${m.date}</span>
            <h5>${m.phase}</h5>
            <p>${m.tasks}</p>
        </div>
    `).join("");

    document.getElementById("eventDayHourlyList").innerHTML = sched.eventDayHourly.map(h => `
        <div class="timeline-item">
            <span class="timeline-time">${sched.eventDateFormatted} • ${h.time}</span>
            <h5>${h.activity}</h5>
            <p>${h.detail}</p>
        </div>
    `).join("");

    // Module 4: Single Consolidated 22-Item Master List (100% English)
    const fmtReqDetail = (no, fallbackText) => {
        const sel = reqSelectionsMap[no];
        if (sel && sel.items.length > 0) {
            return `Included: ${sel.items.join(" + ")}`;
        }
        return `Not Selected / Optional (${fallbackText})`;
    };
    const fmtReqCost = (no) => formatPKR(reqSelectionsMap[no]?.cost || 0);

    const master22Rows = [
        { no: 1, item: "Budget", detail: `Total allocation & category limits — Estimated: ${formatPKR(estimatedBudget)} | Actual: ${formatPKR(actualTotalCost)}`, timing: "Day 01 (Today)", cost: formatPKR(actualTotalCost) },
        { no: 2, item: "Date & Time", detail: `Final Date: ${sched.eventDateFormatted} | Start: ${startTime} | Duration: ${durationHours} Hours (${season})`, timing: `${sched.daysRemaining} Days Countdown`, cost: "Schedule Locked" },
        { no: 3, item: "Venue", detail: `${locationMode}: ${selectedVenueSummary} (Capacity for ${guests} guests)`, timing: "4 Weeks Before Event", cost: formatPKR(venueCost) },
        { no: 4, item: "Guest List", detail: `${guests} Total Guests — ${guestBreakdownNote}`, timing: "3-4 Weeks Before Event", cost: `${guests} Guests` },
        { no: 5, item: "Invitations", detail: fmtReqDetail(5, "Printed cards or digital/WhatsApp invitations with schedule"), timing: "2-3 Weeks Before Event", cost: fmtReqCost(5) },
        { no: 6, item: "Food & Drinks", detail: selectedDishes.length > 0 ? `${selectedDishes.length} Dishes (${selectedDishes.map(d => d.name).join(", ")}) via ${catererName}` : "No Catering Selected", timing: "2 Weeks Before Event", cost: formatPKR(foodCost) },
        { no: 7, item: "Seating & Furniture", detail: fmtReqDetail(7, "Chairs, banquet tables, stage platform, flooring, and marquee canopy"), timing: "1-2 Weeks Before Event", cost: fmtReqCost(7) },
        { no: 8, item: "Decoration", detail: fmtReqDetail(8, "Theme palette, fresh florals, stage backdrop, and entrance setup"), timing: "1-2 Weeks Before Event", cost: fmtReqCost(8) },
        { no: 9, item: "Sound System", detail: fmtReqDetail(9, "Wireless microphones, PA speakers, music/DJ, and announcement console"), timing: "1 Week Before Event", cost: fmtReqCost(9) },
        { no: 10, item: "Lighting", detail: fmtReqDetail(10, "Ambient hall floodlights, decorative fairy lights, and stage spotlights"), timing: "1 Week Before Event", cost: fmtReqCost(10) },
        { no: 11, item: "Power Backup", detail: fmtReqDetail(11, "Standby diesel generator and online UPS backup (Mandatory)"), timing: "1 Week Before Event", cost: fmtReqCost(11) },
        { no: 12, item: "Photography & Videography", detail: fmtReqDetail(12, "Professional DSLR photographer, cinematic video, and coverage plan"), timing: "2 Weeks Before Event", cost: fmtReqCost(12) },
        { no: 13, item: "Entertainment/Program", detail: fmtReqDetail(13, "Event host/anchor, stage activities, and program flow schedule"), timing: "1 Week Before Event", cost: fmtReqCost(13) },
        { no: 14, item: "Staff", detail: fmtReqDetail(14, "Uniformed waiters, event coordinator, janitorial crew, and ushers"), timing: "3-5 Days Before Event", cost: fmtReqCost(14) },
        { no: 15, item: "Parking & Transport", detail: fmtReqDetail(15, "Guest vehicle parking area, valet tokens, and shuttle transport"), timing: "3-5 Days Before Event", cost: fmtReqCost(15) },
        { no: 16, item: "Washrooms", detail: fmtReqDetail(16, "On-site venue washroom attendants or portable luxury restrooms"), timing: "On Event Day", cost: fmtReqCost(16) },
        { no: 17, item: "Security", detail: fmtReqDetail(17, "Main gate entry verification, walkthrough detector, and crowd control"), timing: "3 Days Before Event", cost: fmtReqCost(17) },
        { no: 18, item: "First Aid / Emergency Plan", detail: fmtReqDetail(18, "Medical first-aid kit, emergency doctor contact, and exit plan"), timing: "1 Day Before Event", cost: fmtReqCost(18) },
        { no: 19, item: "Permits & Permissions", detail: fmtReqDetail(19, "Sound NOC, road/society clearance, and venue booking compliance"), timing: "1 Week Before Event", cost: fmtReqCost(19) },
        { no: 20, item: "Weather Backup", detail: fmtReqDetail(20, "Waterproof tent canopy or indoor climate-controlled alternative"), timing: "3-5 Days Before Event", cost: fmtReqCost(20) },
        { no: 21, item: "Payments & Advances", detail: fmtReqDetail(21, "Vendor advance receipts ledger and final settlement envelopes"), timing: "Pre & Post Event", cost: fmtReqCost(21) },
        { no: 22, item: "Cleanup", detail: fmtReqDetail(22, "Post-event venue cleaning, surplus food packing, and rental return check"), timing: "Immediately After Event", cost: fmtReqCost(22) }
    ];

    document.getElementById("masterChecklistBody").innerHTML = master22Rows.map(r => `
        <tr>
            <td><input type="checkbox" class="check-input" data-check="${r.no}" /></td>
            <td><strong>#${r.no}</strong></td>
            <td class="req-name"><strong>${r.item}</strong></td>
            <td class="req-desc">${r.detail}</td>
            <td><span class="pill-tag">${r.timing}</span></td>
            <td><strong class="gold-highlight">${r.cost}</strong></td>
        </tr>
    `).join("");

    attachChecklistListeners();

    if (scrollToReport) {
        const planCode = "EE-" + Math.random().toString(36).substring(2, 7).toUpperCase();
        document.getElementById("outPlanCode").textContent = `PLAN #${planCode}`;

        const savedRecord = {
            plan_code: planCode,
            client_name: clientName,
            main_category: mainCategory,
            sub_category: subCategory,
            city: locationMode === "Online" ? "Online" : city,
            guests,
            estimated_budget_pkr: estimatedBudget,
            actual_cost_pkr: actualTotalCost,
            event_date: sched.eventDateFormatted
        };
        stateSavedPlans = [savedRecord, ...stateSavedPlans].slice(0, 15);
        saveLocalState();

        fetch(`${getApiBaseUrl()}/api/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client_name: clientName,
                main_category: mainCategory,
                sub_category: subCategory,
                city,
                location_mode: locationMode,
                guests,
                estimated_budget: estimatedBudget,
                actual_cost: actualTotalCost,
                event_date: eventDate,
                start_time: startTime,
                duration_hours: durationHours
            })
        }).catch(() => {});

        document.getElementById("finalReportSection").scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function attachChecklistListeners() {
    const checkboxes = document.querySelectorAll(".check-input");
    const updateProgress = () => {
        const total = checkboxes.length;
        let checked = 0;
        checkboxes.forEach(cb => {
            const row = cb.closest("tr");
            if (cb.checked) {
                checked++;
                row.classList.add("completed-row");
            } else {
                row.classList.remove("completed-row");
            }
        });
        const pct = total ? Math.round((checked / total) * 100) : 0;
        document.getElementById("checklistPercent").textContent = `${pct}% (${checked}/${total})`;
        document.getElementById("checklistBar").style.width = `${pct}%`;
    };
    checkboxes.forEach(cb => cb.addEventListener("change", updateProgress));
    updateProgress();
}

// ============================================================================
// 9. VENDORS DIRECTORY, SPECIAL EVENTS ARCHIVE & DASHBOARD
// ============================================================================
function renderVendorsDirectory() {
    const grid = document.getElementById("vendorsDirectoryGrid");
    if (!grid) return;

    const filterCity = document.getElementById("vendorFilterCity")?.value || "All";
    const filterCat = document.getElementById("vendorFilterCategory")?.value || "All";
    const filterType = document.getElementById("vendorFilterType")?.value || "All";

    const filtered = stateVendors.filter(v => {
        const cMatch = filterCity === "All" || v.city.toLowerCase() === filterCity.toLowerCase();
        const catMatch = filterCat === "All" || v.main_category === filterCat;
        const tMatch = filterType === "All" || v.vendor_type === filterType;
        return cMatch && catMatch && tMatch;
    });

    const countLabel = document.getElementById("vendorCountLabel");
    if (countLabel) {
        countLabel.textContent = `Showing ${filtered.length} Verified Vendors (${filterCity === "All" ? "All 12 Pakistani Cities" : filterCity})`;
    }

    grid.innerHTML = filtered.map(v => `
        <article class="vendor-profile-card">
            <div class="vendor-banner">
                <img src="${v.image_url}" alt="${v.vendor_name}" />
                <span class="vendor-type-pill">${v.vendor_type} • ${v.main_category}</span>
                <span class="vendor-rating-pill">Rating: ${v.rating} / 5.0</span>
            </div>
            <div class="vendor-content">
                <div>
                    <h3>${v.vendor_name}</h3>
                    <p class="vendor-address">On-Site Location: ${v.onsite_location} (${v.city})</p>
                </div>
                <div class="prof-record-box">
                    <div class="prof-record-title">Personal &amp; Professional Record</div>
                    <p><strong>Lead Professional:</strong> ${v.manager_name} — <em>${v.manager_title}</em></p>
                    <p><strong>Track Record:</strong> ${v.years_experience} Years Experience • ${Number(v.events_completed).toLocaleString()} Events Executed</p>
                    <p><strong>Authority License:</strong> ${v.certification_record}</p>
                </div>
                <p class="muted-sub"><strong>Capacity:</strong> ${v.capacity_range} | <strong>Specialties:</strong> ${v.specialties}</p>
            </div>
            <div class="vendor-bottom-bar">
                <div>
                    <span class="step-tag">Starting Rate</span>
                    <strong class="vm-price">${formatPKR(v.starting_rate_pkr)}${v.per_head_charge ? ` + PKR ${v.per_head_charge}/head` : ""}</strong>
                </div>
                <div>
                    <span class="step-tag">Contact (${v.added_by_user})</span>
                    <strong>${v.contact_phone}</strong>
                </div>
            </div>
        </article>
    `).join("");
}

function renderSpecialEventsArchive() {
    const container = document.getElementById("specialEventsList");
    if (!container) return;

    if (stateSpecialEvents.length === 0) {
        container.innerHTML = `<p class="muted-sub">No custom outside-domain special events submitted yet. Fill out the form on the left to submit your custom event and receive an email response.</p>`;
        return;
    }

    container.innerHTML = stateSpecialEvents.map(sp => `
        <div class="saved-item-card">
            <div>
                <span class="step-tag">${sp.special_code} • Custom Domain: ${sp.custom_domain}</span>
                <h4>${sp.title}</h4>
                <p class="muted-sub">Submitted by: ${sp.user_name} (${sp.user_email} | ${sp.user_phone})</p>
                <p class="muted-sub">Location: ${sp.custom_location}, ${sp.city} | Date: ${sp.event_date || "TBD"} | ${sp.guests} Guests | Est: ${formatPKR(sp.total_budget_pkr)}</p>
                <p class="muted-sub">Custom Requirements: ${sp.signature_elements}</p>
            </div>
            <span class="pill-tag">Response Queued for ${sp.user_email}</span>
        </div>
    `).join("");
}

async function renderDashboard() {
    try {
        const res = await fetch(`${getApiBaseUrl()}/api/dashboard`);
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.saved_plans) && data.saved_plans.length > 0) {
                stateSavedPlans = data.saved_plans;
            }
            if (Array.isArray(data.vendors) && data.vendors.length > 0) {
                stateVendors = data.vendors.length >= stateVendors.length ? data.vendors : stateVendors;
            }
            saveLocalState();
        }
    } catch (err) {
        console.warn("[EventEase] Backend unreachable, showing locally cached Dashboard data.", err);
    }

    document.getElementById("dashUserName").textContent = currentUser.full_name;
    document.getElementById("dashUserEmail").textContent = currentUser.email;
    document.getElementById("dashUserPhone").textContent = currentUser.phone;
    document.getElementById("dashUserCity").textContent = currentUser.city || "Lahore";
    document.getElementById("dashUserRole").textContent = (currentUser.role || "Event Planner").toUpperCase();
    const initials = currentUser.full_name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
    document.getElementById("dashAvatar").textContent = initials || "WN";

    const plansBox = document.getElementById("dashPlansList");
    if (plansBox) {
        if (stateSavedPlans.length === 0) {
            plansBox.innerHTML = `<p class="muted-sub">No plans saved yet. Click '+ Build New Event Plan' to create one.</p>`;
        } else {
            plansBox.innerHTML = stateSavedPlans.map(p => `
                <div class="saved-item-card">
                    <div>
                        <span class="step-tag">${p.plan_code} • ${p.event_date || "Scheduled"}</span>
                        <h4>${p.client_name} (${p.sub_category})</h4>
                        <p class="muted-sub">${p.city} • ${p.guests} Guests | Est: ${formatPKR(p.estimated_budget_pkr)} vs Actual: ${formatPKR(p.actual_cost_pkr)}</p>
                    </div>
                    <button type="button" class="btn-outline-sm" data-nav="plan-builder">Open Builder</button>
                </div>
            `).join("");
            plansBox.querySelectorAll("[data-nav]").forEach(b => {
                b.addEventListener("click", () => navigateToView("plan-builder"));
            });
        }
    }

    const vendorsBox = document.getElementById("dashVendorsList");
    if (vendorsBox) {
        vendorsBox.innerHTML = stateVendors.slice(0, 6).map(v => `
            <div class="saved-item-card">
                <div>
                    <span class="step-tag">${v.vendor_type} • ${v.city}</span>
                    <h4>${v.vendor_name}</h4>
                    <p class="muted-sub">${v.onsite_location} | Director: ${v.manager_name}</p>
                </div>
                <strong>${formatPKR(v.starting_rate_pkr)}</strong>
            </div>
        `).join("");
    }
}

// ============================================================================
// 10. INITIALIZATION & EVENT LISTENERS
// ============================================================================
async function loadVendorsFromBackend() {
    try {
        const res = await fetch(`${getApiBaseUrl()}/api/vendors`);
        if (!res.ok) throw new Error("Backend vendors request failed");
        const data = await res.json();
        if (Array.isArray(data.vendors) && data.vendors.length > 0) {
            stateVendors = data.vendors;
            saveLocalState();
            console.log(`[EventEase] Loaded ${data.vendors.length} vendors from: ${data.source}`);
        }
    } catch (err) {
        console.warn("[EventEase] Backend unreachable, using local/offline vendor directory.", err);
    }
}

async function loadSpecialEventsFromBackend() {
    try {
        const res = await fetch(`${getApiBaseUrl()}/api/special-events`);
        if (!res.ok) throw new Error("Backend special-events request failed");
        const data = await res.json();
        if (Array.isArray(data.special_events)) {
            stateSpecialEvents = data.special_events;
            saveLocalState();
        }
    } catch (err) {
        console.warn("[EventEase] Backend unreachable, using local/offline special events archive.", err);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    updateAuthUI();
    await loadVendorsFromBackend();
    await loadSpecialEventsFromBackend();
    renderLandingCategories();
    populateSubcategoryDropdown("Social & Family", "Weddings (Barat & Nikkah)");
    renderCityVenueVendorOptions();
    renderDishesConfigurator();
    renderRequirementsCheckboxes();
    renderVendorsDirectory();
    renderSpecialEventsArchive();
    recalculateLiveBillAndGenerateReport(false);

    // Navigation buttons
    document.querySelectorAll("[data-nav]").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            navigateToView(btn.dataset.nav);
            closeMobileMenu();
        });
    });

    // Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById("btnHamburgerMenu");
    const mobileNavLinks = document.getElementById("mainNavLinks");

    function closeMobileMenu() {
        hamburgerBtn?.classList.remove("open");
        mobileNavLinks?.classList.remove("mobile-open");
        document.body.style.overflow = "";
    }

    function toggleMobileMenu() {
        const isOpen = mobileNavLinks.classList.toggle("mobile-open");
        hamburgerBtn.classList.toggle("open", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
    }

    hamburgerBtn?.addEventListener("click", toggleMobileMenu);

    window.addEventListener("resize", () => {
        if (window.innerWidth > 860) closeMobileMenu();
    });

    // Hero Showcase Thumbnails (Auto switches domain theme)
    document.querySelectorAll(".hero-thumb").forEach(thumb => {
        thumb.addEventListener("click", () => {
            document.querySelectorAll(".hero-thumb").forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
            document.getElementById("heroShowcaseImg").src = thumb.dataset.img;
            document.getElementById("heroShowcaseTag").textContent = thumb.dataset.tag;
            document.getElementById("heroShowcaseTitle").textContent = thumb.dataset.title;
            document.getElementById("heroShowcaseSub").textContent = thumb.dataset.sub;
            if (thumb.dataset.domain) applyDomainTheme(thumb.dataset.domain);
        });
    });

    // Main Category Change -> Automatically applies that domain's color theme
    document.getElementById("mainCategory").addEventListener("change", e => {
        populateSubcategoryDropdown(e.target.value);
        recalculateLiveBillAndGenerateReport(false);
    });

    // City & Venue Preference Change
    document.getElementById("city").addEventListener("change", () => {
        renderCityVenueVendorOptions();
        recalculateLiveBillAndGenerateReport(false);
    });
    document.getElementById("venuePreference").addEventListener("change", () => {
        renderCityVenueVendorOptions();
        recalculateLiveBillAndGenerateReport(false);
    });

    // Online vs On-Site Location Mode Toggle
    const btnOnsite = document.getElementById("btnModeOnsite");
    const btnOnline = document.getElementById("btnModeOnline");
    const onlinePanel = document.getElementById("onlineVenuePanel");
    const onsitePanel = document.getElementById("onsiteVenuePanel");
    const locModeInput = document.getElementById("locationMode");

    btnOnsite.addEventListener("click", () => {
        btnOnsite.classList.add("active");
        btnOnline.classList.remove("active");
        locModeInput.value = "On-Site";
        onsitePanel.classList.remove("hidden");
        onlinePanel.classList.add("hidden");
        recalculateLiveBillAndGenerateReport(false);
    });

    btnOnline.addEventListener("click", () => {
        btnOnline.classList.add("active");
        btnOnsite.classList.remove("active");
        locModeInput.value = "Online";
        onlinePanel.classList.remove("hidden");
        onsitePanel.classList.add("hidden");
        recalculateLiveBillAndGenerateReport(false);
    });

    document.querySelectorAll(".online-opt-check").forEach(cb => {
        cb.addEventListener("change", () => recalculateLiveBillAndGenerateReport(false));
    });

    // Guests & Budget Sliders
    const guestsInput = document.getElementById("guests");
    const guestsSlider = document.getElementById("guestsSlider");
    const guestsDisplay = document.getElementById("guestsDisplay");
    const budgetInput = document.getElementById("totalBudget");
    const budgetSlider = document.getElementById("budgetSlider");
    const budgetDisplay = document.getElementById("budgetDisplay");

    function syncGuests(val) {
        const g = Math.max(10, parseInt(val || 100, 10));
        guestsInput.value = g;
        guestsSlider.value = Math.min(1500, g);
        guestsDisplay.textContent = `${g.toLocaleString()} Guests`;
        renderCityVenueVendorOptions();
        recalculateLiveBillAndGenerateReport(false);
    }

    function syncBudget(val) {
        const b = Math.max(10000, parseInt(val || 100000, 10));
        budgetInput.value = b;
        budgetSlider.value = Math.min(5000000, b);
        budgetDisplay.textContent = formatPKR(b);
        recalculateLiveBillAndGenerateReport(false);
    }

    guestsInput.addEventListener("input", e => syncGuests(e.target.value));
    guestsSlider.addEventListener("input", e => syncGuests(e.target.value));
    budgetInput.addEventListener("input", e => syncBudget(e.target.value));
    budgetSlider.addEventListener("input", e => syncBudget(e.target.value));

    ["eventDate", "eventStartTime", "eventDuration", "seasonSelect", "guestBreakdownNote"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", () => recalculateLiveBillAndGenerateReport(false));
    });

    // Menu Quick Selection Buttons
    function selectMenuTier(tierName) {
        document.querySelectorAll(".dish-check-input").forEach(cb => {
            const dishObj = DISHES_CATALOG.flatMap(g => g.dishes).find(d => d.id === cb.dataset.dishId);
            cb.checked = dishObj ? dishObj.default_tier.map(t => t.trim()).includes(tierName) : false;
        });
        recalculateLiveBillAndGenerateReport(false);
    }
    document.getElementById("btnMenuEconomy").addEventListener("click", () => selectMenuTier("economy"));
    document.getElementById("btnMenuStandard").addEventListener("click", () => selectMenuTier("standard"));
    document.getElementById("btnMenuLuxury").addEventListener("click", () => selectMenuTier("luxury"));
    document.getElementById("btnMenuClear").addEventListener("click", () => {
        document.querySelectorAll(".dish-check-input").forEach(cb => { cb.checked = false; });
        recalculateLiveBillAndGenerateReport(false);
    });

    // Requirements Quick Buttons
    document.getElementById("btnSelectRecommendedReqs").addEventListener("click", () => {
        renderRequirementsCheckboxes();
        recalculateLiveBillAndGenerateReport(false);
    });
    document.getElementById("btnClearAllReqs").addEventListener("click", () => {
        document.querySelectorAll(".req-opt-check").forEach(cb => { cb.checked = false; });
        recalculateLiveBillAndGenerateReport(false);
    });

    // Quick Scenario Presets
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const p = btn.dataset.preset;
            if (p === "royal_wedding") {
                document.getElementById("clientName").value = "Warisha Noor Family Royal Barat";
                document.getElementById("mainCategory").value = "Social & Family";
                populateSubcategoryDropdown("Social & Family", "Weddings (Barat & Nikkah)");
                btnOnsite.click();
                document.getElementById("city").value = "Lahore";
                syncGuests(300);
                syncBudget(850000);
                selectMenuTier("standard");
            } else if (p === "academic_convocation") {
                document.getElementById("clientName").value = "National University Convocation";
                document.getElementById("mainCategory").value = "Academic & Educational";
                populateSubcategoryDropdown("Academic & Educational", "University Convocations");
                btnOnsite.click();
                document.getElementById("city").value = "Islamabad";
                syncGuests(500);
                syncBudget(950000);
                selectMenuTier("economy");
            } else if (p === "online_summit") {
                document.getElementById("clientName").value = "All-Pakistan Tech & AI Virtual Summit";
                document.getElementById("mainCategory").value = "Corporate & Business";
                populateSubcategoryDropdown("Corporate & Business", "Corporate Conferences");
                btnOnline.click();
                document.querySelectorAll(".online-opt-check").forEach((cb, i) => { cb.checked = i < 2; });
                document.querySelectorAll(".dish-check-input").forEach(cb => { cb.checked = false; });
                syncGuests(400);
                syncBudget(90000);
            }
            recalculateLiveBillAndGenerateReport(true);
        });
    });

    // Main Generate Buttons
    document.getElementById("granularPlanForm").addEventListener("submit", e => {
        e.preventDefault();
        recalculateLiveBillAndGenerateReport(true);
    });
    document.getElementById("btnStickyGenerate").addEventListener("click", () => {
        recalculateLiveBillAndGenerateReport(true);
    });

    // Master Checklist Check All / Reset / Print
    document.getElementById("btnCheckAll").addEventListener("click", () => {
        document.querySelectorAll(".check-input").forEach(cb => { cb.checked = true; });
        attachChecklistListeners();
    });
    document.getElementById("btnUncheckAll").addEventListener("click", () => {
        document.querySelectorAll(".check-input").forEach(cb => { cb.checked = false; });
        attachChecklistListeners();
    });
    document.getElementById("btnPrintPlan").addEventListener("click", () => window.print());

    // Vendor Directory Filters & Add New Vendor Form
    ["vendorFilterCity", "vendorFilterCategory", "vendorFilterType"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", renderVendorsDirectory);
    });

    document.getElementById("addVendorForm").addEventListener("submit", async e => {
        e.preventDefault();
        const fallbackIdx = (stateVendors.length % 72) + 1;
        const customImg = document.getElementById("vImage").value.trim();
        const newVendorPayload = {
            vendor_name: document.getElementById("vName").value.trim(),
            vendor_type: document.getElementById("vType").value,
            venue_subtype: document.getElementById("vType").value,
            main_category: document.getElementById("vCategory").value,
            city: document.getElementById("vCity").value,
            onsite_location: document.getElementById("vLocation").value.trim(),
            manager_name: document.getElementById("vManagerName").value.trim(),
            manager_title: document.getElementById("vManagerTitle").value.trim(),
            certification_record: document.getElementById("vCert").value.trim(),
            years_experience: parseInt(document.getElementById("vExp").value, 10) || 12,
            events_completed: parseInt(document.getElementById("vEventsDone").value, 10) || 400,
            capacity_range: document.getElementById("vCapacity").value.trim(),
            starting_rate_pkr: parseInt(document.getElementById("vRate").value, 10) || 150000,
            per_head_charge: 150,
            contact_phone: document.getElementById("vPhone").value.trim(),
            image_url: customImg || `assets/images/vendors/vendor-${fallbackIdx}.jpg`,
            specialties: document.getElementById("vSpecialties").value.trim(),
            rating: 5.0,
            added_by_user: currentUser.full_name
        };

        let savedVendor = { id: Date.now(), ...newVendorPayload };
        let persistedToDb = false;
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/vendors`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVendorPayload)
            });
            if (res.ok) {
                const data = await res.json();
                savedVendor = data.vendor;
                persistedToDb = !!data.persisted_to_database;
            }
        } catch (err) {
            console.warn("[EventEase] Backend unreachable, vendor saved locally only.", err);
        }

        stateVendors.unshift(savedVendor);
        saveLocalState();
        renderVendorsDirectory();
        renderCityVenueVendorOptions();
        e.target.reset();
        window.scrollTo({ top: 200, behavior: "smooth" });

        if (persistedToDb) {
            console.log("[EventEase] Vendor permanently saved to Neon database.");
        }
    });

    // Special Event Form (Custom User Input + Email Response)
    document.getElementById("specialEventForm").addEventListener("submit", async e => {
        e.preventDefault();
        const entry = {
            special_code: "SPEC-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
            user_name: document.getElementById("specUserName").value.trim(),
            user_email: document.getElementById("specUserEmail").value.trim(),
            user_phone: document.getElementById("specUserPhone").value.trim(),
            event_date: document.getElementById("specDate").value,
            custom_domain: document.getElementById("specCustomDomain").value.trim(),
            title: document.getElementById("specTitle").value.trim(),
            city: document.getElementById("specCity").value.trim(),
            custom_location: document.getElementById("specLocation").value.trim(),
            guests: parseInt(document.getElementById("specGuests").value, 10) || 100,
            total_budget_pkr: parseInt(document.getElementById("specBudget").value, 10) || 500000,
            signature_elements: document.getElementById("specElements").value.trim()
        };

        let finalEntry = entry;
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/special-events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry)
            });
            if (res.ok) {
                const data = await res.json();
                finalEntry = data.special_event || entry;
            }
        } catch (err) {
            console.warn("[EventEase] Backend unreachable, special event saved locally only.", err);
        }

        stateSpecialEvents.unshift(finalEntry);
        saveLocalState();
        renderSpecialEventsArchive();

        const banner = document.getElementById("specialEventConfirmBanner");
        banner.textContent = `Thank you, ${entry.user_name}! Your custom Special Event ("${entry.title}" under domain "${entry.custom_domain}") has been registered. Our team (warishanoor301@gmail.com | 0340 8704093) will send the complete custom response and event blueprint directly to your email: ${entry.user_email}.`;
        banner.classList.remove("hidden");
        e.target.reset();
    });

    // Contact Form -> Sends to Backend /api/contact (Neon-backed when connected)
    document.getElementById("contactForm").addEventListener("submit", async e => {
        e.preventDefault();
        const name = document.getElementById("cName").value.trim();
        const payload = {
            sender_name: name,
            sender_email: document.getElementById("cEmail").value.trim(),
            sender_phone: document.getElementById("cPhone").value.trim(),
            event_category: document.getElementById("cCategory").value,
            message: document.getElementById("cMessage").value.trim()
        };

        try {
            await fetch(`${getApiBaseUrl()}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.warn("[EventEase] Backend unreachable, contact message not persisted to server.", err);
        }

        const banner = document.getElementById("contactSuccessBanner");
        banner.classList.remove("hidden", "status-banner-error");
        banner.textContent = `Thank you, ${name}! Your consultation inquiry has been sent to Warisha Noor (warishanoor301@gmail.com | 0340 8704093).`;
        e.target.reset();
    });

    // Login Form -> Verifies Real Account via Backend/Neon, Unlocks Dashboard Tab
    document.getElementById("loginForm").addEventListener("submit", async e => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPass").value.trim();
        const errorBanner = document.getElementById("loginErrorBanner");
        errorBanner.classList.add("hidden");

        try {
            const res = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (!res.ok) {
                errorBanner.textContent = data.error || "Login failed. Please check your email and password.";
                errorBanner.classList.remove("hidden");
                return;
            }

            currentUser = data.user;
            isAccountLoggedIn = true;
            saveLocalState();
            updateAuthUI();
            renderDashboard();
            navigateToView("dashboard");
        } catch (err) {
            // Backend fully unreachable (e.g. offline demo) -- allow lenient local login
            currentUser = {
                full_name: email.toLowerCase().includes("warisha") ? "Warisha Noor" : email.split("@")[0].replace(/\./g, " "),
                email,
                phone: "0340 8704093",
                city: "Lahore",
                role: email.toLowerCase().includes("warisha") ? "Founder & Lead Architect" : "Registered Event Planner"
            };
            isAccountLoggedIn = true;
            saveLocalState();
            updateAuthUI();
            renderDashboard();
            navigateToView("dashboard");
        }
    });

    // Sign Up Form -> Creates Real Account via Backend/Neon, Unlocks Dashboard Tab
    document.getElementById("signupForm").addEventListener("submit", async e => {
        e.preventDefault();
        const errorBanner = document.getElementById("signupErrorBanner");
        errorBanner.classList.add("hidden");

        const payload = {
            full_name: document.getElementById("regName").value.trim(),
            email: document.getElementById("regEmail").value.trim(),
            phone: document.getElementById("regPhone").value.trim(),
            city: document.getElementById("regCity").value,
            role: document.getElementById("regRole").value,
            password: document.getElementById("regPass").value.trim()
        };

        try {
            const res = await fetch(`${getApiBaseUrl()}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (!res.ok) {
                errorBanner.textContent = data.error || "Sign up failed. Please try a different email.";
                errorBanner.classList.remove("hidden");
                return;
            }

            currentUser = data.user;
            isAccountLoggedIn = true;
            saveLocalState();
            updateAuthUI();
            renderDashboard();
            navigateToView("dashboard");
        } catch (err) {
            // Backend fully unreachable (e.g. offline demo) -- allow local-only account creation
            currentUser = {
                full_name: payload.full_name,
                email: payload.email,
                phone: payload.phone,
                city: payload.city,
                role: payload.role
            };
            isAccountLoggedIn = true;
            saveLocalState();
            updateAuthUI();
            renderDashboard();
            navigateToView("dashboard");
        }
    });

    // Logout Button
    document.getElementById("btnLogout").addEventListener("click", () => {
        isAccountLoggedIn = false;
        saveLocalState();
        updateAuthUI();
        navigateToView("home");
    });

    // Server Link Modal
    const modal = document.getElementById("apiModal");
    const renderUrlInput = document.getElementById("renderUrlInput");
    document.getElementById("btnConfigApi").addEventListener("click", () => {
        renderUrlInput.value = getApiBaseUrl();
        modal.classList.remove("hidden");
    });
    document.getElementById("btnCloseModal").addEventListener("click", () => modal.classList.add("hidden"));
    document.getElementById("btnSaveApiUrl").addEventListener("click", () => {
        localStorage.setItem("EVENTEASE_API_URL", renderUrlInput.value.trim());
        modal.classList.add("hidden");
        recalculateLiveBillAndGenerateReport(false);
    });
    document.getElementById("btnResetApiUrl").addEventListener("click", () => {
        localStorage.removeItem("EVENTEASE_API_URL");
        renderUrlInput.value = "";
        modal.classList.add("hidden");
        recalculateLiveBillAndGenerateReport(false);
    });
});
