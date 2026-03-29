import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

interface DashboardData {
  studentCount: number
  lessonStats: Array<{ lesson_id: number; status: string; count: number }>
  activityStats: Array<{ activity_id: number; submitted: number; avg_score: number }>
}

const LESSON_TITLES = ['입력과 출력', '변수와 자료형', '연산자', '제어문', '함수', '파일 처리']
const ACTIVITY_TITLES = ['티끌 모아 태산!', '재고 관리 프로그램', '복리 이자 계산 프로그램', '급식 메뉴 알림 TTS', '가위바위보 프로그램', '학생 건강 체력 평가']

export function TeacherDashboard() {
  const api = useApi()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<DashboardData>('/api/teacher/dashboard')
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-12 text-gray-400">불러오는 중...</div>
  if (!data) return <div className="text-center py-12 text-red-500">데이터를 불러올 수 없습니다.</div>

  const lessonCompletedMap: Record<number, number> = {}
  for (const s of data.lessonStats) {
    if (s.status === 'completed') lessonCompletedMap[s.lesson_id] = s.count
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📊 교사 대시보드</h1>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600">{data.studentCount}</div>
          <div className="text-sm text-gray-500 mt-1">전체 학생</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {data.lessonStats.filter(s => s.status === 'completed').reduce((a, s) => a + s.count, 0)}
          </div>
          <div className="text-sm text-gray-500 mt-1">단원 학습 완료</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">
            {data.activityStats.reduce((a, s) => a + s.submitted, 0)}
          </div>
          <div className="text-sm text-gray-500 mt-1">수행활동 제출</div>
        </div>
      </div>

      {/* 빠른 이동 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/teacher/students" className="card hover:shadow-md transition-shadow flex items-center gap-3">
          <span className="text-3xl">👨‍🎓</span>
          <div>
            <div className="font-semibold">학생 관리</div>
            <div className="text-sm text-gray-500">학생 목록 및 진도 현황</div>
          </div>
        </Link>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <Link
              key={i}
              to={`/teacher/activities/${i}`}
              className="card hover:shadow-md transition-shadow text-center p-2"
            >
              <div className="text-xs font-semibold text-gray-700">활동 {i}</div>
              <div className="text-xs text-gray-400 mt-0.5">{ACTIVITY_TITLES[i-1]}</div>
              <div className="text-sm font-bold text-purple-600 mt-1">
                {data.activityStats.find(s => s.activity_id === i)?.submitted ?? 0}명
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 단원별 완료 현황 */}
      <div className="card">
        <h2 className="font-semibold mb-3">📚 단원별 학습 완료 현황</h2>
        <div className="space-y-2">
          {LESSON_TITLES.map((title, i) => {
            const completed = lessonCompletedMap[i + 1] || 0
            const pct = data.studentCount > 0 ? Math.round((completed / data.studentCount) * 100) : 0
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-36 shrink-0 whitespace-nowrap">{i+1}단원 {title}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-16 text-right shrink-0">
                  {completed}/{data.studentCount}명 ({pct}%)
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 수행활동별 평균 점수 */}
      <div className="card">
        <h2 className="font-semibold mb-3">🏆 수행활동별 제출 현황</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="text-left py-2">활동</th>
                <th className="text-center py-2">제출 인원</th>
                <th className="text-center py-2">평균 점수</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY_TITLES.map((title, i) => {
                const stat = data.activityStats.find(s => s.activity_id === i + 1)
                return (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2">{i+1}. {title}</td>
                    <td className="text-center py-2">{stat?.submitted ?? 0}명</td>
                    <td className="text-center py-2">
                      {stat ? (
                        <span className={`font-semibold ${stat.avg_score >= 80 ? 'text-green-600' : stat.avg_score >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                          {Math.round(stat.avg_score)}점
                        </span>
                      ) : '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
