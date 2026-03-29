import { createMiddleware } from 'hono/factory'
import { verifyJWT } from '../lib/jwt'
import type { Env } from '../index'

export const authMiddleware = createMiddleware<{
  Bindings: Env
  Variables: { userId: number; studentId: string; role: string; name: string }
}>(async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: '인증이 필요합니다.' }, 401)
  }

  const token = authHeader.slice(7)
  try {
    const payload = await verifyJWT(token, c.env.JWT_SECRET)
    c.set('userId', payload.userId)
    c.set('studentId', payload.studentId)
    c.set('role', payload.role)
    c.set('name', payload.name)
    await next()
  } catch {
    return c.json({ error: '유효하지 않은 토큰입니다.' }, 401)
  }
})

export const teacherOnly = createMiddleware<{
  Bindings: Env
  Variables: { userId: number; studentId: string; role: string; name: string }
}>(async (c, next) => {
  if (c.get('role') !== 'teacher') {
    return c.json({ error: '교사 권한이 필요합니다.' }, 403)
  }
  await next()
})
