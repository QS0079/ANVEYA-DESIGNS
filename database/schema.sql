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

CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin login: admin@anveya.com / Admin@anveya.com
INSERT IGNORE INTO admin_users (name, email, password_hash) VALUES ('Admin', 'admin@anveya.com', '$2a$10$uGattOmFXz56tqU6r9Kl9uZGZ3rByHB0Uxf0eSuUsV59aGyXSe0tC');

-- FAQs (only inserted if the table is empty)
INSERT INTO faqs (question, answer, sort_order, is_active)
SELECT * FROM (
SELECT 'What types of interior design projects does Anveya Designs undertake?' AS q, 'Anveya Designs specialises in residential and commercial interior design. This includes home interiors, living rooms, bedrooms, kitchens, offices and other commercial environments, depending on project requirements.' AS a, 1 AS so, 1 AS act UNION ALL
SELECT 'Do you provide complete home interior design solutions?' AS q, 'Yes, we can discuss complete home interior design requirements, from initial space planning and concept development to material selection and execution, depending on the agreed scope of work.' AS a, 2 AS so, 1 AS act UNION ALL
SELECT 'Can I customise the interior design according to my preferences?' AS q, 'Absolutely. Every project begins with understanding your preferences, lifestyle, functional needs and design expectations. The proposed design is developed around these requirements.' AS a, 3 AS so, 1 AS act UNION ALL
SELECT 'Do you undertake commercial interior design projects?' AS q, 'Yes. We work on commercial interior design requirements, creating functional and visually cohesive environments suited to different business needs.' AS a, 4 AS so, 1 AS act UNION ALL
SELECT 'How much does an interior design project cost?' AS q, 'The cost depends on the size of the space, design requirements, materials, finishes and scope of work. Contact us to discuss your project and receive a customised estimate.' AS a, 5 AS so, 1 AS act UNION ALL
SELECT 'How can I get started with Anveya Designs?' AS q, 'You can contact us through our website enquiry form, phone or email. Share a few details about your space and requirements, and our team can guide you through the next steps.' AS a, 6 AS so, 1 AS act
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM faqs);
