import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'
import { lessons } from '../content/lessons/index'

export function LessonList() {
  const api = useApi()
  const [progress, setProgress] = useState<Record<number, { status: string; quiz_score: number }>>({})

  useEffect(() => {
    api.get<{ progress: Array<{ lesson_id: number; status: string; quiz_score: number }> }>('/api/lessons/progress')
      .then(d => {
        const map: Record<number, { status: string; quiz_score: number }> = {}
        d.progress.forEach(p => { map[p.lesson_id] = { status: p.status, quiz_score: p.quiz_score } })
        setProgress(map)
      })
      .catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">단원 학습</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map(lesson => {
          const p = progress[lesson.id]
          const status = p?.status || 'not_started'
          return (
            <Link key={lesson.id} to={`/lessons/${lesson.id}`}
              className="card hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="text-4xl">{lesson.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{lesson.id}. {lesson.title}</div>
                <div className="text-sm text-gray-500 mt-1">{lesson.description}</div>
                <div className="mt-2">
                  {status === 'completed'
                    ? <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ 완료 ({p?.quiz_score}점)</span>
                    : status === 'in_progress'
                    ? <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">학습 중</span>
                    : <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">미시작</span>}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
