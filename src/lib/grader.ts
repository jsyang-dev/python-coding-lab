import type { ActivityData } from '../content/activities/types'

export interface GradeResult {
  score: number
  testResults: Array<{ id: number; passed: boolean; description: string; message?: string }>
}

export function gradeActivity(activity: ActivityData, stdout: string, files?: Record<string, string>): GradeResult {
  const testResults: GradeResult['testResults'] = []

  if (activity.gradingType === 'io-match') {
    for (const tc of activity.testCases) {
      const expected = tc.expectedOutput?.replace(/\s/g, '') || ''
      const actual = stdout.replace(/\s/g, '')
      const passed = actual.includes(expected)
      testResults.push({ id: tc.id, passed, description: tc.description, message: passed ? '통과' : `기대: ${tc.expectedOutput}` })
    }
  }

  if (activity.gradingType === 'numeric-range') {
    for (const tc of activity.testCases) {
      const expected = parseFloat(tc.expectedOutput || '0')
      const tolerance = tc.tolerance || 1
      const numbers = stdout.match(/[\d,]+/g)?.map(n => parseFloat(n.replace(/,/g, ''))) || []
      const passed = numbers.some(n => Math.abs(n - expected) <= tolerance)
      testResults.push({ id: tc.id, passed, description: tc.description, message: passed ? '통과' : `기대값 범위: ${expected - tolerance}~${expected + tolerance}` })
    }
  }

  if (activity.gradingType === 'dict-state') {
    const hasSame = stdout.includes('야구공') && stdout.includes('30') && stdout.includes('농구공') && stdout.includes('50') && stdout.includes('테니스공') && stdout.includes('80')
    testResults.push({ id: 1, passed: hasSame, description: '재고 상태 검증', message: hasSame ? '통과' : '야구공:30개, 농구공:50개, 테니스공:80개 출력을 확인하세요' })
  }

  if (activity.gradingType === 'tts') {
    const hasMealtimeContent = stdout.toLowerCase().includes('메뉴')
    testResults.push({ id: 1, passed: hasMealtimeContent, description: 'TTS 메뉴 출력', message: hasMealtimeContent ? '통과' : '메뉴 정보를 출력하세요' })
  }

  if (activity.gradingType === 'scenario') {
    const hasResult = stdout.includes('승!') || stdout.includes('패!') || stdout.includes('무승부!')
    const hasChoices = stdout.includes('가위') || stdout.includes('바위') || stdout.includes('보')
    const passed = hasResult && hasChoices
    testResults.push({ id: 1, passed, description: '가위바위보 결과 출력', message: passed ? '통과' : '승/패/무승부 결과를 출력하세요' })
  }

  if (activity.gradingType === 'file-io') {
    const hasBaps = files && 'baps.txt' in files && files['baps.txt'].includes('이름')
    const hasRun = files && 'run.txt' in files && files['run.txt'].includes('등급')
    testResults.push({ id: 1, passed: !!hasBaps, description: 'baps.txt 파일 생성', message: hasBaps ? '통과' : 'baps.txt에 이름 정보를 저장하세요' })
    testResults.push({ id: 2, passed: !!hasRun, description: 'run.txt 파일 생성', message: hasRun ? '통과' : 'run.txt에 등급 정보를 저장하세요' })
  }

  const passedCount = testResults.filter(r => r.passed).length
  const score = Math.round((passedCount / Math.max(testResults.length, 1)) * 100)
  return { score, testResults }
}
