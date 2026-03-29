import type { GradeResult } from '../../lib/grader'

interface Props {
  result: GradeResult
}

export function TestResults({ result }: Props) {
  const { score, testResults } = result

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className={`text-3xl font-bold ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
          {score}점
        </div>
        <div className="text-sm text-gray-500">
          {testResults.filter(r => r.passed).length} / {testResults.length} 통과
        </div>
        {score >= 80 && <span className="text-2xl">🎉</span>}
      </div>

      <div className="space-y-2">
        {testResults.map((r) => (
          <div
            key={r.id}
            className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
              r.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <span className="text-lg shrink-0">{r.passed ? '✅' : '❌'}</span>
            <div>
              <div className="font-medium text-gray-800">{r.description}</div>
              <div className={`text-xs mt-0.5 ${r.passed ? 'text-green-700' : 'text-red-700'}`}>
                {r.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
