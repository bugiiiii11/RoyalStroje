-- ============================================
-- 008: Equipment Images Storage Bucket
-- ============================================

-- Create storage bucket for equipment images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'equipment-images',
  'equipment-images',
  true,
  5242880, -- 5MB max
  ARRAY['image/webp', 'image/png', 'image/jpeg']
)
ON CONFLICT (id) DO NOTHING;

-- Public read access (anyone can view images)
CREATE POLICY "equipment_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'equipment-images');

-- Staff can upload/update/delete images
CREATE POLICY "equipment_images_staff_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'equipment-images'
    AND (auth.jwt() ->> 'app_role' IN ('admin', 'staff')
         OR (auth.jwt() -> 'user_metadata' ->> 'app_role') IN ('admin', 'staff'))
  );

CREATE POLICY "equipment_images_staff_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'equipment-images'
    AND (auth.jwt() ->> 'app_role' IN ('admin', 'staff')
         OR (auth.jwt() -> 'user_metadata' ->> 'app_role') IN ('admin', 'staff'))
  );

CREATE POLICY "equipment_images_staff_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'equipment-images'
    AND (auth.jwt() ->> 'app_role' IN ('admin', 'staff')
         OR (auth.jwt() -> 'user_metadata' ->> 'app_role') IN ('admin', 'staff'))
  );
