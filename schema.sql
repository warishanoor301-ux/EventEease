-- ============================================================================
-- EventEase Luxury Edition - Neon PostgreSQL Database Schema (DDL Only)
-- Lead Architect: Warisha Noor (warishanoor301@gmail.com | 0340 8704093)
-- Run this ONCE in the Neon SQL Editor. The backend (app.py) automatically
-- seeds the 72 verified vendors into the `vendors` table on first startup
-- if the table is empty -- no manual seed INSERTs are required here.
-- ============================================================================

DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS special_events CASCADE;
DROP TABLE IF EXISTS saved_plans CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. USERS TABLE (Real Sign Up, Login & Dashboard Authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(40) NOT NULL,
    city VARCHAR(80) DEFAULT 'Lahore',
    role VARCHAR(80) DEFAULT 'Event Host & Planner',
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. VENDORS TABLE (72 Verified Vendors Across 12 Pakistani Cities)
--    Auto-seeded by app.py from algorithm.py on first run if this table is empty.
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(180) NOT NULL,
    vendor_type VARCHAR(100) NOT NULL,
    venue_subtype VARCHAR(100) DEFAULT 'General',
    main_category VARCHAR(100) NOT NULL,
    city VARCHAR(80) NOT NULL,
    onsite_location VARCHAR(220) NOT NULL,
    manager_name VARCHAR(140) NOT NULL,
    manager_title VARCHAR(140) NOT NULL,
    years_experience INT NOT NULL DEFAULT 10,
    events_completed INT NOT NULL DEFAULT 200,
    certification_record VARCHAR(220) NOT NULL,
    capacity_range VARCHAR(100) NOT NULL,
    starting_rate_pkr INT NOT NULL DEFAULT 100000,
    per_head_charge INT NOT NULL DEFAULT 0,
    contact_phone VARCHAR(50) NOT NULL,
    rating NUMERIC(3,1) DEFAULT 4.8,
    image_url VARCHAR(255) NOT NULL,
    specialties TEXT NOT NULL,
    added_by_user VARCHAR(140) DEFAULT 'System Verified',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. SAVED EVENT PLANS TABLE (Generated Reports From The Plan Builder)
CREATE TABLE saved_plans (
    id SERIAL PRIMARY KEY,
    plan_code VARCHAR(30) UNIQUE NOT NULL,
    client_name VARCHAR(140) DEFAULT 'Valued Host',
    user_email VARCHAR(150) DEFAULT 'guest@eventease.app',
    main_category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(140) NOT NULL,
    city VARCHAR(80) NOT NULL,
    location_mode VARCHAR(30) DEFAULT 'On-Site',
    guests INT NOT NULL,
    estimated_budget_pkr BIGINT NOT NULL,
    actual_cost_pkr BIGINT NOT NULL,
    event_date VARCHAR(40),
    start_time VARCHAR(20),
    duration_hours INT DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. SPECIAL CUSTOM EVENTS TABLE (Outside-Domain Bespoke Requests)
CREATE TABLE special_events (
    id SERIAL PRIMARY KEY,
    special_code VARCHAR(30) UNIQUE NOT NULL,
    user_name VARCHAR(140) NOT NULL,
    user_email VARCHAR(150) NOT NULL,
    user_phone VARCHAR(50) NOT NULL,
    event_date VARCHAR(40),
    custom_domain VARCHAR(180) NOT NULL,
    title VARCHAR(180) NOT NULL,
    city VARCHAR(80) NOT NULL,
    custom_location VARCHAR(220) NOT NULL,
    guests INT NOT NULL,
    total_budget_pkr BIGINT NOT NULL,
    signature_elements TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. CONTACT MESSAGES TABLE (Inquiries Sent To Warisha Noor)
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    sender_name VARCHAR(140) NOT NULL,
    sender_email VARCHAR(150) NOT NULL,
    sender_phone VARCHAR(50) NOT NULL,
    event_category VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. DEFAULT FOUNDER ACCOUNT (Password: warisha123)
-- Password hash below corresponds to "warisha123" using Werkzeug's
-- pbkdf2:sha256 hashing algorithm (set automatically by app.py on first run).
-- No manual insert needed -- app.py seeds this account automatically too.
