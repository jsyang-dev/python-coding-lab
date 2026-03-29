import { NavLink } from 'react-router-dom'
import { activities } from '../../content/activities'
import { lessons } from '../../content/lessons'

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 p-4 hidden lg:block">
      <nav className="space-y-6">
        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">단원 학습</h3>
          <ul className="space-y-1">
            {lessons.map((l) => (
              <li key={l.id}>
                <NavLink
                  to={`/lessons/${l.id}`}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  {l.id}. {l.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">수행활동</h3>
          <ul className="space-y-1">
            {activities.map((a) => (
              <li key={a.id}>
                <NavLink
                  to={`/activities/${a.id}`}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  {a.id}. {a.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </nav>
    </aside>
  )
}
