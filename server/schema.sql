// SQL Schema for DeepliX Operational System
// Compatible with PostgreSQL / Cloud SQL / Supabase / Neon

-- 1. Inquiries & Consultation Requests Table
CREATE TABLE IF NOT EXISTS inquiries (
    id VARCHAR(64) PRIMARY KEY,
    type VARCHAR(32) NOT NULL DEFAULT 'consultation', -- 'consultation' | 'contact'
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    industry VARCHAR(64) NOT NULL, -- 'Clinics' | 'Schools' | 'Businesses' | 'Other'
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    message TEXT NOT NULL,
    notes TEXT DEFAULT '',
    status VARCHAR(32) NOT NULL DEFAULT 'new', -- 'new' | 'contacted' | 'completed' | 'archived'
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Client Records Table
CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(64) PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    industry VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'Onboarding', -- 'Onboarding' | 'Active' | 'Lead' | 'Completed'
    contract_value VARCHAR(64) DEFAULT '$8,500',
    monthly_support VARCHAR(64) DEFAULT '$450/mo',
    start_date DATE DEFAULT CURRENT_DATE,
    modules JSONB DEFAULT '[]'::jsonb,
    notes TEXT DEFAULT '',
    source_inquiry_id VARCHAR(64) REFERENCES inquiries(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Case Studies Table
CREATE TABLE IF NOT EXISTS case_studies (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    industry VARCHAR(128) NOT NULL,
    summary TEXT NOT NULL,
    before_points JSONB NOT NULL DEFAULT '[]'::jsonb,
    after_points JSONB NOT NULL DEFAULT '[]'::jsonb,
    key_outcome TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Website & Administrative Settings Table
CREATE TABLE IF NOT EXISTS website_settings (
    id VARCHAR(64) PRIMARY KEY DEFAULT 'primary_config',
    hero_title TEXT NOT NULL,
    hero_subtitle TEXT NOT NULL,
    announcement_badge VARCHAR(255) NOT NULL,
    clinic_description TEXT NOT NULL,
    school_description TEXT NOT NULL,
    business_description TEXT NOT NULL,
    support_email VARCHAR(255) NOT NULL,
    support_phone VARCHAR(64) NOT NULL,
    office_address TEXT NOT NULL,
    turnaround_time VARCHAR(128) NOT NULL,
    admin_email VARCHAR(255) NOT NULL DEFAULT 'admin@deeplix.com',
    admin_password_hash VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_industry ON inquiries(industry);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_industry ON clients(industry);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
