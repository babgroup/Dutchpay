USE `db`;

-- User 더미데이터 (10명)
-- 비밀번호 해시: 기존 3개 해시를 순환 사용 (abc123 / cdf456 / cdf123)
INSERT INTO `user` (id, email, name, student_number, password, total_discount)
VALUES
  (1,  'alice@example.com',   'Alice',   '2023123', '$2b$10$TB50LABUw2LOQFJTndZUz.zOEeibf2sH/d9pKJF/Yuy4Qg2aOZhoq', 0), -- abc123
  (2,  'bob@example.com',     'Bob',     '2023567', '$2b$10$/IazOXbqK7yl4g56uVGvFuoGV6syQ9hf8/mND/QImRTlPHTRzwDKa', 0), -- cdf456
  (3,  'charlie@example.com', 'Charlie', '2023987', '$2b$10$gX5b9py8OAQDoq2pUOioiu2oHmFv00OZ0xYHbntkL4Tt6518M2.xO', 0), -- cdf123
  (4,  'david@example.com',   'David',   '2023004', '$2b$10$TB50LABUw2LOQFJTndZUz.zOEeibf2sH/d9pKJF/Yuy4Qg2aOZhoq', 0),
  (5,  'erin@example.com',    'Erin',    '2023005', '$2b$10$/IazOXbqK7yl4g56uVGvFuoGV6syQ9hf8/mND/QImRTlPHTRzwDKa', 0),
  (6,  'frank@example.com',   'Frank',   '2023006', '$2b$10$gX5b9py8OAQDoq2pUOioiu2oHmFv00OZ0xYHbntkL4Tt6518M2.xO', 0),
  (7,  'grace@example.com',   'Grace',   '2023007', '$2b$10$TB50LABUw2LOQFJTndZUz.zOEeibf2sH/d9pKJF/Yuy4Qg2aOZhoq', 0),
  (8,  'henry@example.com',   'Henry',   '2023008', '$2b$10$/IazOXbqK7yl4g56uVGvFuoGV6syQ9hf8/mND/QImRTlPHTRzwDKa', 0),
  (9,  'irene@example.com',   'Irene',   '2023009', '$2b$10$gX5b9py8OAQDoq2pUOioiu2oHmFv00OZ0xYHbntkL4Tt6518M2.xO', 0),
  (10, 'jack@example.com',    'Jack',    '2023010', '$2b$10$TB50LABUw2LOQFJTndZUz.zOEeibf2sH/d9pKJF/Yuy4Qg2aOZhoq', 0);

