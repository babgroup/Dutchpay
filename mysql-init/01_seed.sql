USE `db`;

-- User 더미데이터 (student_number: varchar(7) → 문자열로)
INSERT INTO `user` (id, email, name, student_number, password, total_discount)
VALUES
  (1, 'alice@example.com',   'Alice',   '2023123', '$2b$10$TB50LABUw2LOQFJTndZUz.zOEeibf2sH/d9pKJF/Yuy4Qg2aOZhoq', 0), -- abc123
  (2, 'bob@example.com',     'Bob',     '2023567', '$2b$10$/IazOXbqK7yl4g56uVGvFuoGV6syQ9hf8/mND/QImRTlPHTRzwDKa', 0), -- cdf456
  (3, 'charlie@example.com', 'Charlie', '2023987', '$2b$10$gX5b9py8OAQDoq2pUOioiu2oHmFv00OZ0xYHbntkL4Tt6518M2.xO', 0); -- cdf123

-- Restaurant 더미데이터
INSERT INTO restaurant (id, restaurant_name, address, phone_number, business_hours, delivery_fee, image_url)
VALUES
  (1, 'Campus Pizza', '123 Campus St', '010-1111-2222', '09:00-21:00', 2000, 'https://www.google.com/imgres?q=%EC%B9%98%ED%82%A8&imgurl=http%3A%2F%2Fwww.bhc.co.kr%2Fupload%2Fbhc%2Fmenu%2FHOT%25ED%259B%2584%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C_%25EC%25BD%25A4%25EB%25B3%25B4_410x271.jpg&imgrefurl=https%3A%2F%2Fm.bhc.co.kr%2Fmenu%2Fchicken.html%3Fmenu_code%3DHOT&docid=gr3GQLG4DXX5MM&tbnid=0Kvz4inYLQcmlM&vet=12ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA..i&w=410&h=271&hcb=2&ved=2ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA'),
  (2, 'Global Sushi', '456 Global Ave','010-3333-4444', '11:00-22:00', 3000, 'https://www.google.com/imgres?q=%EC%B9%98%ED%82%A8&imgurl=http%3A%2F%2Fwww.bhc.co.kr%2Fupload%2Fbhc%2Fmenu%2FHOT%25ED%259B%2584%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C_%25EC%25BD%25A4%25EB%25B3%25B4_410x271.jpg&imgrefurl=https%3A%2F%2Fm.bhc.co.kr%2Fmenu%2Fchicken.html%3Fmenu_code%3DHOT&docid=gr3GQLG4DXX5MM&tbnid=0Kvz4inYLQcmlM&vet=12ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA..i&w=410&h=271&hcb=2&ved=2ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA'),
  (3, 'Korean BBQ',   '789 BBQ Rd',    '010-5555-6666', '17:00-23:00', 4000, 'https://www.google.com/imgres?q=%EC%B9%98%ED%82%A8&imgurl=http%3A%2F%2Fwww.bhc.co.kr%2Fupload%2Fbhc%2Fmenu%2FHOT%25ED%259B%2584%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C_%25EC%25BD%25A4%25EB%25B3%25B4_410x271.jpg&imgrefurl=https%3A%2F%2Fm.bhc.co.kr%2Fmenu%2Fchicken.html%3Fmenu_code%3DHOT&docid=gr3GQLG4DXX5MM&tbnid=0Kvz4inYLQcmlM&vet=12ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA..i&w=410&h=271&hcb=2&ved=2ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA');

