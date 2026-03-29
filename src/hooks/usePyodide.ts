import { useEffect, useRef, useState, useCallback } from 'react'
import { translatePythonError } from '../lib/errorMessages'

interface RunResult {
  stdout: string
  error?: string
  elapsed?: number
  files?: Record<string, string>
}

export function usePyodide() {
  const workerRef = useRef<Worker | null>(null)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const initWorker = useCallback(() => {
    if (workerRef.current) return

    setLoading(true)
    setLoadingProgress(0)

    const worker = new Worker(
      new URL('../components/editor/PyodideWorker.ts', import.meta.url),
      { type: 'module' }
    )

    worker.onmessage = (e) => {
      const { type, percent } = e.data
      if (type === 'ready') {
        setReady(true)
        setLoading(false)
        setLoadingProgress(100)
      } else if (type === 'progress') {
        setLoadingProgress(percent || 0)
      }
    }

    worker.onerror = (e) => {
      setError('Pyodide 로딩 실패: ' + e.message)
      setLoading(false)
    }

    workerRef.current = worker
    worker.postMessage({ type: 'init' })
  }, [])

  // 로그인 후 자동 prefetch
  useEffect(() => {
    initWorker()
    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
  }, [initWorker])

  const runCode = useCallback((code: string, inputs: string[] = []): Promise<RunResult> => {
    return new Promise((resolve) => {
      if (!workerRef.current) {
        resolve({ stdout: '', error: 'Python 환경이 준비되지 않았습니다.' })
        return
      }

      let stdout = ''
      const timeoutId = setTimeout(() => {
        resolve({ stdout, error: 'TimeoutError: 실행 시간 초과 (10초)' })
      }, 10000)

      const handler = (e: MessageEvent) => {
        const { type, text, error, elapsed, files } = e.data
        if (type === 'speak' && typeof window !== 'undefined' && window.speechSynthesis) {
          const utt = new SpeechSynthesisUtterance(text)
          utt.lang = 'ko-KR'
          window.speechSynthesis.speak(utt)
        } else if (type === 'stdout' || type === 'stderr') {
          stdout += text + '\n'
        } else if (type === 'done') {
          clearTimeout(timeoutId)
          workerRef.current?.removeEventListener('message', handler)
          resolve({ stdout: stdout.trim(), elapsed, files })
        } else if (type === 'error') {
          clearTimeout(timeoutId)
          workerRef.current?.removeEventListener('message', handler)
          resolve({ stdout: stdout.trim(), error: translatePythonError(error) })
        }
      }

      workerRef.current.addEventListener('message', handler)
      workerRef.current.postMessage({ type: 'run', code, inputs })
    })
  }, [])

  return { ready, loading, loadingProgress, error, runCode, initWorker }
}