-- Restaurant 더미데이터 (5곳)
INSERT INTO restaurant (id, restaurant_name, address, phone_number, business_hours, delivery_fee, image_url)
VALUES
  (1, 'Campus Pizza', '123 Campus St', '010-1111-2222', '09:00-21:00', 2000, 'https://media.istockphoto.com/id/1459715799/ko/%EC%82%AC%EC%A7%84/%ED%96%84%EA%B3%BC-%EC%B9%98%EC%A6%88%EB%A5%BC-%EA%B3%81%EB%93%A4%EC%9D%B8-%ED%94%BC%EC%9E%90.jpg?s=2048x2048&w=is&k=20&c=KpnMjXV-ODlyMhh2y4wADDrzh9nG5qO_BE98MFo_zLI='),
  (2, 'Global Sushi', '456 Global Ave','010-3333-4444', '11:00-22:00', 3000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (3, 'Korean BBQ',   '789 BBQ Rd',    '010-5555-6666', '17:00-23:00', 4000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (4, 'Noodle House', '11 Noodle St',  '010-7777-8888', '10:30-21:30', 2500, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (5, 'Vegan Bowl',   '22 Green Rd',   '010-9999-0000', '10:00-20:00', 2000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg');

-- FoodItem 더미데이터 (각 식당 5개씩 = 총 25개)
INSERT INTO food_item (id, restaurant_id, item_name, price, image_url)
VALUES
  -- Campus Pizza (1)
  (1, 1, 'Pepperoni Pizza', 12000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (2, 1, 'Cheese Pizza',    10000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (3, 1, 'Margherita',      11000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (4, 1, 'Deluxe Pizza',    15000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (5, 1, 'Garlic Bread',     5000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),

  -- Global Sushi (2)
  (6,  2, 'Salmon Sushi Set', 15000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (7,  2, 'Tuna Roll',         8000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (8,  2, 'Eel Nigiri',       14000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (9,  2, 'California Roll',   7000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (10, 2, 'Miso Soup',         3000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),

  -- Korean BBQ (3)
  (11, 3, 'Pork Belly BBQ',   20000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (12, 3, 'Beef Short Ribs',  25000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (13, 3, 'Kimchi Stew',       8000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (14, 3, 'Cold Noodles',      9000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (15, 3, 'Steamed Egg',       5000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),

  -- Noodle House (4)
  (16, 4, 'Spicy Ramen',       9000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (17, 4, 'Shoyu Ramen',       8500, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (18, 4, 'Gyoza',             6000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (19, 4, 'Fried Rice',        8000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (20, 4, 'Karaage',           7000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),

  -- Vegan Bowl (5)
  (21, 5, 'Buddha Bowl',      11000, 'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (22, 5, 'Avocado Salad',     9000,  'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (23, 5, 'Tofu Steak',       12000,  'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (24, 5, 'Veggie Wrap',       8000,  'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg'),
  (25, 5, 'Lentil Soup',       6000,  'http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C_%EC%BD%A4%EB%B3%B4_410x271.jpg');

-- FoodFareRoom 더미데이터 (6개)
INSERT INTO food_fare_room (id, creator_user_id, restaurant_id, deadline, min_member)
VALUES
  (1, 1, 1, '2026-07-07 12:00:00', 3), -- Campus Pizza
  (2, 2, 2, '2026-07-07 18:00:00', 2), -- Global Sushi
  (3, 3, 3, '2026-07-08 12:30:00', 4), -- Korean BBQ
  (4, 4, 4, '2026-07-08 19:00:00', 3), -- Noodle House
  (5, 5, 5, '2026-07-09 12:00:00', 2), -- Vegan Bowl
  (6, 6, 1, '2026-07-09 18:00:00', 2); -- Campus Pizza (다른 시간)

-- FoodResult 더미데이터 (모두 progress=0 유지)
INSERT INTO food_result (id, food_fare_room_id, progress, description)
VALUES
  (1, 1, 0, '모집중'),
  (2, 2, 0, '모집중'),
  (3, 3, 0, '모집중'),
  (4, 4, 0, '모집중'),
  (5, 5, 0, '모집중'),
  (6, 6, 0, '모집중');

-- FoodJoinUser 더미데이터 (여러 명 참여, 정수 0 사용)
INSERT INTO food_join_user (id, user_id, delivery_confirmation, food_fare_room_id) VALUES
  -- Room 1 (Campus Pizza)
  (1,  1, 0, 1),
  (2,  2, 0, 1),
  (3,  3, 0, 1),

  -- Room 2 (Global Sushi)
  (4,  4, 0, 2),
  (5,  5, 0, 2),

  -- Room 3 (Korean BBQ)
  (6,  6, 0, 3),

  -- Room 4 (Noodle House)
  (7,  7, 0, 4),

  -- Room 5 (Vegan Bowl)
  (8,  8, 0, 5),
  (9,  9, 0, 5),

  -- Room 6 (Campus Pizza)
  (10, 10, 0, 6);

-- FoodOrder 더미데이터 (각 방의 레스토랑 메뉴만 주문)
INSERT INTO food_order (id, food_item_id, quantity, food_join_user_id) VALUES
  -- Room 1 (join 1~3)
  (1,  1, 1, 1),  -- user1: Pepperoni
  (2,  2, 1, 2),  -- user2: Cheese
  (3,  3, 1, 3),  -- user3: Margherita

  -- Room 2 (join 4~5)
  (4,  6, 1, 4),  -- user4: Salmon Set
  (5,  7, 2, 5),  -- user5: Tuna Roll x2

  -- Room 3 (join 6)
  (6, 11, 1, 6),  -- user6: Pork Belly

  -- Room 4 (join 7)
  (7, 16, 1, 7),  -- user7: Spicy Ramen

  -- Room 5 (join 8~9)
  (8, 21, 1, 8),  -- user8: Buddha Bowl
  (9, 22, 1, 9),  -- user9: Avocado Salad

  -- Room 6 (join 10)
  (10, 4, 1, 10); -- user10: Deluxe Pizza

-- UserBankAccount 더미데이터 (각 유저 주계좌 1개, UNIQUE (user_id, is_primary) 준수)
INSERT INTO user_bank_account (id, user_id, bank_name, account_number, is_primary)
VALUES
  (1,  1,  'Kookmin Bank', '123-4567-8901', true),
  (2,  2,  'Shinhan Bank', '987-6543-2100', true),
  (3,  3,  'Hana Bank',    '555-3333-2222', true),
  (4,  4,  'Woori Bank',   '111-2222-3333', true),
  (5,  5,  'NH Bank',      '444-5555-6666', true),
  (6,  6,  'IBK',          '777-8888-9999', true),
  (7,  7,  'Kakao Bank',   '3333-11-222222', true),
  (8,  8,  'Toss Bank',    '1000-222-333333', true),
  (9,  9,  'KB Star',      '222-3333-4444', true),
  (10, 10, 'SC First',     '888-0000-1111', true);
