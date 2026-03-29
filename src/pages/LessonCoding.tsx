import { useParams, useNavigate } from 'react-router-dom'
import { getLessonById } from '../content/lessons/index'
import { CodingProblemPanel } from '../components/lesson/CodingProblemPanel'
import { useApi } from '../hooks/useApi'

export function LessonCoding() {
  const { id } = useParams<{ id: string }>()
  const lessonId = parseInt(id || '1')
  const lesson = getLessonById(lessonId)
  const api = useApi()
  const navigate = useNavigate()

  if (!lesson) return <div>단원을 찾을 수 없습니다.</div>

  if (!lesson.codingProblems || lesson.codingProblems.length === 0) {
    return <div>이 단원에는 코딩 문제가 없습니다.</div>
  }

  const handleSubmit = async (score: number) => {
    await api.post('/api/lessons/' + lessonId + '/coding', { score }).catch(() => {})
    setTimeout(() => navigate('/lessons'), 2000)
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">
        {lesson.icon} {lesson.title} - 코딩 문제
      </h1>
      <p className="text-gray-500 mb-6">{lesson.codingProblems.length}문제</p>
      <CodingProblemPanel problems={lesson.codingProblems} onSubmit={handleSubmit} />
    </div>
  )
}
