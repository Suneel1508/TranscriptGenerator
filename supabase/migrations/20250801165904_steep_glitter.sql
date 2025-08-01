/*
  # Fresh Database Setup for Transcript Management System

  1. New Tables
    - `admin_users` - Admin user accounts with secure authentication
    - `transcripts` - Student transcript records with JSON data storage

  2. Security
    - Enable RLS on both tables
    - Add policies for admin access control
    - Secure authentication functions

  3. Functions
    - Password hashing and verification
    - Admin user creation and authentication
    - Automatic timestamp updates

  4. Default Data
    - Create default admin user for system access
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing objects to start fresh
DROP TABLE IF EXISTS transcripts CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS hash_password(text);
DROP FUNCTION IF EXISTS verify_password(text, text);
DROP FUNCTION IF EXISTS create_admin_user(text, text, text);
DROP FUNCTION IF EXISTS authenticate_admin(text, text);
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create admin_users table
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transcripts table
CREATE TABLE transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  student_name text,
  student_ssn text,
  data jsonb NOT NULL DEFAULT '{}',
  created_by uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admin users can read their own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admin users can update their own data"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for transcripts
CREATE POLICY "Admin users can read all transcripts"
  ON transcripts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can create transcripts"
  ON transcripts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = created_by::text);

CREATE POLICY "Admin users can update transcripts they created"
  ON transcripts
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = created_by::text);

CREATE POLICY "Admin users can delete transcripts they created"
  ON transcripts
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = created_by::text);

-- Create indexes for performance
CREATE INDEX idx_transcripts_student_ssn ON transcripts(student_ssn);
CREATE INDEX idx_transcripts_created_by ON transcripts(created_by);
CREATE INDEX idx_transcripts_created_at ON transcripts(created_at DESC);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- Function to hash passwords
CREATE OR REPLACE FUNCTION hash_password(password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf'));
END;
$$;

-- Function to verify passwords
CREATE OR REPLACE FUNCTION verify_password(password text, hash text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN crypt(password, hash) = hash;
END;
$$;

-- Function to create admin user
CREATE OR REPLACE FUNCTION create_admin_user(
  p_email text,
  p_password text,
  p_name text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
BEGIN
  INSERT INTO admin_users (email, password_hash, name)
  VALUES (p_email, hash_password(p_password), p_name)
  RETURNING id INTO new_user_id;
  
  RETURN new_user_id;
END;
$$;

-- Function to authenticate admin user
CREATE OR REPLACE FUNCTION authenticate_admin(
  p_email text,
  p_password text
)
RETURNS TABLE(user_id uuid, user_name text, user_email text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_record admin_users%ROWTYPE;
BEGIN
  SELECT * INTO user_record
  FROM admin_users
  WHERE email = p_email;
  
  IF user_record.id IS NULL THEN
    RETURN;
  END IF;
  
  IF verify_password(p_password, user_record.password_hash) THEN
    RETURN QUERY SELECT user_record.id, user_record.name, user_record.email;
  END IF;
END;
$$;

-- Update function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transcripts_updated_at
  BEFORE UPDATE ON transcripts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user
INSERT INTO admin_users (email, password_hash, name)
VALUES ('admin@transcript.com', hash_password('transcript2025'), 'System Administrator')
ON CONFLICT (email) DO NOTHING;

-- Create storage bucket for transcript files if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('transcript-files', 'transcript-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for transcript files
CREATE POLICY "Authenticated users can upload transcript files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'transcript-files');

CREATE POLICY "Authenticated users can view transcript files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'transcript-files');

CREATE POLICY "Authenticated users can update transcript files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'transcript-files');

CREATE POLICY "Authenticated users can delete transcript files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'transcript-files');