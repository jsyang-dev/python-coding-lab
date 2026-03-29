import Editor from '@monaco-editor/react'

interface Props {
  value: string
  onChange: (value: string) => void
  height?: string
  readOnly?: boolean
}

export function CodeEditor({ value, onChange, height = '300px', readOnly = false }: Props) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height={height}
        language="python"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v || '')}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          minimap: { enabled: false },
          lineNumbers: 'on',
          tabSize: 4,
          insertSpaces: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly,
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  )
}
