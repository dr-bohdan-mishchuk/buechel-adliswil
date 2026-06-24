
-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon;

-- Storage policies for menu-photos bucket (public read, staff/admin write)
CREATE POLICY "Menu photos public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'menu-photos');
CREATE POLICY "Staff upload menu photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'menu-photos' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')));
CREATE POLICY "Staff update menu photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'menu-photos' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')));
CREATE POLICY "Staff delete menu photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'menu-photos' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')));
