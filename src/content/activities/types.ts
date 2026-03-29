export interface TestCase {
  id: number
  description: string
  inputs: string[]
  expectedOutput?: string
  tolerance?: number
}

export interface ActivityData {
  id: number
  title: string
  icon: string
  objective: string        // 활동 목표
  description: string      // 수행활동 문제 설명
  targetOutput: string     // 실행 결과 (목표 출력값 표시)
  relatedLessons: number[]
  starterCode: string
  hints: string[]
  testCases: TestCase[]
  gradingType: 'io-match' | 'dict-state' | 'numeric-range' | 'tts' | 'scenario' | 'file-io'
}
