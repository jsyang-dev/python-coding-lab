-- 사용자 테이블 (학생 + 교사)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  class_name TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 단원 학습 진도
CREATE TABLE IF NOT EXISTS lesson_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  lesson_id INTEGER NOT NULL,
  status TEXT DEFAULT 'not_started',
  quiz_score INTEGER,
  completed_at TEXT,
  UNIQUE(user_id, lesson_id)
);

-- 수행활동 제출
CREATE TABLE IF NOT EXISTS activity_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  activity_id INTEGER NOT NULL,
  code TEXT NOT NULL,
  stdout TEXT,
  execution_time_ms INTEGER,
  score INTEGER,
  test_results TEXT,
  submitted_at TEXT DEFAULT (datetime('now')),
  is_final INTEGER DEFAULT 0
);

-- 배지
CREATE TABLE IF NOT EXISTS badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  badge_type TEXT NOT NULL,
  badge_data TEXT,
  earned_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, badge_type, badge_data)
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_activity ON activity_submissions(user_id, activity_id);
