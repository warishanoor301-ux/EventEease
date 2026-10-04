-- ============================================================================
-- EventEase Luxury Edition - Neon PostgreSQL Database Schema & Seed Data
-- Lead Architect: Warisha Noor (warishanoor301@gmail.com | 0340 8704093)
-- ============================================================================

DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS special_events CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS saved_plans CASCADE;
DROP TABLE IF EXISTS venues CASCADE;
DROP TABLE IF EXISTS food_menus CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. USERS TABLE (For Sign Up, Login & User Dashboard)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(40) NOT NULL,
    city VARCHAR(80) DEFAULT 'Lahore',
    role VARCHAR(60) DEFAULT 'Event Host & Planner',
    password_hash VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. VENUES TABLE (Used by Smart Algorithm)
CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    city VARCHAR(80) NOT NULL,
    area VARCHAR(120) NOT NULL,
    venue_type VARCHAR(80) NOT NULL,
    category_fit VARCHAR(220) NOT NULL,
    tier VARCHAR(40) NOT NULL,
    min_capacity INT NOT NULL,
    max_capacity INT NOT NULL,
    base_rent_pkr INT NOT NULL,
    per_head_hall_charge INT DEFAULT 0,
    weather_suitability VARCHAR(120) NOT NULL,
    has_ac BOOLEAN DEFAULT TRUE,
    has_generator BOOLEAN DEFAULT TRUE,
    parking_capacity INT DEFAULT 100,
    image_url VARCHAR(255) DEFAULT 'assets/images/pakistani-banquet-marquee.jpg',
    features TEXT NOT NULL
);

-- 3. FOOD MENUS TABLE
CREATE TABLE food_menus (
    id SERIAL PRIMARY KEY,
    package_name VARCHAR(140) NOT NULL,
    tier VARCHAR(40) NOT NULL,
    category_fit VARCHAR(220) NOT NULL,
    cost_per_head_pkr INT NOT NULL,
    welcome_drink VARCHAR(140),
    main_dishes TEXT NOT NULL,
    bbq_starters TEXT,
    rice_bread TEXT NOT NULL,
    desserts TEXT NOT NULL,
    hot_cold_drinks TEXT NOT NULL
);

-- 4. VENDORS & ON-SITE BANQUET PROFILES TABLE (With Personal & Professional Record)
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(160) NOT NULL,
    vendor_type VARCHAR(80) NOT NULL, -- Banquet & Marquee, Royal Catering, Floral & Stage Decor, Audio-Visual & Production, Photography & Cinema
    main_category VARCHAR(100) NOT NULL,
    city VARCHAR(80) NOT NULL,
    onsite_location VARCHAR(200) NOT NULL,
    manager_name VARCHAR(120) NOT NULL,
    manager_title VARCHAR(100) NOT NULL,
    years_experience INT NOT NULL,
    events_completed INT NOT NULL,
    certification_record VARCHAR(180) NOT NULL,
    capacity_range VARCHAR(80) NOT NULL,
    starting_rate_pkr INT NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    rating NUMERIC(3,1) DEFAULT 4.9,
    image_url VARCHAR(255) NOT NULL,
    specialties TEXT NOT NULL,
    added_by_user VARCHAR(120) DEFAULT 'System Verified',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. SAVED EVENT PLANS TABLE
