import { useRef } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  height?: string
}

export function MobileEditor({ value, onChange, height = '300px' }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newValue = value.substring(0, start) + '    ' + value.substring(end)
      onChange(newValue)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 4
          textareaRef.current.selectionEnd = start + 4
        }
      }, 0)
    }
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ height, lineHeight: '1.6', fontSize: '14px' }}
      spellCheck={false}
      autoCapitalize="none"
      autoCorrect="off"
      placeholder="# 파이썬 코드를 입력하세요"
    />
  )
}
