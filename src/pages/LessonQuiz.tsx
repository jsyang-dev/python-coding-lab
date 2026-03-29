import { useParams, useNavigate } from 'react-router-dom'
import { getLessonById } from '../content/lessons/index'
import { QuizForm } from '../components/lesson/QuizForm'
import { useApi } from '../hooks/useApi'

export function LessonQuiz() {
  const { id } = useParams<{ id: string }>()
  const lessonId = parseInt(id || '1')
  const lesson = getLessonById(lessonId)
  const api = useApi()
  const navigate = useNavigate()

  if (!lesson) return <div>단원을 찾을 수 없습니다.</div>

  const handleSubmit = async (score: number) => {
    await api.post('/api/lessons/' + lessonId + '/quiz', { score }).catch(() => {})
    setTimeout(() => navigate('/lessons'), 2000)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">{lesson.icon} {lesson.title} - 퀴즈</h1>
      <p className="text-gray-500 mb-6">{lesson.quiz.length}문항</p>
      <QuizForm questions={lesson.quiz} onSubmit={handleSubmit} />
    </div>
  )
}
