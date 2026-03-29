import { useParams, Link } from 'react-router-dom'
import { getActivityById } from '../content/activities'
import { ActivityEditor } from '../components/activity/ActivityEditor'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export function ActivityDetail() {
  const { id } = useParams()
  const activityId = parseInt(id || '1')
  const activity = getActivityById(activityId)
  const [submitted, setSubmitted] = useState(false)

  if (!activity) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">수행활동을 찾을 수 없습니다.</p>
        <Link to="/activities" className="btn btn-primary mt-4">목록으로</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-w-4xl">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <Link to="/activities" className="text-gray-500 hover:text-gray-700 text-sm">← 목록</Link>
        <span className="text-gray-300">|</span>
        <span className="text-2xl">{activity.icon}</span>
        <h1 className="text-xl font-bold text-gray-900">{activity.title}</h1>
        {submitted && <span className="ml-auto text-green-600 text-sm font-medium">✅ 제출 완료</span>}
      </div>

      {/* 과제 설명 */}
      <div className="card">
        <h2 className="font-semibold text-gray-800 mb-2">📋 과제 설명</h2>
        <div className="text-sm text-gray-700 leading-relaxed">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              table: ({ children }) => (
                <div className="overflow-x-auto my-2">
                  <table className="border-collapse w-full text-xs">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-center font-semibold">{children}</th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 px-2 py-1 text-center">{children}</td>
              ),
              p: ({ children }) => <p className="my-1">{children}</p>,
              strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
            }}
          >
            {activity.description}
          </ReactMarkdown>
        </div>
      </div>

      {/* 에디터 */}
      <ActivityEditor
        key={activity.id}
        activity={activity}
        onSubmit={(score) => {
          if (score >= 0) setSubmitted(true)
        }}
      />
    </div>
  )
}
