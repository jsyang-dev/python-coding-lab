import { useState } from 'react'
import { usePyodide } from '../../hooks/usePyodide'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useApi } from '../../hooks/useApi'
import { CodeEditor } from '../editor/CodeEditor'
import { MobileEditor } from '../editor/MobileEditor'
import { OutputPanel } from '../editor/OutputPanel'
import { PyodideLoader } from '../editor/PyodideLoader'
import { StepGuide } from './StepGuide'
import { TestResults } from './TestResults'
import { gradeActivity } from '../../lib/grader'
import type { ActivityData } from '../../content/activities/types'
import type { GradeResult } from '../../lib/grader'

interface Props {
  activity: ActivityData
  onSubmit?: (score: number) => void
}

export function ActivityEditor({ activity, onSubmit }: Props) {
  const { ready, loading, loadingProgress, runCode } = usePyodide()
  const isMobile = useIsMobile()
  const api = useApi()

  const [code, setCode] = useState(activity.starterCode)
  const [section1Text, setSection1Text] = useState('')
  const [section2Text, setSection2Text] = useState('')
  const [output, setOutput] = useState('')
  const [outputError, setOutputError] = useState('')
  const [files, setFiles] = useState<Record<string, string>>({})
  const [isRunning, setIsRunning] = useState(false)
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMsg, setSubmitMsg] = useState('')
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)

  const firstTC = activity.testCases[0]
  const [inputs, setInputs] = useState<string[]>(firstTC?.inputs || [])

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('')
    setOutputError('')
    setGradeResult(null)

    const result = await runCode(code, inputs)
    setOutput(result.stdout)
    setOutputError(result.error || '')
    setFiles(result.files || {})

    const grade = gradeActivity(activity, result.stdout, result.files)
    setGradeResult(grade)
    setIsRunning(false)
  }

  const handleSubmit = async () => {
    if (!gradeResult) {
      alert('먼저 ③번 코드를 실행하세요.')
      return
    }
    if (section1Text.trim().length < 5) {
      alert('① 해결해야 할 문제를 기록해 주세요.')
      return
    }
    if (section2Text.trim().length < 5) {
      alert('② 문제 해결에 필요한 핵심 기능을 기록해 주세요.')
      return
    }

    setIsSubmitting(true)
    setSubmitMsg('')

    // 섹션 1, 2 내용을 코드 주석으로 포함하여 제출
    const submittedCode = `# ===== 수행활동 답안 =====
# [①해결해야 할 문제]
# ${section1Text.replace(/\n/g, '\n# ')}
#
# [②핵심 기능]
# ${section2Text.replace(/\n/g, '\n# ')}
# =======================

${code}`

    try {
      await api.post(`/api/activities/${activity.id}/submit`, {
        code: submittedCode,
        stdout: output,
        score: gradeResult.score,
        testResults: JSON.stringify(gradeResult.testResults),
        executionTimeMs: 0,
        isFinal: true,
      })
      setSubmitMsg(`제출 완료! ${gradeResult.score}점`)
      setAlreadySubmitted(true)
      onSubmit?.(gradeResult.score)
    } catch (err: any) {
      if (err.message?.includes('이미')) {
        setAlreadySubmitted(true)
        setSubmitMsg('이미 최종 제출되었습니다.')
      } else {
        setSubmitMsg(`제출 실패: ${err.message}`)
      }
    }
    setIsSubmitting(false)
  }

  if (loading) return <PyodideLoader progress={loadingProgress} />

  const section1Filled = section1Text.trim().length >= 5
  const section2Filled = section2Text.trim().length >= 5

  return (
    <div className="space-y-4">

      {/* 활동 목표 */}
      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
        <span className="text-blue-500 text-sm">🎯</span>
        <span className="text-sm text-blue-700 font-medium">활동 목표:</span>
        <span className="text-sm text-blue-600">{activity.objective}</span>
      </div>

      {/* 실행 결과 목표 */}
      <div className="card">
        <div className="text-sm font-semibold text-gray-700 mb-2">📋 실행 결과 (목표)</div>
        <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
          {activity.targetOutput}
        </pre>
      </div>

      {/* 섹션 1: 해결해야 할 문제 */}
      <div className="card border-l-4 border-l-orange-400">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-gray-700">
            ① 해결해야 할 문제를 기록해 보자.
          </div>
          {section1Filled && (
            <span className="text-xs text-green-600 font-medium">✓ 기록됨</span>
          )}
        </div>
        <textarea
          value={section1Text}
          onChange={(e) => setSection1Text(e.target.value)}
          placeholder="이 프로그램이 해결해야 할 문제가 무엇인지 자신의 말로 설명해 보세요."
          className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 bg-orange-50 placeholder-gray-400"
          rows={3}
        />
      </div>

      {/* 섹션 2: 핵심 기능 */}
      <div className="card border-l-4 border-l-purple-400">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-gray-700">
            ② 문제 해결에 필요한 핵심 기능을 기록해 보자.
          </div>
          {section2Filled && (
            <span className="text-xs text-green-600 font-medium">✓ 기록됨</span>
          )}
        </div>
        <textarea
          value={section2Text}
          onChange={(e) => setSection2Text(e.target.value)}
          placeholder="프로그램 작성에 필요한 Python 기능이나 함수를 기록해 보세요. (예: input(), print(), for 반복문 등)"
          className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50 placeholder-gray-400"
          rows={3}
        />
      </div>

      {/* 섹션 3: 코드 편집기 */}
      <div className="card border-l-4 border-l-green-400">
        <div className="text-sm font-semibold text-gray-700 mb-2">
          ③ 빈칸을 채워 프로그램을 완성해 보자.
        </div>

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
                disabled={isSubmitting || alreadySubmitted || !gradeResult}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded"
              >
                {alreadySubmitted ? '제출됨' : isSubmitting ? '제출 중...' : '📤 제출'}
              </button>
            </div>
          </div>
          {isMobile ? (
            <MobileEditor value={code} onChange={setCode} height="300px" />
          ) : (
            <CodeEditor value={code} onChange={setCode} height="360px" />
          )}
        </div>

        {/* 입력값 설정 */}
        {firstTC && firstTC.inputs.length > 0 && (
          <div className="mt-3">
            <div className="text-xs font-semibold text-gray-600 mb-1">
              📥 테스트 입력값 <span className="text-gray-400 font-normal">(input() 순서대로)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {inputs.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  value={val}
                  onChange={(e) => {
                    const next = [...inputs]
                    next[i] = e.target.value
                    setInputs(next)
                  }}
                  placeholder={`입력 ${i + 1}`}
                  className="input w-28 text-sm"
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">예시: {firstTC.description}</p>
          </div>
        )}
      </div>

      {/* 출력 결과 */}
      <OutputPanel output={output} error={outputError} isRunning={isRunning} files={files} />

      {/* 채점 결과 */}
      {gradeResult && (
        <div className="card">
          <div className="font-semibold text-gray-800 mb-3">📊 채점 결과</div>
          <TestResults result={gradeResult} />
          {submitMsg && (
            <div className={`mt-3 text-sm font-medium ${submitMsg.includes('완료') ? 'text-green-600' : 'text-red-500'}`}>
              {submitMsg}
            </div>
          )}
          {!alreadySubmitted && gradeResult && (
            <div className="mt-3 text-xs text-gray-500 space-y-0.5">
              {!section1Filled && <p>⚠️ ①번 문제 기록 후 제출 가능합니다.</p>}
              {!section2Filled && <p>⚠️ ②번 핵심 기능 기록 후 제출 가능합니다.</p>}
            </div>
          )}
        </div>
      )}

      {/* 힌트 */}
      <StepGuide hints={activity.hints} />
    </div>
  )
}
