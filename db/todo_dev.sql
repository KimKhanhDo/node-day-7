/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80408 (8.4.8)
 Source Host           : localhost:3306
 Source Schema         : todo_dev

 Target Server Type    : MySQL
 Target Server Version : 80408 (8.4.8)
 File Encoding         : 65001

 Date: 30/01/2026 13:18:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for queues
-- ----------------------------
DROP TABLE IF EXISTS `queues`;
CREATE TABLE `queues` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of queues
-- ----------------------------
BEGIN;
INSERT INTO `queues` (`id`, `type`, `payload`, `status`, `created_at`, `updated_at`) VALUES (1, 'sendVerificationEmail', '{\"id\":24,\"name\":\"Kim\",\"email\":\"kim.do2709@gmail.com\"}', 'completed', NULL, NULL);
INSERT INTO `queues` (`id`, `type`, `payload`, `status`, `created_at`, `updated_at`) VALUES (2, 'sendVerificationEmail', '{\"id\":25,\"name\":\"Kim\",\"email\":\"kim.do2709@gmail.com\"}', 'failed', '2026-01-29 20:49:30', '2026-01-29 20:49:30');
INSERT INTO `queues` (`id`, `type`, `payload`, `status`, `created_at`, `updated_at`) VALUES (3, 'sendVerificationEmail', '{\"id\":26,\"name\":\"Kim\",\"email\":\"kim.do2709@gmail.com\"}', 'completed', '2026-01-29 20:50:20', '2026-01-29 20:50:20');
INSERT INTO `queues` (`id`, `type`, `payload`, `status`, `created_at`, `updated_at`) VALUES (4, 'sendPasswordChangeEmail', '{\"id\":26,\"name\":\"Kim\",\"email\":\"kim.do2709@gmail.com\",\"changedAt\":\"2026-01-30T00:19:10.965Z\"}', 'completed', '2026-01-30 11:19:10', '2026-01-30 11:19:10');
INSERT INTO `queues` (`id`, `type`, `payload`, `status`, `created_at`, `updated_at`) VALUES (5, 'sendPasswordChangeEmail', '{\"id\":26,\"name\":\"Kim\",\"email\":\"kim.do2709@gmail.com\",\"changedAt\":\"2026-01-30T01:44:05.136Z\"}', 'completed', '2026-01-30 12:44:05', '2026-01-30 12:44:05');
INSERT INTO `queues` (`id`, `type`, `payload`, `status`, `created_at`, `updated_at`) VALUES (6, 'sendVerificationEmail', '{\"id\":27,\"name\":\"Kim\",\"email\":\"kim.do2709@gmail.com\"}', 'failed', '2026-01-30 12:51:05', '2026-01-30 12:51:05');
INSERT INTO `queues` (`id`, `type`, `payload`, `status`, `created_at`, `updated_at`) VALUES (7, 'sendVerificationEmail', '{\"id\":28,\"name\":\"Kim\",\"email\":\"kim.do2709@gmail.com\"}', 'completed', '2026-01-30 13:01:22', '2026-01-30 13:01:22');
INSERT INTO `queues` (`id`, `type`, `payload`, `status`, `created_at`, `updated_at`) VALUES (8, 'sendVerificationEmail', '{\"id\":29,\"name\":\"Kim\",\"email\":\"kim.do2709@gmail.com\"}', 'completed', '2026-01-30 13:03:29', '2026-01-30 13:03:29');
COMMIT;