-- FoodItem 더미데이터
INSERT INTO food_item (id, restaurant_id, item_name, price, image_url)
VALUES
  (1, 1, 'Pepperoni Pizza', 12000, 'https://www.google.com/imgres?q=%EC%B9%98%ED%82%A8&imgurl=http%3A%2F%2Fwww.bhc.co.kr%2Fupload%2Fbhc%2Fmenu%2FHOT%25ED%259B%2584%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C_%25EC%25BD%25A4%25EB%25B3%25B4_410x271.jpg&imgrefurl=https%3A%2F%2Fm.bhc.co.kr%2Fmenu%2Fchicken.html%3Fmenu_code%3DHOT&docid=gr3GQLG4DXX5MM&tbnid=0Kvz4inYLQcmlM&vet=12ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA..i&w=410&h=271&hcb=2&ved=2ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA'),
  (2, 1, 'Cheese Pizza',    10000, 'https://www.google.com/imgres?q=%EC%B9%98%ED%82%A8&imgurl=http%3A%2F%2Fwww.bhc.co.kr%2Fupload%2Fbhc%2Fmenu%2FHOT%25ED%259B%2584%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C_%25EC%25BD%25A4%25EB%25B3%25B4_410x271.jpg&imgrefurl=https%3A%2F%2Fm.bhc.co.kr%2Fmenu%2Fchicken.html%3Fmenu_code%3DHOT&docid=gr3GQLG4DXX5MM&tbnid=0Kvz4inYLQcmlM&vet=12ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA..i&w=410&h=271&hcb=2&ved=2ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA'),
  (3, 2, 'Salmon Sushi Set',15000, 'https://www.google.com/imgres?q=%EC%B9%98%ED%82%A8&imgurl=http%3A%2F%2Fwww.bhc.co.kr%2Fupload%2Fbhc%2Fmenu%2FHOT%25ED%259B%2584%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C_%25EC%25BD%25A4%25EB%25B3%25B4_410x271.jpg&imgrefurl=https%3A%2F%2Fm.bhc.co.kr%2Fmenu%2Fchicken.html%3Fmenu_code%3DHOT&docid=gr3GQLG4DXX5MM&tbnid=0Kvz4inYLQcmlM&vet=12ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA..i&w=410&h=271&hcb=2&ved=2ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA'),
  (4, 3, 'Pork Belly BBQ',  20000, 'https://www.google.com/imgres?q=%EC%B9%98%ED%82%A8&imgurl=http%3A%2F%2Fwww.bhc.co.kr%2Fupload%2Fbhc%2Fmenu%2FHOT%25ED%259B%2584%25EB%259D%25BC%25EC%259D%25B4%25EB%2593%259C_%25EC%25BD%25A4%25EB%25B3%25B4_410x271.jpg&imgrefurl=https%3A%2F%2Fm.bhc.co.kr%2Fmenu%2Fchicken.html%3Fmenu_code%3DHOT&docid=gr3GQLG4DXX5MM&tbnid=0Kvz4inYLQcmlM&vet=12ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA..i&w=410&h=271&hcb=2&ved=2ahUKEwj_rtDx9_aPAxU_e_UHHXfHGaMQM3oECBYQAA');

-- FoodFareRoom 더미데이터
INSERT INTO food_fare_room (id, creator_user_id, restaurant_id, deadline, min_member)
VALUES
  (1, 1, 1, '2026-07-07 15:30:00', 3),
  (2, 2, 2, '2026-07-08 18:00:00', 2);

-- FoodResult 더미데이터
INSERT INTO food_result (id, food_fare_room_id, progress, description)
VALUES
  (1, 1, 0, '주문 대기중'),
  (2, 2, 0, '결제 준비중');

-- FoodJoinUser 더미데이터 (delivery_confirmation: string → '0'로)
INSERT INTO food_join_user (id, user_id, delivery_confirmation, food_fare_room_id)
VALUES
  (1, 1, '0', 1), -- Alice 참여
  (2, 2, '0', 1), -- Bob 참여
  (3, 2, '0', 2), -- Bob 참여
  (4, 3, '0', 2); -- Charlie 참여

-- FoodOrder 더미데이터 (변경 없음)
INSERT INTO food_order (id, food_item_id, quantity, food_join_user_id)
VALUES
  (1, 1, 1, 1), -- Alice: Pepperoni Pizza
  (2, 2, 2, 2), -- Bob: Cheese Pizza x2
  (3, 3, 1, 3), -- Bob: Sushi Set
  (4, 4, 1, 4); -- Charlie: Pork Belly BBQ
