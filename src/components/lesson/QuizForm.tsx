import { useState } from 'react'
import type { QuizQuestion } from '../../content/lessons/types'

interface Props {
  questions: QuizQuestion[]
  onSubmit: (score: number) => void
}

export function QuizForm({ questions, onSubmit }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleSubmit = () => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.answer) correct++
    })
    const finalScore = Math.round((correct / questions.length) * 100)
    setScore(finalScore)
    setSubmitted(true)
    onSubmit(finalScore)
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div key={q.id} className="card">
          <p className="font-medium mb-3">{qi + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[q.id] === oi
              const isCorrect = submitted && oi === q.answer
              const isWrong = submitted && selected && oi !== q.answer
              return (
                <label
                  key={oi}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors
                    ${isCorrect ? 'bg-green-50 border-green-300' :
                      isWrong ? 'bg-red-50 border-red-300' :
                      selected ? 'bg-blue-50 border-blue-300' :
                      'border-gray-200 hover:bg-gray-50'}`}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    disabled={submitted}
                    checked={selected}
                    onChange={() => setAnswers(a => ({ ...a, [q.id]: oi }))}
                    className="text-blue-600"
                  />
                  <span className="text-sm">{opt}</span>
                  {isCorrect && <span className="ml-auto text-green-600">✓</span>}
                  {isWrong && <span className="ml-auto text-red-600">✗</span>}
                </label>
              )
            })}
          </div>
          {submitted && (
            <div className="mt-3 text-sm bg-blue-50 text-blue-800 p-3 rounded-lg">
              💡 {q.explanation}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className="btn-primary w-full py-3"
        >
          퀴즈 제출하기
        </button>
      ) : (
        <div className={`card text-center text-lg font-bold
          ${score >= 80 ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
          {score >= 80 ? '🎉 ' : '📚 '}점수: {score}점 {score >= 80 ? '(통과!)' : '(다시 도전!)'}
        </div>
      )}
    </div>
  )
}
