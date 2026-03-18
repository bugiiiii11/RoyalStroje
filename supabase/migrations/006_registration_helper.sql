-- Registration helper function (bypasses RLS for client linking)
-- Called during portal registration to link auth user to client record
CREATE OR REPLACE FUNCTION register_royal_card(
  p_auth_user_id UUID,
  p_invitation_id UUID,
  p_client_id UUID DEFAULT NULL,
  p_company_name TEXT DEFAULT NULL,
  p_contact_person TEXT DEFAULT NULL,
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_client_id UUID;
BEGIN
  IF p_client_id IS NOT NULL THEN
    -- Link existing client to auth user
    UPDATE clients SET
      auth_user_id = p_auth_user_id,
      client_type = 'royal_card',
      discount_percent = 5,
      contact_person = COALESCE(NULLIF(p_contact_person, ''), contact_person),
      phone = COALESCE(NULLIF(p_phone, ''), phone)
    WHERE id = p_client_id;
    v_client_id := p_client_id;
  ELSE
    -- Create new client
    INSERT INTO clients (auth_user_id, company_name, contact_person, email, phone, client_type, discount_percent)
    VALUES (p_auth_user_id, p_company_name, p_contact_person, p_email, p_phone, 'royal_card', 5)
    RETURNING id INTO v_client_id;
  END IF;

  -- Mark invitation as accepted
  UPDATE royal_card_invitations SET
    status = 'accepted',
    accepted_at = now(),
    client_id = v_client_id
  WHERE id = p_invitation_id;

  RETURN v_client_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
