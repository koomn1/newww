-- Script to make a user an admin
-- Replace 'admin@example.com' with the actual admin email

-- This updates the user metadata to mark them as admin
-- Run this after the admin user has signed up

-- Note: You need to update this with the actual user's email
-- The is_admin flag will be checked in the admin dashboard

UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{is_admin}',
  'true'::jsonb
)
WHERE email = 'admin@example.com';

-- You can also create a function to make this easier
CREATE OR REPLACE FUNCTION make_user_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{is_admin}',
    'true'::jsonb
  )
  WHERE email = user_email;
END;
$$;

-- Usage: SELECT make_user_admin('admin@example.com');
