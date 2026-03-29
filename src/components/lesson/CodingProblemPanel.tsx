import { useState } from 'react'
import { usePyodide } from '../../hooks/usePyodide'
import { useIsMobile } from '../../hooks/useIsMobile'
import { CodeEditor } from '../editor/CodeEditor'
import { MobileEditor } from '../editor/MobileEditor'
import { OutputPanel } from '../editor/OutputPanel'
import { PyodideLoader } from '../editor/PyodideLoader'
import type { CodingProblem } from '../../content/lessons/types'

interface TestResult {
  passed: boolean
  inputs: string[]
  expectedOutput: string
  actualOutput: string
}

interface Props {
  problems: CodingProblem[]
  onSubmit?: (score: number) => void
}

export function CodingProblemPanel({ problems, onSubmit }: Props) {
  const { ready, loading, loadingProgress, runCode } = usePyodide()
  const isMobile = useIsMobile()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [codes, setCodes] = useState<string[]>(problems.map((p) => p.starterCode))
  const [output, setOutput] = useState('')
  const [outputError, setOutputError] = useState('')
  const [files, setFiles] = useState<Record<string, string>>({})
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[] | null>(null)
  const [submitScore, setSubmitScore] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)

  const problem = problems[currentIndex]
  const code = codes[currentIndex]

  const setCode = (val: string) => {
    const next = [...codes]
    next[currentIndex] = val
    setCodes(next)
  }

  const resetState = () => {
    setOutput('')
    setOutputError('')
    setFiles({})
    setTestResults(null)
    setSubmitScore(null)
    setShowHint(false)
  }

  const handleTabChange = (index: number) => {
    setCurrentIndex(index)
    resetState()
  }

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('')
    setOutputError('')
    setFiles({})
    setTestResults(null)

    const result = await runCode(code, [])
    setOutput(result.stdout)
    setOutputError(result.error || '')
    setFiles(result.files || {})
    setIsRunning(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setTestResults(null)
    setSubmitScore(null)

    const results: TestResult[] = []

    for (const tc of problem.testCases) {
      const result = await runCode(code, tc.inputs)
      const actual = (result.stdout || '').trim()
      const expected = tc.expectedOutput.trim()
      results.push({
        passed: actual === expected,
        inputs: tc.inputs,
        expectedOutput: expected,
        actualOutput: result.error ? `오류: ${result.error}` : actual,
      })
    }

    setTestResults(results)

    const passed = results.filter((r) => r.passed).length
    const score = Math.round((passed / results.length) * 100)
    setSubmitScore(score)
    onSubmit?.(score)
    setIsSubmitting(false)
  }

  if (loading) return <PyodideLoader progress={loadingProgress} />

  return (
    <div className="space-y-4">
      {/* 문제 탭 */}
      {problems.length > 1 && (
        <div className="flex gap-2">
          {problems.map((p, i) => (
            <button
              key={p.id}
              onClick={() => handleTabChange(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === currentIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              문제 {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* 문제 설명 */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-2">
          📝 {problem.title}
        </h3>
        <p className="text-sm text-gray-600 whitespace-pre-line">{problem.description}</p>
      </div>

      {/* 입출력 예시 */}
      <div className="card">
        <div className="text-sm font-semibold text-gray-700 mb-2">📋 입출력 예시</div>
        <div className="space-y-2">
          {problem.examples.map((ex, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">입력</div>
                <pre className="bg-gray-900 text-green-300 text-xs p-2 rounded font-mono whitespace-pre-wrap">{ex.input}</pre>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">출력</div>
                <pre className="bg-gray-900 text-green-300 text-xs p-2 rounded font-mono whitespace-pre-wrap">{ex.output}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 코드 편집기 */}
      <div className="card border-l-4 border-l-green-400">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-800 text-gray-200 text-xs px-4 py-2 flex items-center justify-between">
            <span>🐍 Python</span>
            <div className="flex gap-2">
              <button
                onClick={handleRun}
                disabled={!ready || isRunning}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded"
              >
                {isRunning ? '실행 중...' : '▶ 실행'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!ready || isSubmitting || isRunning}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded"
              >
                {isSubmitting ? '채점 중...' : '✅ 제출'}
              </button>
            </div>
          </div>
          {isMobile ? (
            <MobileEditor value={code} onChange={setCode} height="300px" />
          ) : (
            <CodeEditor value={code} onChange={setCode} height="320px" />
          )}
        </div>
      </div>

      {/* 실행 결과 */}
      <OutputPanel output={output} error={outputError} isRunning={isRunning} files={files} />

      {/* 채점 결과 */}
      {testResults && (
        <div className="card">
          <div className="font-semibold text-gray-800 mb-3">
            📊 채점 결과
            {submitScore !== null && (
              <span className={`ml-2 text-lg ${submitScore === 100 ? 'text-green-600' : 'text-orange-500'}`}>
                {submitScore}점
              </span>
            )}
          </div>
          <div className="space-y-2">
            {testResults.map((r, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border text-sm ${
                  r.passed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2 font-medium mb-1">
                  <span>{r.passed ? '✅' : '❌'}</span>
                  <span>테스트 케이스 {i + 1}: {r.passed ? '통과' : '실패'}</span>
                </div>
                {!r.passed && (
                  <div className="text-xs space-y-1 mt-2">
                    <div>
                      <span className="text-gray-500">입력: </span>
                      <code className="bg-gray-100 px-1 rounded">{r.inputs.join(', ')}</code>
                    </div>
                    <div>
                      <span className="text-gray-500">예상 출력: </span>
                      <code className="bg-gray-100 px-1 rounded whitespace-pre-wrap">{r.expectedOutput}</code>
                    </div>
                    <div>
                      <span className="text-gray-500">실제 출력: </span>
                      <code className="bg-gray-100 px-1 rounded whitespace-pre-wrap">{r.actualOutput}</code>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 힌트 */}
      {problem.hint && (
        <div className="card">
          <button
            onClick={() => setShowHint((v) => !v)}
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
          >
            💡 {showHint ? '힌트 숨기기' : '힌트 보기'}
          </button>
          {showHint && (
            <div className="mt-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg whitespace-pre-line">
              {problem.hint}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
