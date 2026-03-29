import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import { validateSubmission } from '../lib/anticheat'
import type { Env } from '../index'

type HonoEnv = { Bindings: Env; Variables: { userId: number; studentId: string; role: string; name: string } }
export const activityRoutes = new Hono<HonoEnv>()

activityRoutes.use('*', authMiddleware)

// 제출 이력 조회
activityRoutes.get('/:id/submissions', async (c) => {
  const userId = c.get('userId')
  const activityId = parseInt(c.req.param('id'))

  const submissions = await c.env.DB.prepare(`
    SELECT id, score, test_results, submitted_at, is_final, stdout
    FROM activity_submissions
    WHERE user_id = ? AND activity_id = ?
    ORDER BY submitted_at DESC
    LIMIT 20
  `).bind(userId, activityId).all()

  return c.json({ submissions: submissions.results })
})

// 코드 제출
activityRoutes.post('/:id/submit', async (c) => {
  const userId = c.get('userId')
  const activityId = parseInt(c.req.param('id'))
  const { code, stdout, executionTimeMs, score, testResults, isFinal } = await c.req.json()

  // is_final 중복 제출 방지
  const finalExists = await c.env.DB.prepare(`
    SELECT id FROM activity_submissions
    WHERE user_id = ? AND activity_id = ? AND is_final = 1
  `).bind(userId, activityId).first()

  if (finalExists) {
    return c.json({ error: '이미 최종 제출이 완료되었습니다.' }, 409)
  }

  // Anti-cheat 검증
  const validation = validateSubmission({ code: code || '', stdout: stdout || '', score: score || 0 })
  if (!validation.valid) {
    return c.json({ error: validation.reason }, 400)
  }

  const result = await c.env.DB.prepare(`
    INSERT INTO activity_submissions (user_id, activity_id, code, stdout, execution_time_ms, score, test_results, is_final)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    userId, activityId, code, stdout || '',
    executionTimeMs || 0, score || 0,
    JSON.stringify(testResults || []),
    isFinal ? 1 : 0
  ).run()

  // 만점 배지
  if (score >= 100 && isFinal) {
    await c.env.DB.prepare(`
      INSERT OR IGNORE INTO badges (user_id, badge_type, badge_data)
      VALUES (?, 'activity_perfect', ?)
    `).bind(userId, JSON.stringify({ activityId })).run()
  }

  return c.json({ message: '제출이 완료되었습니다.', id: result.meta.last_row_id }, 201)
})
