import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'

export function Register() {
  const [form, setForm] = useState({ studentId: '', name: '', className: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ studentId: form.studentId, name: form.name, className: form.className, password: form.password })
      })
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🐍</div>
          <h1 className="text-2xl font-bold">회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'studentId', label: '학번', type: 'text', placeholder: '예) 20240001' },
            { name: 'name', label: '이름', type: 'text', placeholder: '이름을 입력하세요' },
            { name: 'className', label: '학급 (선택)', type: 'text', placeholder: '예) 2-3' },
            { name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력하세요' },
            { name: 'confirmPassword', label: '비밀번호 확인', type: 'password', placeholder: '비밀번호를 다시 입력하세요' },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input type={f.type} name={f.name} className="input" placeholder={f.placeholder}
                value={form[f.name as keyof typeof form]} onChange={handleChange}
                required={f.name !== 'className'} />
            </div>
          ))}

          {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">로그인</Link>
        </p>
      </div>
    </div>
  )
}
