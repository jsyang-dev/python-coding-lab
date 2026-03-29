export interface LessonSection {
  type: 'text' | 'code' | 'live-code'
  content: string
  starterCode?: string
  language?: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface CodingProblem {
  id: number
  title: string
  description: string
  examples: Array<{ input: string; output: string }>
  starterCode: string
  testCases: Array<{ inputs: string[]; expectedOutput: string }>
  hint?: string
}

export interface LessonData {
  id: number
  title: string
  icon: string
  description: string
  sections: LessonSection[]
  quiz: QuizQuestion[]
  codingProblems: CodingProblem[]
}
