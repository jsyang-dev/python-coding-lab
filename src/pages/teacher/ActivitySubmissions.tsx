import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

interface Submission {
  student_id: string
  name: string
  class_name: string
  code: string
  stdout: string
  score: number
  submitted_at: string
  is_final: number
}

const ACTIVITY_TITLES = ['사물함 번호', '재고 관리', '복리이자', 'TTS 메뉴', '가위바위보', '체력 평가']

export function ActivitySubmissions() {
  const { id } = useParams()
  const activityId = parseInt(id || '1')
  const api = useApi()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCode, setSelectedCode] = useState<Submission | null>(null)

  useEffect(() => {
    api.get<{ submissions: Submission[] }>(`/api/teacher/activities/${activityId}/submissions`)
      .then(d => setSubmissions(d.submissions))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [activityId])

  const finals = submissions.filter(s => s.is_final === 1)
  const avgScore = finals.length > 0
    ? Math.round(finals.reduce((a, s) => a + s.score, 0) / finals.length)
    : 0

  if (loading) return <div className="text-center py-12 text-gray-400">불러오는 중...</div>

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/teacher" className="text-gray-500 hover:text-gray-700 text-sm">← 대시보드</Link>
        <h1 className="text-xl font-bold">
          수행활동 {activityId}: {ACTIVITY_TITLES[activityId - 1]}
        </h1>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{finals.length}</div>
          <div className="text-sm text-gray-500">최종 제출</div>
        </div>
        <div className="card text-center">
          <div className={`text-2xl font-bold ${avgScore >= 80 ? 'text-green-600' : avgScore >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
            {avgScore}점
          </div>
          <div className="text-sm text-gray-500">평균 점수</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {finals.filter(s => s.score >= 80).length}
          </div>
          <div className="text-sm text-gray-500">80점 이상</div>
        </div>
      </div>

      {/* 제출 목록 */}
      <div className="card">
        <h2 className="font-semibold mb-3">📋 제출 현황 ({finals.length}명)</h2>
        {finals.length === 0 ? (
          <p className="text-gray-400 text-sm">아직 제출한 학생이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500 text-left">
                  <th className="py-2 pr-4">학번</th>
                  <th className="py-2 pr-4">이름</th>
                  <th className="py-2 pr-4">반</th>
                  <th className="py-2 pr-4 text-center">점수</th>
                  <th className="py-2 pr-4">제출일</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {finals
                  .sort((a, b) => b.score - a.score)
                  .map((s, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2 pr-4 font-mono">{s.student_id}</td>
                      <td className="py-2 pr-4">{s.name}</td>
                      <td className="py-2 pr-4 text-gray-500">{s.class_name || '-'}</td>
                      <td className="py-2 pr-4 text-center">
                        <span className={`font-bold ${s.score >= 80 ? 'text-green-600' : s.score >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                          {s.score}점
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-gray-500 text-xs">
                        {new Date(s.submitted_at).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => setSelectedCode(s)}
                          className="text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          코드 보기
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 코드 모달 */}
      {selectedCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold">{selectedCode.name} ({selectedCode.student_id})</h3>
              <button onClick={() => setSelectedCode(null)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2 text-sm">
                <span className={`px-2 py-0.5 rounded font-bold ${selectedCode.score >= 80 ? 'bg-green-100 text-green-700' : selectedCode.score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {selectedCode.score}점
                </span>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">제출 코드</div>
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
