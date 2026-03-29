import { Hono } from 'hono'
import { authMiddleware, teacherOnly } from '../middleware/auth'
import type { Env } from '../index'

export const teacherRoutes = new Hono<{ Bindings: Env }>()

teacherRoutes.use('*', authMiddleware, teacherOnly)

// 교사 대시보드 - 전체 진도 현황
teacherRoutes.get('/dashboard', async (c) => {
  const studentCount = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM users WHERE role = 'student'"
  ).first<{ count: number }>()

  const lessonStats = await c.env.DB.prepare(`
    SELECT lesson_id, status, COUNT(*) as count
    FROM lesson_progress
    GROUP BY lesson_id, status
  `).all()

  const activityStats = await c.env.DB.prepare(`
    SELECT activity_id, COUNT(DISTINCT user_id) as submitted,
           AVG(score) as avg_score
    FROM activity_submissions
    WHERE is_final = 1
    GROUP BY activity_id
  `).all()

  return c.json({
    studentCount: studentCount?.count || 0,
    lessonStats: lessonStats.results,
    activityStats: activityStats.results,
  })
})

// 학생 목록
teacherRoutes.get('/students', async (c) => {
  const students = await c.env.DB.prepare(`
    SELECT u.id, u.student_id, u.name, u.class_name,
           COUNT(DISTINCT lp.lesson_id) as completed_lessons,
           COUNT(DISTINCT acs.activity_id) as completed_activities
    FROM users u
    LEFT JOIN lesson_progress lp ON u.id = lp.user_id AND lp.status = 'completed'
    LEFT JOIN activity_submissions acs ON u.id = acs.user_id AND acs.is_final = 1
    WHERE u.role = 'student'
    GROUP BY u.id
    ORDER BY u.class_name, u.student_id
  `).all()

  return c.json({ students: students.results })
})

// 개별 학생 상세
teacherRoutes.get('/students/:id', async (c) => {
  const studentId = parseInt(c.req.param('id'))

  const user = await c.env.DB.prepare(
    'SELECT id, student_id, name, class_name FROM users WHERE id = ? AND role = ?'
  ).bind(studentId, 'student').first()

  if (!user) return c.json({ error: '학생을 찾을 수 없습니다.' }, 404)

  const lessonProgress = await c.env.DB.prepare(
    'SELECT lesson_id, status, quiz_score, completed_at FROM lesson_progress WHERE user_id = ?'
  ).bind(studentId).all()

  const submissions = await c.env.DB.prepare(`
    SELECT activity_id, code, stdout, score, test_results, submitted_at, is_final
    FROM activity_submissions
    WHERE user_id = ?
    ORDER BY submitted_at DESC
  `).bind(studentId).all()

  return c.json({ user, lessonProgress: lessonProgress.results, submissions: submissions.results })
})

// 수행활동별 제출 현황
teacherRoutes.get('/activities/:id/submissions', async (c) => {
  const activityId = parseInt(c.req.param('id'))

  const submissions = await c.env.DB.prepare(`
    SELECT u.student_id, u.name, u.class_name,
           acs.code, acs.stdout, acs.score, acs.test_results, acs.submitted_at, acs.is_final
    FROM activity_submissions acs
    JOIN users u ON acs.user_id = u.id
    WHERE acs.activity_id = ?
    ORDER BY acs.submitted_at DESC
  `).bind(activityId).all()

  return c.json({ submissions: submissions.results })
})
