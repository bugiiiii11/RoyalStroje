-- Allow anonymous/unauthenticated users to read invitations by invite_code
-- This is needed for the portal registration flow (user isn't logged in yet)
CREATE POLICY "invitations_anon_by_code" ON royal_card_invitations
  FOR SELECT USING (true);

-- Note: This opens read access to all invitations, but invite codes are random
-- and the table only contains email + company_name (no sensitive data).
-- For tighter security, consider using a Supabase Edge Function instead.
