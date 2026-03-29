interface Props {
  output: string
  error?: string
  isRunning?: boolean
  files?: Record<string, string>
}

export function OutputPanel({ output, error, isRunning, files }: Props) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 min-h-[120px] font-mono text-sm">
      <div className="text-gray-400 text-xs mb-2 flex items-center gap-2">
        <span>실행 결과</span>
        {isRunning && <span className="animate-pulse text-blue-400">● 실행 중...</span>}
      </div>

      {isRunning ? (
        <div className="text-gray-400 animate-pulse">Python 코드 실행 중...</div>
      ) : error ? (
        <div className="text-red-400 whitespace-pre-wrap">{error}</div>
      ) : output ? (
        <pre className="text-green-300 whitespace-pre-wrap overflow-auto">{output}</pre>
      ) : (
        <div className="text-gray-600">코드를 실행하면 결과가 여기에 표시됩니다.</div>
      )}

      {files && Object.keys(files).length > 0 && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <div className="text-gray-400 text-xs mb-2">생성된 파일:</div>
          {Object.entries(files).map(([name, content]) => (
            <div key={name} className="mb-3">
              <div className="text-yellow-400 text-xs mb-1">📄 {name}</div>
              <pre className="text-gray-300 text-xs whitespace-pre-wrap bg-gray-800 p-2 rounded">{content}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
