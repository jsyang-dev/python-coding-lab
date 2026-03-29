import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

interface Student {
  id: number
  student_id: string
  name: string
  class_name: string
  completed_lessons: number
  completed_activities: number
}

export function StudentList() {
  const api = useApi()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get<{ students: Student[] }>('/api/teacher/students')
      .then(d => setStudents(d.students))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = students.filter(s =>
    s.name.includes(search) ||
    s.student_id.includes(search) ||
    (s.class_name || '').includes(search)
  )

  if (loading) return <div className="text-center py-12 text-gray-400">불러오는 중...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/teacher" className="text-gray-500 hover:text-gray-700 text-sm">← 대시보드</Link>
          <h1 className="text-xl font-bold">👨‍🎓 학생 목록</h1>
          <span className="text-sm text-gray-400">({students.length}명)</span>
        </div>
      </div>

      <input
        type="text"
        placeholder="이름, 학번, 반 검색..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input w-full max-w-xs"
      />

      <div className="card overflow-x-auto">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">
            {students.length === 0 ? '등록된 학생이 없습니다.' : '검색 결과가 없습니다.'}
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-left">
                <th className="py-2 pr-4">학번</th>
                <th className="py-2 pr-4">이름</th>
                <th className="py-2 pr-4">반</th>
                <th className="py-2 pr-4 text-center">학습 완료</th>
                <th className="py-2 pr-4 text-center">활동 제출</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 pr-4 font-mono text-gray-600">{s.student_id}</td>
                  <td className="py-2 pr-4 font-medium">{s.name}</td>
                  <td className="py-2 pr-4 text-gray-500">{s.class_name || '-'}</td>
                  <td className="py-2 pr-4 text-center">
                    <span className={`font-semibold ${s.completed_lessons >= 4 ? 'text-green-600' : s.completed_lessons >= 2 ? 'text-yellow-600' : 'text-gray-400'}`}>
                      {s.completed_lessons}/6
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-center">
                    <span className={`font-semibold ${s.completed_activities >= 4 ? 'text-green-600' : s.completed_activities >= 2 ? 'text-yellow-600' : 'text-gray-400'}`}>
                      {s.completed_activities}/6
                    </span>
                  </td>
                  <td className="py-2">
                    <Link
                      to={`/teacher/students/${s.id}`}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      상세 보기
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
