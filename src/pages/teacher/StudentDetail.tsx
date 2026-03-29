import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

interface StudentData {
  user: { id: number; student_id: string; name: string; class_name: string }
  lessonProgress: Array<{ lesson_id: number; status: string; quiz_score: number; completed_at: string }>
  submissions: Array<{ activity_id: number; code: string; stdout: string; score: number; submitted_at: string; is_final: number }>
}

const LESSON_TITLES = ['입출력', '변수/자료형', '조건문', '반복문', '함수', '파일']
const ACTIVITY_TITLES = ['사물함 번호', '재고 관리', '복리이자', 'TTS 메뉴', '가위바위보', '체력 평가']

export function StudentDetail() {
  const { id } = useParams()
  const api = useApi()
  const [data, setData] = useState<StudentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCode, setSelectedCode] = useState<{ title: string; code: string; stdout: string } | null>(null)

  useEffect(() => {
    api.get<StudentData>(`/api/teacher/students/${id}`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-12 text-gray-400">불러오는 중...</div>
  if (!data) return <div className="text-center py-12 text-red-500">학생 정보를 불러올 수 없습니다.</div>

  const { user, lessonProgress, submissions } = data
  const finalSubmissions = submissions.filter(s => s.is_final === 1)

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/teacher/students" className="text-gray-500 hover:text-gray-700 text-sm">← 목록</Link>
        <h1 className="text-xl font-bold">{user.name} 학생</h1>
        <span className="text-sm text-gray-500">{user.class_name} | 학번: {user.student_id}</span>
      </div>

      {/* 진도 요약 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {lessonProgress.filter(l => l.status === 'completed').length} / 6
          </div>
          <div className="text-sm text-gray-500">단원 학습 완료</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {finalSubmissions.length} / 6
          </div>
          <div className="text-sm text-gray-500">수행활동 제출</div>
        </div>
      </div>

      {/* 단원 학습 현황 */}
      <div className="card">
        <h2 className="font-semibold mb-3">📚 단원 학습 현황</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LESSON_TITLES.map((title, i) => {
            const lp = lessonProgress.find(l => l.lesson_id === i + 1)
            return (
              <div key={i} className={`p-3 rounded-lg border text-sm ${lp?.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="font-medium">{i+1}. {title}</div>
                <div className={`text-xs mt-0.5 ${lp?.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                  {lp?.status === 'completed' ? `✅ 완료 (퀴즈 ${lp.quiz_score}점)` : '미완료'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 수행활동 제출 현황 */}
      <div className="card">
        <h2 className="font-semibold mb-3">🏆 수행활동 제출 현황</h2>
        <div className="space-y-2">
          {ACTIVITY_TITLES.map((title, i) => {
            const sub = finalSubmissions.find(s => s.activity_id === i + 1)
            return (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                <div>
                  <span className="font-medium text-sm">{i+1}. {title}</span>
                  {sub && (
                    <span className="ml-2 text-xs text-gray-400">
                      {new Date(sub.submitted_at).toLocaleDateString('ko-KR')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {sub ? (
                    <>
                      <span className={`text-sm font-bold ${sub.score >= 80 ? 'text-green-600' : sub.score >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                        {sub.score}점
                      </span>
                      <button
                        onClick={() => setSelectedCode({ title, code: sub.code, stdout: sub.stdout })}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        코드 보기
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">미제출</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 코드 모달 */}
      {selectedCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold">{selectedCode.title} - 제출 코드</h3>
              <button onClick={() => setSelectedCode(null)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">코드</div>
                <pre className="bg-gray-900 text-green-300 p-3 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                  {selectedCode.code}
                </pre>
              </div>
              {selectedCode.stdout && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">실행 결과</div>
                  <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {selectedCode.stdout}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
