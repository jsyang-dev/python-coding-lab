import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import type { Env } from '../index'

type HonoEnv = { Bindings: Env; Variables: { userId: number; studentId: string; role: string; name: string } }
export const lessonRoutes = new Hono<HonoEnv>()

lessonRoutes.use('*', authMiddleware)

// 전체 진도 조회
lessonRoutes.get('/progress', async (c) => {
  const userId = c.get('userId')
  const progress = await c.env.DB.prepare(
    'SELECT lesson_id, status, quiz_score, completed_at FROM lesson_progress WHERE user_id = ?'
  ).bind(userId).all()

  return c.json({ progress: progress.results })
})

// 단원 진도 업데이트
lessonRoutes.put('/:id/progress', async (c) => {
  const userId = c.get('userId')
  const lessonId = parseInt(c.req.param('id'))
  const { status } = await c.req.json()

  await c.env.DB.prepare(`
    INSERT INTO lesson_progress (user_id, lesson_id, status)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, lesson_id) DO UPDATE SET
      status = excluded.status,
      completed_at = CASE WHEN excluded.status = 'completed' THEN datetime('now') ELSE completed_at END
  `).bind(userId, lessonId, status).run()

  return c.json({ message: '진도가 업데이트되었습니다.' })
})

// 퀴즈 제출
lessonRoutes.post('/:id/quiz', async (c) => {
  const userId = c.get('userId')
  const lessonId = parseInt(c.req.param('id'))
  const { score } = await c.req.json()

  await c.env.DB.prepare(`
    INSERT INTO lesson_progress (user_id, lesson_id, status, quiz_score, completed_at)
    VALUES (?, ?, 'completed', ?, datetime('now'))
    ON CONFLICT(user_id, lesson_id) DO UPDATE SET
      quiz_score = excluded.quiz_score,
      status = 'completed',
      completed_at = datetime('now')
  `).bind(userId, lessonId, score).run()

  // 배지 체크: 단원 완료
  await c.env.DB.prepare(`
    INSERT OR IGNORE INTO badges (user_id, badge_type, badge_data)
    VALUES (?, 'lesson_complete', ?)
  `).bind(userId, JSON.stringify({ lessonId })).run()

  return c.json({ message: '퀴즈 결과가 저장되었습니다.', score })
})