-- ----------------------------
-- Table structure for revoked_tokens
-- ----------------------------
DROP TABLE IF EXISTS `revoked_tokens`;
CREATE TABLE `revoked_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_expires_at` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of revoked_tokens
-- ----------------------------
BEGIN;
INSERT INTO `revoked_tokens` (`id`, `token`, `revoked_at`, `expires_at`) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImV4cCI6MTc2OTUwMjA5MiwiaWF0IjoxNzY5NDk4NDkyfQ.rEibbemQWc-km4HvdcKIrE-R21rmRop_UcGBg_mPUC4', '2026-01-27 18:23:18', '2026-01-27 19:21:32');
INSERT INTO `revoked_tokens` (`id`, `token`, `revoked_at`, `expires_at`) VALUES (2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImV4cCI6MTc2OTU2NDc1NywiaWF0IjoxNzY5NTYxMTU3fQ.DRB2XtzKnpnHnixpELS_SpSMkipB_cVwmUWVmT0wk6k', '2026-01-28 11:46:19', '2026-01-28 12:45:57');
COMMIT;

-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_completed` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_tasks_user_id` (`user_id`),
  CONSTRAINT `fk_tasks_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of tasks
-- ----------------------------
BEGIN;
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (1, 1, 'Học React Redux Toolkit', 0, '2026-01-22 15:13:34', '2026-01-22 15:13:42');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (2, 1, 'Cài đặt MySQL trên Mac', 0, '2026-01-22 15:13:58', '2026-01-22 15:22:18');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (3, 2, 'Viết API documentation', 0, '2026-01-22 15:14:19', '2026-01-22 15:22:21');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (4, 2, 'Debug CORS issue trong Express', 0, '2026-01-22 15:14:54', '2026-01-22 15:22:25');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (7, 3, 'Học Tailwind CSS', 0, '2026-01-22 15:22:07', '2026-01-22 15:22:07');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (11, 8, 'Complete project documentation', 0, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (12, 8, 'Review pull requests', 0, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (13, 8, 'Fix login bug', 1, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (14, 8, 'Database optimization', 0, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (15, 8, 'Team meeting preparation', 0, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (16, 8, 'Learn React hooks', 0, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (17, 8, 'Update npm dependencies', 0, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (18, 8, 'Write unit tests for auth module', 1, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (19, 8, 'Code review for new features', 0, '2026-01-27 17:48:48', '2026-01-27 17:48:48');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (20, 8, 'Deploy to staging environment UPDATE', 1, '2026-01-27 17:48:48', '2026-01-28 10:19:55');
INSERT INTO `tasks` (`id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`) VALUES (21, 8, 'Learn JWT updating', 0, '2026-01-27 17:55:23', '2026-01-28 10:19:20');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_expires_at` timestamp NULL DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (1, 'Kim Nguyen', 'kim@example.com', 'password123', NULL, NULL, NULL, '2026-01-25 20:36:06', '2026-01-25 20:36:06');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (2, 'John Doe', 'john@example.com', 'password123', NULL, NULL, NULL, '2026-01-25 20:36:06', '2026-01-25 20:36:06');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (3, 'Alice Smith', 'alice@example.com', 'password123', NULL, NULL, NULL, '2026-01-25 20:36:06', '2026-01-25 20:36:06');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (5, 'abc', 'abc@gmail.com', '12345678', NULL, NULL, NULL, '2026-01-26 13:30:01', '2026-01-26 13:30:01');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (6, 'SuDo', 'su@gmail.com', '12345678', NULL, NULL, NULL, '2026-01-26 13:50:58', '2026-01-26 13:50:58');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (7, 'DogDo', 'dog@gmail.com', '12345678', NULL, NULL, NULL, '2026-01-26 13:52:51', '2026-01-26 13:52:51');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (8, 'Thuy Le', 'thuy@gmail.com', '$2b$10$WjeZ1UQj/2oZVau45VN7Neg0kwG0p5KneuQzy7ksv99Kh3bh4N/oW', 'irRPsqUw6Xn29NamaAiErWBEt8fVnJh6', '2026-02-04 17:39:35', NULL, '2026-01-27 11:28:10', '2026-01-28 17:39:35');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (10, 'node-day-7', 'node07@gmail.com', '$2b$10$rcEEe9e/hEcaONkkGXi1quoxLYRBu2H2serpdxliArNUGJgt5QEye', NULL, NULL, NULL, '2026-01-28 16:28:08', '2026-01-28 16:28:08');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (12, 'abc1', 'abc1@gmail.com', '$2b$10$NzQP8eAaDkY0.r9dFqOWI.lBANwCF/RmX2ma2t.V/daIsvdRAY0nm', NULL, NULL, NULL, '2026-01-28 17:40:51', '2026-01-28 17:40:51');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (14, 'Khanh', 'khanh.k.do02@gmail.com', '$2b$10$XPuw/1QsqIn0btFc0HVapOoshl3GJYyZwDe74qKeFzrN1T0CFggg6', NULL, NULL, NULL, '2026-01-28 17:49:27', '2026-01-28 17:49:27');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (15, 'Su Su', 'su.do2709@gmail.com', '$2b$10$iN3oLoVQdh8EhI24vN2pceTkFBtJYSF.K7LbB.BofNQvGxb9.UxEG', NULL, NULL, NULL, '2026-01-28 17:54:27', '2026-01-28 17:54:27');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `refresh_expires_at`, `verified_at`, `created_at`, `updated_at`) VALUES (29, 'Kim', 'kim.do2709@gmail.com', '$2b$10$QDytTJd1iKTSK3wAbAshqe1y5JIi5RuD96WKiEsdoyt2dw/uswp26', 'yQp0cd8CtmtWmWVfYNJUE26jbkwH5tvQ', '2026-02-06 13:03:49', '2026-01-30 13:04:44', '2026-01-30 13:03:29', '2026-01-30 13:04:44');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
