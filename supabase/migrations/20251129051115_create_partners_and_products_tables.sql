/*
  # Create Partners and Products Tables for Nexep India

  ## Overview
  This migration creates the core database structure for the Nexep India website,
  including tables for partners and products with proper security policies.

  ## New Tables
  
  ### `partners`
  - `id` (uuid, primary key) - Unique identifier for each partner
  - `name` (text) - Partner company name
  - `logo_url` (text) - URL to partner logo image
  - `description` (text) - Brief description of the partnership
  - `website_url` (text, optional) - Partner's website URL
  - `display_order` (integer) - Order for displaying partners
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `products`
  - `id` (uuid, primary key) - Unique identifier for each product
  - `name` (text) - Product name
  - `category` (text) - Product category (e.g., "Process Equipment", "Control Systems")
  - `description` (text) - Detailed product description
  - `image_url` (text) - URL to product image
  - `features` (jsonb) - Array of product features
  - `applications` (text) - Product applications and use cases
  - `display_order` (integer) - Order for displaying products
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on both tables
  - Public read access for all users (website visitors need to view partners and products)
  - No write access from client (data managed through admin interface or direct database access)

  ## Notes
  - Tables are designed for public display on the website
  - All data is readable by anonymous users
  - Write operations should be performed through secure admin channels
*/

CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  description text NOT NULL,
  website_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  applications text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to partners"
  ON partners FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS partners_display_order_idx ON partners(display_order);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_display_order_idx ON products(display_order);