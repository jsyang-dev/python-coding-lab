import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-blue-600 text-lg">
            <span>🐍</span>
            <span className="hidden sm:block">Python Coding Lab</span>
            <span className="sm:hidden">PyLab</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/lessons" className="text-gray-600 hover:text-blue-600 transition-colors">단원 학습</Link>
            <Link to="/activities" className="text-gray-600 hover:text-blue-600 transition-colors">수행활동</Link>
            <Link to="/playground" className="text-gray-600 hover:text-blue-600 transition-colors">놀이터</Link>
            {user?.role === 'teacher' && (
              <Link to="/teacher" className="text-gray-600 hover:text-blue-600 transition-colors">교사 대시보드</Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">{user?.name}</span>
            <button onClick={handleLogout} className="btn-secondary text-sm py-1.5 px-3">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
