import { create } from 'zustand'

interface EditorState {
  code: string
  output: string
  isRunning: boolean
  setCode: (code: string) => void
  setOutput: (output: string) => void
  setIsRunning: (v: boolean) => void
  reset: () => void
}

export const useEditorStore = create<EditorState>((set) => ({
  code: '',
  output: '',
  isRunning: false,
  setCode: (code) => set({ code }),
  setOutput: (output) => set({ output }),
  setIsRunning: (isRunning) => set({ isRunning }),
  reset: () => set({ code: '', output: '', isRunning: false }),
}))
