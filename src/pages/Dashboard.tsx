import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useApi } from '../hooks/useApi'

const lessonNames = ['입력과 출력', '변수와 자료형', '선택구조', '반복구조', '함수', '파일 처리']
const activityNames = ['사물함 번호', '재고 관리', '복리이자 계산기', '급식 메뉴 TTS', '가위바위보', '체력 평가']

export function Dashboard() {
  const { user } = useAuth()
  const api = useApi()
  const [lessonProgress, setLessonProgress] = useState<Array<{ lesson_id: number; status: string; quiz_score: number }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<{ progress: Array<{ lesson_id: number; status: string; quiz_score: number }> }>('/api/lessons/progress')
      .then(d => setLessonProgress(d.progress))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const completedLessons = lessonProgress.filter(p => p.status === 'completed').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">안녕하세요, {user?.name}님! 👋</h1>
        <p className="text-gray-500 mt-1">오늘도 파이썬 학습을 시작해볼까요?</p>
      </div>

      {/* 진도 요약 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600">{completedLessons}/6</div>
          <div className="text-sm text-gray-500 mt-1">완료한 단원</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">0/6</div>
          <div className="text-sm text-gray-500 mt-1">완료한 수행활동</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">0</div>
          <div className="text-sm text-gray-500 mt-1">획득한 배지</div>
        </div>
      </div>

      {/* 단원 목록 */}
      <div>
        <h2 className="text-lg font-semibold mb-3">단원 학습</h2>
        {loading ? (
          <div className="text-gray-400 text-sm">로딩 중...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lessonNames.map((name, i) => {
              const progress = lessonProgress.find(p => p.lesson_id === i + 1)
              const status = progress?.status || 'not_started'
              return (
                <Link key={i} to={`/lessons/${i + 1}`}
                  className="card flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                    ${status === 'completed' ? 'bg-green-100 text-green-700' :
                      status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-xs text-gray-500">
                      {status === 'completed' ? `완료 (퀴즈: ${progress?.quiz_score ?? '-'}점)` :
                       status === 'in_progress' ? '학습 중' : '미시작'}
                    </div>
                  </div>
                  {status === 'completed' && <span className="ml-auto text-green-500">✓</span>}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* 수행활동 바로가기 */}
      <div>
        <h2 className="text-lg font-semibold mb-3">수행활동</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {activityNames.map((name, i) => (
            <Link key={i} to={`/activities/${i + 1}`}
              className="card text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-2xl mb-1">
                {['🔢', '📦', '💰', '🍽️', '✂️', '🏃'][i]}
              </div>
              <div className="text-sm font-medium">{name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
