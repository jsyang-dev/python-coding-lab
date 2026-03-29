import { useAuthStore } from '../stores/authStore'

const BASE_URL = import.meta.env.DEV ? 'http://localhost:8787' : ''

export function useApi() {
  const token = useAuthStore((s) => s.token)

  async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || '요청에 실패했습니다.')
    return data
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  }
}
