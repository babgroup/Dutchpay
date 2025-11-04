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
  (2, 'Global Sushi', '456 Global Ave','010-3333-4444', '11:00-22:00', 3000, 'https://cdn.pixabay.com/photo/2021/07/31/17/14/sushi-6512533_1280.jpg'),
  (3, 'Korean BBQ',   '789 BBQ Rd',    '010-5555-6666', '17:00-23:00', 4000, 'https://media.istockphoto.com/id/503205965/ko/%EC%82%AC%EC%A7%84/%ED%95%9C%EA%B5%AD%EC%8B%9D-bbq.jpg?s=612x612&w=0&k=20&c=N_qqrI9Atwh0LT11w4HIxiDUjY8V1U7OsxXe5YCIRNs='),
  (4, 'Noodle House', '11 Noodle St',  '010-7777-8888', '10:30-21:30', 2500, 'https://media.istockphoto.com/id/1365977387/ko/%EC%82%AC%EC%A7%84/%EA%B9%80%EC%9D%B4-%EB%82%98%EB%8A%94-%EC%A7%80%EA%B8%80%EC%A7%80%EA%B8%80-%EA%B0%80%EC%A7%84-%EB%9D%BC%EB%A9%B4.jpg?s=2048x2048&w=is&k=20&c=Kht6BF4buOUTDqkGVElnO4EBsCMugRMf2IhFMJTqlXE='),
  (5, 'Vegan Bowl',   '22 Green Rd',   '010-9999-0000', '10:00-20:00', 2000, 'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg');

