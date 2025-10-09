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
  (1, 'Campus Pizza', '123 Campus St', '010-1111-2222', '09:00-21:00', 2000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (2, 'Global Sushi', '456 Global Ave','010-3333-4444', '11:00-22:00', 3000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (3, 'Korean BBQ',   '789 BBQ Rd',    '010-5555-6666', '17:00-23:00', 4000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg');

-- FoodItem 더미데이터
INSERT INTO food_item (id, restaurant_id, item_name, price, image_url)
VALUES
  (1, 1, 'Pepperoni Pizza', 12000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (2, 1, 'Cheese Pizza',    10000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (3, 2, 'Salmon Sushi Set',15000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (4, 3, 'Pork Belly BBQ',  20000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg');

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

-- UserBankAccount 더미데이터
INSERT INTO user_bank_account (id, user_id, bank_name, account_number, is_primary)
VALUES
  (1, 1, 'Kookmin Bank',  '123-4567-8901', true),   -- Alice 주계좌
  (2, 2, 'Shinhan Bank',  '987-6543-2100', true),   -- Bob 주계좌
  (3, 3, 'Hana Bank',     '555-3333-2222', true);   -- Charlie 주계좌
