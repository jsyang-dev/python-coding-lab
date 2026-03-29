interface SubmissionData {
  code: string
  stdout: string
  score: number
}

export function validateSubmission({ code, stdout, score }: SubmissionData): { valid: boolean; reason?: string } {
  const trimmedCode = code.trim()

  // 빈 코드 + 만점 거부
  if (trimmedCode.length < 10 && score >= 80) {
    return { valid: false, reason: '코드 내용이 너무 짧습니다.' }
  }

  // 코드만 있고 출력이 없는데 만점인 경우
  if (trimmedCode.length > 0 && stdout.trim().length === 0 && score >= 80) {
    return { valid: false, reason: '실행 결과가 없습니다.' }
  }

  // 점수 범위 체크
  if (score < 0 || score > 100) {
    return { valid: false, reason: '유효하지 않은 점수입니다.' }
  }

  return { valid: true }
}
