import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes } from './routes/auth'
import { lessonRoutes } from './routes/lessons'
import { activityRoutes } from './routes/activities'
import { teacherRoutes } from './routes/teacher'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
// @ts-ignore
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

const assetManifest = JSON.parse(manifestJSON)

export type Env = {
  DB: D1Database
  JWT_SECRET: string
  __STATIC_CONTENT: KVNamespace
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors({
  origin: ['http://localhost:5173', 'https://*.workers.dev', 'https://*.pages.dev'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}))

app.route('/api/auth', authRoutes)
app.route('/api/lessons', lessonRoutes)
app.route('/api/activities', activityRoutes)
app.route('/api/teacher', teacherRoutes)

app.get('/api/health', (c) => c.json({ status: 'ok' }))

app.get('*', async (c) => {
  try {
    return await getAssetFromKV(
      { request: c.req.raw, waitUntil: c.executionCtx.waitUntil.bind(c.executionCtx) },
      { ASSET_NAMESPACE: c.env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
    )
  } catch {
    // SPA fallback: 모든 알 수 없는 경로는 index.html 반환
    try {
      const indexReq = new Request(new URL('/index.html', c.req.url).toString(), c.req.raw)
      return await getAssetFromKV(
        { request: indexReq, waitUntil: c.executionCtx.waitUntil.bind(c.executionCtx) },
        { ASSET_NAMESPACE: c.env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
      )
    } catch {
      return c.text('Not found', 404)
    }
  }
})

export default app
