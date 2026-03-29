import { Hono } from 'hono'
import { hashPassword, verifyPassword } from '../lib/hash'
import { signJWT } from '../lib/jwt'
import { authMiddleware } from '../middleware/auth'
import type { Env } from '../index'

export const authRoutes = new Hono<{ Bindings: Env }>()

// 회원가입
authRoutes.post('/register', async (c) => {
  const { studentId, name, className, password } = await c.req.json()

  if (!studentId || !name || !password) {
    return c.json({ error: '필수 정보를 입력해주세요.' }, 400)
  }

  // 중복 학번 체크
  const existing = await c.env.DB.prepare(
    'SELECT id FROM users WHERE student_id = ?'
  ).bind(studentId).first()

  if (existing) {
    return c.json({ error: '이미 사용 중인 학번입니다.' }, 409)
  }

  const passwordHash = await hashPassword(password)

  const result = await c.env.DB.prepare(
    'INSERT INTO users (student_id, name, password_hash, role, class_name) VALUES (?, ?, ?, ?, ?)'
  ).bind(studentId, name, passwordHash, 'student', className || null).run()

  return c.json({ message: '회원가입이 완료되었습니다.', id: result.meta.last_row_id }, 201)
})

// 로그인
authRoutes.post('/login', async (c) => {
  const { studentId, password } = await c.req.json()

  if (!studentId || !password) {
    return c.json({ error: '학번과 비밀번호를 입력해주세요.' }, 400)
  }

  const user = await c.env.DB.prepare(
    'SELECT id, student_id, name, password_hash, role, class_name FROM users WHERE student_id = ?'
  ).bind(studentId).first<{
    id: number; student_id: string; name: string;
    password_hash: string; role: string; class_name: string | null
  }>()

  if (!user) {
    return c.json({ error: '학번 또는 비밀번호가 올바르지 않습니다.' }, 401)
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    return c.json({ error: '학번 또는 비밀번호가 올바르지 않습니다.' }, 401)
  }

  const token = await signJWT({
    userId: user.id,
    studentId: user.student_id,
    role: user.role,
    name: user.name,
  }, c.env.JWT_SECRET)

  return c.json({
    token,
    user: {
      id: user.id,
      studentId: user.student_id,
      name: user.name,
      role: user.role,
      className: user.class_name,
    }
  })
})

// 내 정보
authRoutes.get('/me', authMiddleware, async (c) => {
  const userId = c.get('userId')
  const user = await c.env.DB.prepare(
    'SELECT id, student_id, name, role, class_name FROM users WHERE id = ?'
  ).bind(userId).first()

  if (!user) return c.json({ error: '사용자를 찾을 수 없습니다.' }, 404)
  return c.json({ user })
})
