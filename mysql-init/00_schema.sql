-- 문자셋/콜레이션
CREATE DATABASE IF NOT EXISTS `db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db`;

-- ─────────────────────────────────────────────────────────────
-- user  (User 엔티티)
--  - email: unique
--  - name: NOT NULL
--  - student_number: VARCHAR(7) + UNIQUE
--  - total_discount: NOT NULL DEFAULT 0
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `user` (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  email            VARCHAR(100) NOT NULL UNIQUE,
  name             VARCHAR(50)  NOT NULL,
  student_number   VARCHAR(7)   NOT NULL,
  password         VARCHAR(255) NOT NULL,
  total_discount   INT          NOT NULL DEFAULT 0,
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_student_number (student_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────────────────────
-- restaurant (Restaurant 엔티티)
--  - (restaurant_name, phone_number) 복합 UNIQUE  ← 엔티티 @Unique(['restaurantName','phoneNumber'])
--  - address/phone_number/business_hours: NOT NULL (엔티티 @Column()과 일치)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS restaurant (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_name  VARCHAR(200) NOT NULL,
  address          VARCHAR(255) NOT NULL,
  phone_number     VARCHAR(30)  NOT NULL,
  business_hours   VARCHAR(50)  NOT NULL,
  delivery_fee     INT          NOT NULL DEFAULT 0,
  image_url        VARCHAR(512),
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_restaurant_name_phone (restaurant_name, phone_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────────────────────
-- food_item (FoodItem 엔티티)
--  - (restaurant_id, item_name) 복합 UNIQUE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS food_item (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id    INT NOT NULL,
  item_name        VARCHAR(200) NOT NULL,
  price            INT NOT NULL DEFAULT 0,
  image_url        VARCHAR(512),
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_food_item_restaurant_id (restaurant_id),
  UNIQUE KEY uq_food_item_restaurant_name (restaurant_id, item_name),
  CONSTRAINT fk_food_item__restaurant
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────────────────────
-- food_fare_room (FoodFareRoom 엔티티)
--  - (creator_user_id, restaurant_id, deadline) 복합 UNIQUE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS food_fare_room (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  creator_user_id   INT NOT NULL,
  restaurant_id     INT NOT NULL,
  deadline          DATETIME NOT NULL,
  min_member        INT NOT NULL DEFAULT 1,
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_room_creator_user_id (creator_user_id),
  INDEX idx_room_restaurant_id   (restaurant_id),
  UNIQUE KEY uq_room_creator_rest_deadline (creator_user_id, restaurant_id, deadline),
  CONSTRAINT fk_room__creator_user
    FOREIGN KEY (creator_user_id) REFERENCES `user`(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_room__restaurant
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────────────────────
-- food_result (FoodResult 엔티티)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS food_result (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  food_fare_room_id  INT NOT NULL,
  progress           TINYINT NOT NULL DEFAULT 0,
  description        VARCHAR(255) NOT NULL,
  created_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_result_room_id (food_fare_room_id),
  CONSTRAINT fk_result__room
    FOREIGN KEY (food_fare_room_id) REFERENCES food_fare_room(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────────────────────
-- food_join_user (FoodJoinUser 엔티티)
--  - (user_id, food_fare_room_id) 복합 UNIQUE
--  - delivery_confirmation: TINYINT(1) 기본 0
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS food_join_user (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  user_id               INT NOT NULL,
  delivery_confirmation TINYINT NOT NULL DEFAULT 0,
  food_fare_room_id     INT NOT NULL,
  created_at            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_join_user_per_room (user_id, food_fare_room_id),
  INDEX idx_join_user_id (user_id),
  INDEX idx_join_room_id (food_fare_room_id),
  CONSTRAINT fk_join_user__user
    FOREIGN KEY (user_id) REFERENCES `user`(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_join_user__room
    FOREIGN KEY (food_fare_room_id) REFERENCES food_fare_room(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────────────────────
-- food_order (FoodOrder 엔티티)
--  - (food_join_user_id, food_item_id) 복합 UNIQUE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS food_order (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  food_item_id       INT NOT NULL,
  quantity           INT NOT NULL DEFAULT 1,
  food_join_user_id  INT NOT NULL,
  created_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_order_item_id (food_item_id),
  INDEX idx_order_join_user_id (food_join_user_id),
  UNIQUE KEY uq_order_joinuser_item (food_join_user_id, food_item_id),
  CONSTRAINT fk_order__item
    FOREIGN KEY (food_item_id) REFERENCES food_item(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_order__join_user
    FOREIGN KEY (food_join_user_id) REFERENCES food_join_user(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
