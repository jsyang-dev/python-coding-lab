import { Link } from 'react-router-dom'
import { activities } from '../content/activities/index'

export function ActivityList() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">수행활동</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activities.map((a) => (
          <Link key={a.id} to={`/activities/${a.id}`} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{a.icon}</div>
              <div className="flex-1">
                <div className="font-semibold">{a.id}. {a.title}</div>
                <div className="text-sm text-gray-500 mt-0.5 line-clamp-1">{a.description.split('\n')[0]}</div>
                <div className="flex gap-1 mt-1.5">
                  {a.relatedLessons.map(l => (
                    <span key={l} className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">단원 {l}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
