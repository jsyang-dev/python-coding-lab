import { usePyodide } from '../../hooks/usePyodide'
import { PyodideLoader } from '../editor/PyodideLoader'
import { CodeEditor } from '../editor/CodeEditor'
import { MobileEditor } from '../editor/MobileEditor'
import { OutputPanel } from '../editor/OutputPanel'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useState } from 'react'
import type { LessonSection } from '../../content/lessons/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface Props {
  sections: LessonSection[]
}

function TextSection({ content }: { content: string }) {
  return (
    <div className="my-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ children }) => <h2 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
          p: ({ children }) => <p className="my-2 text-gray-800 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return (
                <pre className="bg-gray-900 rounded-lg p-4 my-3 overflow-x-auto">
                  <code className="text-green-300 text-sm font-mono">{children}</code>
                </pre>
              )
            }
            return <code className="bg-gray-100 px-1 rounded text-sm font-mono text-red-700">{children}</code>
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-3">
              <table className="border-collapse text-sm w-full">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
          th: ({ children }) => <th className="border border-gray-300 px-3 py-2 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-gray-300 px-3 py-2">{children}</td>,
          tr: ({ children }) => <tr className="even:bg-gray-50">{children}</tr>,
          ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-gray-800">{children}</li>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-400 pl-4 my-3 text-gray-700 italic">{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

function LiveCodeSection({ section }: { section: LessonSection }) {
  const { ready, loading, loadingProgress, runCode } = usePyodide()
  const isMobile = useIsMobile()
  const [code, setCode] = useState(section.starterCode || '')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [files, setFiles] = useState<Record<string, string>>({})

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('')
    setError('')
    const result = await runCode(code)
    setOutput(result.stdout)
    setError(result.error || '')
    setFiles(result.files || {})
    setIsRunning(false)
  }

  if (loading) return <PyodideLoader progress={loadingProgress} />

  return (
    <div className="my-4 border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-800 text-gray-200 text-xs px-4 py-2 flex items-center justify-between">
        <span>🐍 {section.content}</span>
        <button
          onClick={handleRun}
          disabled={!ready || isRunning}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded"
        >
          {isRunning ? '실행 중...' : '▶ 실행'}
        </button>
      </div>
      {isMobile ? (
        <MobileEditor value={code} onChange={setCode} height="200px" />
      ) : (
        <CodeEditor value={code} onChange={setCode} height="200px" />
      )}
      <OutputPanel output={output} error={error} isRunning={isRunning} files={files} />
    </div>
  )
}

export function LessonContent({ sections }: Props) {
  return (
    <div className="prose max-w-none">
      {sections.map((section, i) => {
        if (section.type === 'text') {
          return <TextSection key={i} content={section.content} />
        }
        if (section.type === 'code') {
          return (
            <div key={i} className="my-4 bg-gray-900 rounded-lg p-4">
              <pre className="text-green-300 text-sm overflow-x-auto">{section.starterCode}</pre>
            </div>
          )
        }
        if (section.type === 'live-code') {
          return <LiveCodeSection key={i} section={section} />
        }
        return null
      })}
    </div>
  )
}
