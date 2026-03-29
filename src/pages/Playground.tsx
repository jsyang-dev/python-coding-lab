import { useState } from 'react'
import { usePyodide } from '../hooks/usePyodide'
import { useIsMobile } from '../hooks/useIsMobile'
import { CodeEditor } from '../components/editor/CodeEditor'
import { MobileEditor } from '../components/editor/MobileEditor'
import { OutputPanel } from '../components/editor/OutputPanel'
import { PyodideLoader } from '../components/editor/PyodideLoader'

const STARTER = `# 파이썬 놀이터 - 자유롭게 코딩해보세요!
print("안녕하세요, 파이썬!")

# 변수와 연산
name = input("이름을 입력하세요: ")
print(f"반갑습니다, {name}님!")
`

export function Playground() {
  const { ready, loading, loadingProgress, runCode } = usePyodide()
  const isMobile = useIsMobile()
  const [code, setCode] = useState(STARTER)
  const [inputs, setInputs] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [files, setFiles] = useState<Record<string, string>>({})
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('')
    setError('')
    const inputList = inputs.split('\n').map(s => s.trim()).filter(Boolean)
    const result = await runCode(code, inputList)
    setOutput(result.stdout)
    setError(result.error || '')
    setFiles(result.files || {})
    setIsRunning(false)
  }

  const handleReset = () => {
    setCode(STARTER)
    setInputs('')
    setOutput('')
    setError('')
    setFiles({})
  }

  if (loading) return <PyodideLoader progress={loadingProgress} />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🎮 파이썬 놀이터</h1>
        <button onClick={handleReset} className="btn btn-secondary text-sm">초기화</button>
      </div>
      <p className="text-gray-500 text-sm">자유롭게 파이썬 코드를 작성하고 실행해보세요.</p>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-800 text-gray-200 text-xs px-4 py-2 flex items-center justify-between">
          <span>🐍 Python</span>
          <button
            onClick={handleRun}
            disabled={!ready || isRunning}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded"
          >
            {isRunning ? '실행 중...' : '▶ 실행 (Ctrl+Enter)'}
          </button>
        </div>
        {isMobile ? (
          <MobileEditor value={code} onChange={setCode} height="400px" />
        ) : (
          <CodeEditor value={code} onChange={setCode} height="450px" />
        )}
      </div>

      {/* 입력값 */}
      <div className="card">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          📥 입력값 <span className="text-xs text-gray-400">(input()을 사용한다면 한 줄에 하나씩)</span>
        </label>
        <textarea
          value={inputs}
          onChange={(e) => setInputs(e.target.value)}
          placeholder="예:\n홍길동&#10;20"
          rows={3}
          className="input w-full font-mono text-sm resize-none"
        />
      </div>

      <OutputPanel output={output} error={error} isRunning={isRunning} files={files} />
    </div>
  )
}
