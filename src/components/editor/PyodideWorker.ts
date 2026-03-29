// Web Worker: Pyodide Python 실행 환경

declare const self: DedicatedWorkerGlobalScope

let pyodide: any = null

async function initPyodide() {
  // ES 모듈 워커에서는 dynamic import 사용
  // @ts-ignore
  const { loadPyodide } = await import('https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.mjs')
  self.postMessage({ type: 'progress', percent: 10 })

  pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/',
    stdout: (text: string) => {
      if (text.startsWith('\x00SPEAK\x00')) {
        self.postMessage({ type: 'speak', text: text.slice(8) })
      } else {
        self.postMessage({ type: 'stdout', text })
      }
    },
    stderr: (text: string) => {
      self.postMessage({ type: 'stderr', text })
    },
  })
  self.postMessage({ type: 'progress', percent: 80 })

  // input() 시뮬레이션 + speak() TTS 함수 주입
  pyodide.globals.set('_input_queue', pyodide.toPy([]))
  await pyodide.runPythonAsync(`
import sys
import builtins

_input_index = 0
_input_list = []

def _custom_input(prompt=''):
    global _input_index, _input_list
    if prompt:
        print(prompt, end='')
    if _input_index < len(_input_list):
        val = _input_list[_input_index]
        _input_index += 1
        print(val)
        return val
    return ''

def speak(text):
    # 특수 접두사로 TTS 메시지를 메인 스레드로 전달
    print('\\x00SPEAK\\x00' + str(text))

builtins.input = _custom_input
builtins.speak = speak
  `)

  self.postMessage({ type: 'ready' })
}

self.onmessage = async (e: MessageEvent) => {
  const { type, code, inputs } = e.data

  if (type === 'init') {
    await initPyodide()
    return
  }

  if (type === 'run') {
    if (!pyodide) {
      self.postMessage({ type: 'error', error: 'Pyodide가 아직 초기화되지 않았습니다.' })
      return
    }

    try {
      // 입력값 설정
      const inputList = inputs || []
      await pyodide.runPythonAsync(`
_input_index = 0
_input_list = ${JSON.stringify(inputList)}
      `)

      // 파일시스템 초기화 (수행활동 6용)
      try {
        pyodide.FS.mkdir('/workspace')
      } catch {}

      const startTime = Date.now()
      await pyodide.runPythonAsync(code)
      const elapsed = Date.now() - startTime

      // 가상 파일시스템에 생성된 파일 확인
      let files: Record<string, string> = {}
      try {
        const entries = pyodide.FS.readdir('/workspace')
        for (const entry of entries) {
          if (entry !== '.' && entry !== '..') {
            const content = new TextDecoder().decode(
              pyodide.FS.readFile(`/workspace/${entry}`)
            )
            files[entry] = content
          }
        }
      } catch {}

      self.postMessage({ type: 'done', elapsed, files })
    } catch (err: any) {
      self.postMessage({ type: 'error', error: err.message || String(err) })
    }
  }
}
