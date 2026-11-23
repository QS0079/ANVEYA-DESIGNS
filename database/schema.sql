-- Anveya Designs database (MySQL / MariaDB)
-- phpMyAdmin: select your database first, then Import this file. Or run: npm run db:setup

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL DEFAULT 'Admin',
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NULL,
  phone VARCHAR(40) NOT NULL,
  location VARCHAR(190) NULL,
  property_type VARCHAR(60) NULL,
  service VARCHAR(120) NULL,
  budget VARCHAR(80) NULL,
  timeline VARCHAR(80) NULL,
  message TEXT NULL,
  source_page VARCHAR(120) NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new',
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Admin login: admin@anveya.com / Admin@anveya
INSERT IGNORE INTO admin_users (name, email, password_hash) VALUES ('Admin', 'admin@anveya.com', '$2a$10$QQttNvxQkRQAHtp0ij.3bu.ixtBfXzCJ6/3neVfCeXbaM2oBtWTMu');