CREATE TABLE saved_plans (
    id SERIAL PRIMARY KEY,
    plan_code VARCHAR(30) UNIQUE NOT NULL,
    client_name VARCHAR(120) DEFAULT 'Valued Host',
    user_email VARCHAR(150) DEFAULT 'warishanoor301@gmail.com',
    main_category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(120) NOT NULL,
    city VARCHAR(80) NOT NULL,
    venue_preference VARCHAR(80) NOT NULL,
    guests INT NOT NULL,
    total_budget_pkr BIGINT NOT NULL,
    season VARCHAR(50) NOT NULL,
    calculated_tier VARCHAR(40) NOT NULL,
    plan_json JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. SPECIAL CUSTOM EVENTS TABLE
CREATE TABLE special_events (
    id SERIAL PRIMARY KEY,
    special_code VARCHAR(30) UNIQUE NOT NULL,
    title VARCHAR(160) NOT NULL,
    main_category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(120) NOT NULL,
    city VARCHAR(80) NOT NULL,
    custom_location VARCHAR(180) NOT NULL,
    guests INT NOT NULL,
    total_budget_pkr BIGINT NOT NULL,
    signature_elements TEXT NOT NULL,
    user_email VARCHAR(150) DEFAULT 'warishanoor301@gmail.com',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    sender_name VARCHAR(120) NOT NULL,
    sender_email VARCHAR(150) NOT NULL,
    sender_phone VARCHAR(50) NOT NULL,
    event_category VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SEED USERS
-- ============================================================================
INSERT INTO users (full_name, email, phone, city, role, password_hash) VALUES
('Warisha Noor', 'warishanoor301@gmail.com', '0340 8704093', 'Lahore', 'Founder & Lead Architect', 'demo123');

-- ============================================================================
-- SEED VENUES
-- ============================================================================
INSERT INTO venues (name, city, area, venue_type, category_fit, tier, min_capacity, max_capacity, base_rent_pkr, per_head_hall_charge, weather_suitability, has_ac, has_generator, parking_capacity, image_url, features) VALUES
('Royal Palm Grand Heritage Marquee', 'Lahore', 'Gulberg / Canal Bank', 'Marquee', 'Social & Family,Corporate & Business,Entertainment & Performance', 'Luxury', 250, 1200, 350000, 400, 'All Weather (Indoor Chiller AC)', TRUE, TRUE, 350, 'assets/images/pakistani-wedding-stage.jpg', 'Central Chiller AC, Valet Parking, Bridal & VIP Suite, Carved Royal Stage, Heavy Standby Generator'),
('Al-Hamra Executive Banquet Hall', 'Lahore', 'Johar Town / Canal Road', 'Banquet Hall', 'Social & Family,Academic & Educational,Community & Cultural', 'Standard', 100, 500, 140000, 200, 'All Weather (Indoor AC)', TRUE, TRUE, 150, 'assets/images/pakistani-banquet-marquee.jpg', 'Indoor AC Hall, Line-Array Sound System, Stage Lighting Rig, Full Backup Power'),
('Bedian Imperial Farmhouse & Lawn', 'Lahore', 'Bedian Road, DHA Phase 7 Ext', 'Farmhouse', 'Social & Family,Entertainment & Performance,Community & Cultural', 'Standard', 150, 900, 165000, 150, 'Winter & Spring Ideal', FALSE, TRUE, 250, 'assets/images/pakistani-mehndi-night.jpg', 'Lush Open Mughal Lawn, Marigold & Sufi Stage Area, German Waterproof Canopy Option'),
('Pearl Continental Grand Ballroom', 'Karachi', 'Club Road / Clifton', 'Banquet Hall', 'Corporate & Business,Academic & Educational,Social & Family', 'Luxury', 200, 1200, 420000, 450, 'All Weather (Indoor AC)', TRUE, TRUE, 400, 'assets/images/pakistani-corporate-gala.jpg', 'SMD LED Backdrop Wall, Five-Star Acoustic Treatment, Executive VIP Lounges, High Security'),
('DHA Creek Vista Royal Marquee', 'Karachi', 'DHA Phase 8', 'Marquee', 'Social & Family,Entertainment & Performance', 'Luxury', 300, 1500, 380000, 380, 'All Weather (Indoor AC)', TRUE, TRUE, 380, 'assets/images/pakistani-wedding-stage.jpg', 'Crystal Chandeliers, Sea Breeze Courtyard, Designer Stage, Valet Parking'),
('North Nazimabad Crown Banquet', 'Karachi', 'Block H, Shahrah-e-Sher Shah Suri', 'Banquet Hall', 'Social & Family,Community & Cultural,Academic & Educational', 'Economy', 80, 550, 95000, 140, 'All Weather (Indoor AC)', TRUE, TRUE, 140, 'assets/images/pakistani-banquet-marquee.jpg', 'Spacious Partitionable Hall, Full Generator Backup, Easy Central Access'),
('Serena Margalla Grand Marquee', 'Islamabad', 'Kashmir Highway / E-11', 'Marquee', 'Corporate & Business,Social & Family,Academic & Educational', 'Luxury', 200, 1000, 330000, 380, 'All Weather (HVAC Climate Control)', TRUE, TRUE, 300, 'assets/images/pakistani-corporate-gala.jpg', 'Margalla Hills View, Heating & Cooling HVAC, Diplomatic Security Protocol'),
('Jinnah Convention Auditorium & Hall', 'Islamabad', 'Constitution Avenue / F-5', 'Convention Hall', 'Academic & Educational,Corporate & Business,Entertainment & Performance', 'Standard', 150, 1200, 180000, 180, 'All Weather (Indoor AC)', TRUE, TRUE, 350, 'assets/images/pakistani-academic-convocation.jpg', 'Tiered Auditorium Seating, Digital Podium, Simultaneous Translation & Projection'),
('Bahria Expressway Royal Marquee', 'Rawalpindi', 'Bahria Town Phase 7', 'Marquee', 'Social & Family,Community & Cultural,Corporate & Business', 'Standard', 120, 800, 155000, 200, 'All Weather (Indoor AC)', TRUE, TRUE, 220, 'assets/images/pakistani-banquet-marquee.jpg', 'Gold Chandeliers, Red Carpet Walkway, Dedicated Bridal & Green Rooms'),
('Canal Road Kohinoor Grand Marquee', 'Faisalabad', 'Main Canal Expressway', 'Marquee', 'Social & Family,Corporate & Business,Academic & Educational', 'Standard', 150, 900, 145000, 180, 'All Weather (Indoor AC)', TRUE, TRUE, 240, 'assets/images/pakistani-wedding-stage.jpg', 'Grand Floral Archway, Heavy Chiller AC, Custom Stage Design, Standby Power'),
('Bosan Road Nawab Heritage Hall', 'Multan', 'Main Bosan Road', 'Banquet Hall', 'Social & Family,Academic & Educational,Community & Cultural', 'Standard', 100, 700, 125000, 160, 'All Weather (Indoor AC)', TRUE, TRUE, 200, 'assets/images/pakistani-community-gala.jpg', 'Multani Royal Architecture, Chiller AC, Spacious Courtyard Parking');

-- ============================================================================
-- SEED VENDORS & ON-SITE PROFILES (With Personal & Professional Records)
-- ============================================================================
INSERT INTO vendors (vendor_name, vendor_type, main_category, city, onsite_location, manager_name, manager_title, years_experience, events_completed, certification_record, capacity_range, starting_rate_pkr, contact_phone, rating, image_url, specialties, added_by_user) VALUES
('Qasar-e-Noor Royal Marquee & Lawns', 'Banquet & Marquee', 'Social & Family', 'Lahore', 'Plot 14-B, Main Gulberg Boulevard, Lahore', 'Mian Tariq Mehmood', 'Managing Director & Senior Event Architect', 16, 1420, 'PHA & Punjab Food Authority Grade-A Certified (#PFA-LHR-8821)', '200 to 1,200 Guests', 220000, '0300 4112299', 4.9, 'assets/images/pakistani-wedding-stage.jpg', 'Royal Barat & Walima Stages, Chiller AC, Valet Parking, In-House Power Plant', 'Warisha Noor'),
('Aiwan-e-Iqbal Executive Convention Suites', 'Banquet & Marquee', 'Academic & Educational', 'Lahore', 'Egerton Road, Near Davis Road, Lahore', 'Dr. Kamran Siddiqui', 'Director of Academic Conventions & Operations', 19, 980, 'HEC & Chamber of Commerce Verified Venue (#LCCI-4410)', '150 to 1,500 Delegates', 160000, '0321 8445566', 4.8, 'assets/images/pakistani-academic-convocation.jpg', 'University Convocations, Quiz Championships, SMD Screens, Acoustic Podiums', 'Warisha Noor'),
('Clifton Grand Palm Marquee & Banquet', 'Banquet & Marquee', 'Corporate & Business', 'Karachi', 'Main Sea View Road, DHA Phase 8, Karachi', 'Syed Farhan Ali', 'Chief Hospitality & Corporate Events Officer', 14, 1150, 'Sindh Food Authority & KCCI Gold Member (#KCCI-9023)', '100 to 1,400 Guests', 280000, '0333 2119988', 4.9, 'assets/images/pakistani-corporate-gala.jpg', 'Corporate Galas, Product Launches, Board Summits, High-Speed Fiber & LED Walls', 'Warisha Noor'),
('Shahi Dastarkhwan Copper Handi Caterers', 'Royal Catering', 'Social & Family', 'Lahore', 'MM Alam Road Culinary Hub, Gulberg III, Lahore', 'Haji Abdul Rehman Qureshi', 'Master Executive Chef & Culinary Director', 24, 3200, 'ISO 22000 Food Safety & Halal Authority Certified (#PFA-CAT-109)', '50 to 3,000 Guests', 1450, '0301 7788990', 5.0, 'assets/images/pakistani-shahi-catering.jpg', 'Mutton Raan Roast, Zafrani Yakhni Pulao, Live Seekh Kabab Grill, Kunafa & Rabri Bar', 'Warisha Noor'),
('Margalla Heritage Courtyard & Sufi Pavilion', 'Banquet & Marquee', 'Entertainment & Performance', 'Islamabad', 'Park Road, Bani Gala Foothills, Islamabad', 'Zainab Afridi', 'Creative Producer & Cultural Venue Head', 11, 640, 'CDA & Islamabad Culture Wing Approved (#CDA-EV-312)', '100 to 800 Guests', 190000, '0345 5112233', 4.9, 'assets/images/pakistani-mehndi-night.jpg', 'Sufi Qawwali Nights, Mehndi Dholki, Acoustic Concert Rig, Marigold & Brass Decor', 'Warisha Noor'),
('Nawab-e-Multan Cultural Pavilion & Hall', 'Banquet & Marquee', 'Community & Cultural', 'Multan', 'Main Bosan Road, Near Gulgasht Colony, Multan', 'Makhdoom Shahzad Bukhari', 'Director Heritage Hospitality', 15, 890, 'South Punjab Hospitality Board Registered (#SPHB-552)', '100 to 1,000 Guests', 130000, '0302 6778844', 4.8, 'assets/images/pakistani-community-gala.jpg', 'Charity Galas, Grand Milad & Iftar Gatherings, Cultural Melas, Traditional Lounge', 'Warisha Noor');
