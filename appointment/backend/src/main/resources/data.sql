-- Insert sample users
INSERT INTO users (username, email, password, full_name, phone, role, created_at) VALUES
('admin', 'admin@bookmyservice.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFe5X2GNQsyeGmMKg/F3J0W', 'Admin User', '9999999999', 'ADMIN', NOW()),
('customer', 'customer@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFe5X2GNQsyeGmMKg/F3J0W', 'John Doe', '9876543210', 'CUSTOMER', NOW());

-- Insert sample services for Kerala districts
INSERT INTO services (name, description, duration, price, category, provider_id, location, rating) VALUES
('General Health Checkup', 'Comprehensive health examination with basic tests', 30, 800.00, 'Healthcare', 1, 'Thiruvananthapuram, Pattom', 4.5),
('Dental Cleaning', 'Professional teeth cleaning and oral hygiene', 45, 1200.00, 'Dental', 1, 'Kochi, Ernakulam', 4.7),
('Root Canal Treatment', 'Complete root canal therapy with crown', 90, 3500.00, 'Dental', 1, 'Kozhikode, Mavoor Road', 4.6),
('Hair Cut & Styling', 'Professional haircut with styling', 60, 600.00, 'Beauty', 1, 'Kottayam, MC Road', 4.4),
('Facial Treatment', 'Deep cleansing facial with moisturizing', 75, 800.00, 'Beauty', 1, 'Thrissur, Round South', 4.5),
('Full Body Massage', 'Relaxing full body therapeutic massage', 90, 1500.00, 'Wellness', 1, 'Alappuzha, Beach Road', 4.8),
('Yoga Session', 'Personal yoga training session', 60, 600.00, 'Wellness', 1, 'Palakkad, Fort Maidan', 4.6),
('Physiotherapy', 'Physical therapy and rehabilitation', 45, 800.00, 'Therapy', 1, 'Kollam, Chinnakada', 4.7),
('Counseling Session', 'Professional psychological counseling', 60, 1200.00, 'Therapy', 1, 'Kannur, Fort Road', 4.5),
('Manicure & Pedicure', 'Complete nail care and grooming', 90, 700.00, 'Beauty', 1, 'Malappuram, Mini Bypass', 4.3),
('Eye Checkup', 'Comprehensive eye examination', 30, 500.00, 'Healthcare', 1, 'Kasaragod, Vidyanagar', 4.6),
('Teeth Whitening', 'Professional teeth whitening treatment', 60, 2500.00, 'Dental', 1, 'Wayanad, Kalpetta', 4.4),
('Meditation Class', 'Guided meditation and mindfulness', 45, 400.00, 'Wellness', 1, 'Idukki, Munnar', 4.7),
('Skin Consultation', 'Dermatology consultation and treatment', 30, 1000.00, 'Healthcare', 1, 'Pathanamthitta, Thiruvalla', 4.5),
('Aromatherapy', 'Relaxing aromatherapy massage', 75, 1200.00, 'Wellness', 1, 'Kochi, Marine Drive', 4.6);