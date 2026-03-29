import { useState } from 'react'

interface Props {
  hints: string[]
}

export function StepGuide({ hints }: Props) {
  const [revealed, setRevealed] = useState<number[]>([])
  const [open, setOpen] = useState(false)

  const revealHint = (i: number) => {
    if (!revealed.includes(i)) setRevealed([...revealed, i])
  }

  return (
    <div className="border border-yellow-200 rounded-xl bg-yellow-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-semibold text-yellow-800">💡 힌트 ({hints.length}개)</span>
        <span className="text-yellow-600">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-2">
          {hints.map((hint, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold shrink-0">힌트 {i + 1}.</span>
              {revealed.includes(i) ? (
                <span className="text-gray-800 text-sm">{hint}</span>
              ) : (
                <button
                  onClick={() => revealHint(i)}
                  className="text-sm text-yellow-700 underline hover:text-yellow-900"
                >
                  클릭하여 힌트 보기
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
