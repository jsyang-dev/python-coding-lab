import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getLessonById } from '../content/lessons/index'
import { LessonContent } from '../components/lesson/LessonContent'
import { useApi } from '../hooks/useApi'

export function LessonDetail() {
  const { id } = useParams<{ id: string }>()
  const lessonId = parseInt(id || '1')
  const lesson = getLessonById(lessonId)
  const api = useApi()

  useEffect(() => {
    if (lesson) {
      api.put('/api/lessons/' + lessonId + '/progress', { status: 'in_progress' }).catch(() => {})
    }
  }, [lessonId])

  if (!lesson) return <div className="text-red-500">단원을 찾을 수 없습니다.</div>

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{lesson.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{lesson.id}. {lesson.title}</h1>
          <p className="text-gray-500 text-sm">{lesson.description}</p>
        </div>
      </div>

      <LessonContent sections={lesson.sections} />

      <div className="mt-8 flex gap-3">
        <Link to={`/lessons/${lessonId}/quiz`} className="btn-primary">
          📝 퀴즈 풀기
        </Link>
        <Link to={`/lessons/${lessonId}/coding`} className="btn-primary">
          💻 코딩 문제 풀기
        </Link>
        {lessonId < 6 && (
          <Link to={`/lessons/${lessonId + 1}`} className="btn-secondary">
            다음 단원 →
          </Link>
        )}
      </div>
    </div>
  )
}
