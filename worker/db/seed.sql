-- 교사 테스트 계정 (비밀번호: teacher123)
INSERT INTO users (student_id, name, password_hash, role, class_name)
VALUES ('T0001', '테스트 교사', 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6:0370e312995a62a458e5c3869a8d7a244a67019740f6aca18b055b1cd7968acc', 'teacher', NULL)
ON CONFLICT(student_id) DO UPDATE SET
  name = excluded.name,
  password_hash = excluded.password_hash,
  role = excluded.role;
