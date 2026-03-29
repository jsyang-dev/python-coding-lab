import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Layout } from './components/layout/Layout'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { LessonList } from './pages/LessonList'
import { LessonDetail } from './pages/LessonDetail'
import { LessonQuiz } from './pages/LessonQuiz'
import { LessonCoding } from './pages/LessonCoding'
import { ActivityList } from './pages/ActivityList'
import { ActivityDetail } from './pages/ActivityDetail'
import { Playground } from './pages/Playground'
import { TeacherDashboard } from './pages/teacher/TeacherDashboard'
import { StudentList } from './pages/teacher/StudentList'
import { StudentDetail } from './pages/teacher/StudentDetail'
import { ActivitySubmissions } from './pages/teacher/ActivitySubmissions'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function TeacherRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.role !== 'teacher') return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<LessonList />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/lessons/:id/quiz" element={<LessonQuiz />} />
          <Route path="/lessons/:id/coding" element={<LessonCoding />} />
          <Route path="/activities" element={<ActivityList />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/playground" element={<Playground />} />

          <Route path="/teacher" element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
          <Route path="/teacher/students" element={<TeacherRoute><StudentList /></TeacherRoute>} />
          <Route path="/teacher/students/:id" element={<TeacherRoute><StudentDetail /></TeacherRoute>} />
          <Route path="/teacher/activities/:id" element={<TeacherRoute><ActivitySubmissions /></TeacherRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
