USE `db`;

-- User 더미데이터
INSERT INTO `user` (id, email, name, student_number, password, total_discount)
VALUES
  (1, 'alice@example.com',   'Alice',   20231234, 'abc123', 0),
  (2, 'bob@example.com',     'Bob',     20235678, 'cdf456', 0),
  (3, 'charlie@example.com', 'Charlie', 20239876, 'cdf123', 0);

-- Restaurant 더미데이터
INSERT INTO restaurant (id, restaurant_name, address, phone_number, business_hours, delivery_fee, image_url)
VALUES
  (1, 'Campus Pizza', '123 Campus St', '010-1111-2222', '09:00-21:00', 2000, 'https://example.com/pizza.jpg'),
  (2, 'Global Sushi', '456 Global Ave','010-3333-4444', '11:00-22:00', 3000, 'https://example.com/sushi.jpg'),
  (3, 'Korean BBQ',   '789 BBQ Rd',    '010-5555-6666', '17:00-23:00', 4000, 'https://example.com/bbq.jpg');

-- FoodItem 더미데이터
INSERT INTO food_item (id, restaurant_id, item_name, price, image_url)
VALUES
  (1, 1, 'Pepperoni Pizza', 12000, 'https://example.com/pepperoni.jpg'),
  (2, 1, 'Cheese Pizza',    10000, 'https://example.com/cheese.jpg'),
  (3, 2, 'Salmon Sushi Set',15000, 'https://example.com/salmon.jpg'),
  (4, 3, 'Pork Belly BBQ',  20000, 'https://example.com/porkbelly.jpg');

-- FoodFareRoom 더미데이터
INSERT INTO food_fare_room (id, creator_user_id, restaurant_id, deadline, min_member)
VALUES
  (1, 1, 1, '2025-07-07 15:30:00', 3),
  (2, 2, 2, '2025-07-08 18:00:00', 2);

-- FoodResult 더미데이터
INSERT INTO food_result (id, food_fare_room_id, progress, description)
VALUES
  (1, 1, 0, '주문 대기중'),
  (2, 2, 0, '결제 준비중');

-- FoodJoinUser 더미데이터
INSERT INTO food_join_user (id, user_id, delivery_confirmation, food_fare_room_id)
VALUES
  (1, 1, 0, 1), -- Alice 참여
  (2, 2, 0, 1), -- Bob 참여
  (3, 2, 0, 2), -- Bob 참여
  (4, 3, 0, 2); -- Charlie 참여

-- FoodOrder 더미데이터
INSERT INTO food_order (id, food_item_id, quantity, food_join_user_id)
VALUES
  (1, 1, 1, 1), -- Alice: Pepperoni Pizza
  (2, 2, 2, 2), -- Bob: Cheese Pizza x2
  (3, 3, 1, 3), -- Bob: Sushi Set
  (4, 4, 1, 4); -- Charlie: Pork Belly BBQ