-- FoodItem 더미데이터 (각 식당 5개씩 = 총 25개)
INSERT INTO food_item (id, restaurant_id, item_name, price, image_url)
VALUES
  -- Campus Pizza (1)
  (1, 1, 'Pepperoni Pizza', 12000, 'https://cdn.pixabay.com/photo/2020/04/01/16/34/pepperoni-4991789_1280.jpg'),
  (2, 1, 'Cheese Pizza',    10000, 'https://cdn.pixabay.com/photo/2015/11/11/21/03/pizza-1039262_1280.jpg'),
  (3, 1, 'Margherita',      11000, 'https://cdn.pixabay.com/photo/2023/11/22/08/22/pizza-8404974_1280.jpg'),
  (4, 1, 'Deluxe Pizza',    15000, 'https://cdn.pixabay.com/photo/2014/04/05/11/08/pizza-314627_1280.jpg'),
  (5, 1, 'Garlic Bread',     5000, 'https://cdn.pixabay.com/photo/2025/01/26/11/41/meal-9360704_1280.jpg'),

  -- Global Sushi (2)
  (6,  2, 'Salmon Sushi Set', 15000, 'https://cdn.pixabay.com/photo/2015/04/10/16/01/sushi-716449_1280.jpg'),
  (7,  2, 'Tuna Roll',         8000, 'https://cdn.pixabay.com/photo/2015/04/10/16/01/sushi-716450_1280.jpg'),
  (8,  2, 'Eel Nigiri',       14000, 'https://cdn.pixabay.com/photo/2020/02/16/20/20/sushi-4854696_1280.jpg'),
  (9,  2, 'California Roll',   7000, 'https://cdn.pixabay.com/photo/2017/03/29/20/58/california-roll-2186520_1280.jpg'),
  (10, 2, 'Miso Soup',         3000, 'https://cdn.pixabay.com/photo/2019/04/02/12/57/japanese-food-4097642_1280.jpg'),

  -- Korean BBQ (3)
  (11, 3, 'Pork Belly BBQ',   20000, 'https://media.istockphoto.com/id/1148726720/ko/%EC%82%AC%EC%A7%84/%EC%82%BC%EA%B2%B9%EC%82%B4-%EB%B0%94%EB%B2%A0-%ED%81%90.jpg?s=612x612&w=0&k=20&c=fs1HBe2hIsqgBNZCFFSXT6xAQwVj0BgAZ3zBVwmmFhk='),
  (12, 3, 'Beef Short Ribs',  25000, 'https://media.istockphoto.com/id/874990532/ko/%EC%82%AC%EC%A7%84/%EC%86%8C%EA%B0%88%EB%B9%84-%EC%A1%B0%EB%A6%BC.jpg?s=612x612&w=0&k=20&c=J6MrnQ6p3NXs4ctAwpOOizrvnRyzhcS2lLMD-0V1YeU='),
  (13, 3, 'Kimchi Stew',       8000, 'https://media.istockphoto.com/id/1330310533/ko/%EC%82%AC%EC%A7%84/%EB%91%90%EB%B6%80%EC%99%80-%EB%8F%BC%EC%A7%80%EA%B3%A0%EA%B8%B0%EB%A5%BC-%EA%B3%81%EB%93%A4%EC%9D%B8-%ED%95%9C%EA%B5%AD%EC%8B%9D-%EA%B9%80%EC%B9%98%EC%88%98%ED%94%84.jpg?s=612x612&w=0&k=20&c=0N4VAqsPgp9cOUR1w2lMj_0ch5cgA4IQGEPjlTq-keY='),
  (14, 3, 'Cold Noodles',      9000, 'https://media.istockphoto.com/id/1882096189/ko/%EC%82%AC%EC%A7%84/mulnaengmyeon.jpg?s=612x612&w=0&k=20&c=0e9Nl0jydtjr3A95ROVhqanSvdPOkqHFOEJ1iHHbKZk='),
  (15, 3, 'Steamed Egg',       5000, 'https://media.istockphoto.com/id/855521784/ko/%EC%82%AC%EC%A7%84/%EB%B6%84%EC%9E%AC-%EC%B0%90-%EA%B3%84%EB%9E%80.jpg?s=612x612&w=0&k=20&c=2Su4PI1-Y08TKMHua6QGiBcklR11n9iN9mcLb1Jm3Vk='),

  -- Noodle House (4)
  (16, 4, 'Spicy Ramen',       9000, 'https://cdn.pixabay.com/photo/2021/11/16/01/18/dish-6799805_1280.jpg'),
  (17, 4, 'Shoyu Ramen',       8500, 'https://cdn.pixabay.com/photo/2021/09/27/02/36/ramen-6659278_1280.jpg'),
  (18, 4, 'Gyoza',             6000, 'https://cdn.pixabay.com/photo/2018/10/22/12/34/dumpling-3765243_1280.jpg'),
  (19, 4, 'Fried Rice',        8000, 'https://media.istockphoto.com/id/1359751192/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%9D%B0%EC%83%89-%EC%A0%91%EC%8B%9C%EC%97%90-%EB%B3%B6%EC%9D%8C%EB%B0%A5.jpg?s=612x612&w=0&k=20&c=81vYqc5XD1aDnT6xWanYd209pW2A49RiL3ypZ2tRJD8='),
  (20, 4, 'Karaage',           7000, 'https://media.istockphoto.com/id/2162052713/ko/%EC%82%AC%EC%A7%84/japanese-fried-chicken.jpg?s=612x612&w=0&k=20&c=iauEv3CLCqrWAce8C4BZiLVPOlXWe0kzPeMgFiDsGUA='),

  -- Vegan Bowl (5)
  (21, 5, 'Buddha Bowl',      11000, 'https://media.istockphoto.com/id/1130112174/ko/%EC%82%AC%EC%A7%84/%EC%8B%AC-%ED%99%A9-%EA%B5%AC%EC%9A%B4-%EB%B3%91%EC%95%84%EB%A6%AC-%EC%BD%A9-%EB%85%B9%EC%83%89-%EC%95%84%EB%B3%B4%EC%B9%B4%EB%8F%84-%EA%B0%90-%ED%98%88%EC%95%A1-%EC%98%A4%EB%A0%8C%EC%A7%80-%EA%B2%AC%EA%B3%BC%EB%A5%98%EC%99%80-%EC%84%9D%EB%A5%98%EC%99%80-%EB%B9%84-%EA%B1%B4-%ED%95%B4%EB%8F%85-%EB%B6%80%EC%B2%98%EB%8B%98-%EA%B7%B8%EB%A6%87-%ED%8F%89%EB%A9%B4%EB%8F%84-%ED%8F%89-%EC%8B%A0%EB%8F%84.jpg?s=612x612&w=0&k=20&c=NQ_TuPNGeAYsl1p2E6gkHBMVmgsfbVRaXtvHNjMmuKQ='),
  (22, 5, 'Avocado Salad',     9000,  'https://media.istockphoto.com/id/1469228227/ko/%EC%82%AC%EC%A7%84/%EB%A0%8C%EC%A6%88-%EC%BD%A9-%EC%8B%9C%EA%B8%88%EC%B9%98-%EC%95%84%EB%AA%AC%EB%93%9C%EC%9D%98-%EC%8B%A0%EC%84%A0%ED%95%9C-%EC%83%90%EB%9F%AC%EB%93%9C.jpg?s=612x612&w=0&k=20&c=UspdPga31yjIC4JefC1CJBqyzMVROJx4d7dfyUAkf3g='),
  (23, 5, 'Tofu Steak',       12000,  'https://media.istockphoto.com/id/640277126/ko/%EC%82%AC%EC%A7%84/%EB%91%90%EB%B6%80-%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%81%AC.jpg?s=612x612&w=0&k=20&c=w-Sn1KunGDbWHfdw58IYsFBAitdHtCmBCSoyzAPSrVk='),
  (24, 5, 'Veggie Wrap',       8000,  'https://media.istockphoto.com/id/1165696618/ko/%EC%82%AC%EC%A7%84/%EA%B1%B4%EA%B0%95%ED%95%9C-%EB%B9%84%EA%B1%B4-%EC%B1%84%EC%8B%9D-%EC%A3%BC%EC%9D%98-%EC%9E%90-%EB%9E%A9.jpg?s=612x612&w=0&k=20&c=jiiqNPiPyfdaE5SYsVp97jCSZiO-vDSkZMmHG2XQXl0='),
  (25, 5, 'Lentil Soup',       6000,  'https://media.istockphoto.com/id/870329822/ko/%EC%82%AC%EC%A7%84/%EC%B9%B4%EB%A0%88-%EB%A0%8C%EC%A6%88%EC%BD%A9-%EC%88%98%ED%94%84.jpg?s=612x612&w=0&k=20&c=kbCko8-HF3DeW9cHn5BIlEXcagXbsnCfTXuibhHKYS8=');

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
