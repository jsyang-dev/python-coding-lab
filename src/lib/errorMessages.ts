export function translatePythonError(error: string): string {
  if (error.includes('SyntaxError')) {
    const match = error.match(/SyntaxError: (.+)/)
    return `문법 오류: ${match?.[1] || '코드 문법을 확인하세요.'}`
  }
  if (error.includes('NameError')) {
    const match = error.match(/NameError: name '(.+)'/)
    return `이름 오류: '${match?.[1] || '변수/함수'}'를 찾을 수 없습니다. 변수명이나 함수명을 확인하세요.`
  }
  if (error.includes('TypeError')) {
    return `타입 오류: 잘못된 자료형이 사용되었습니다. ${error.split('TypeError:')[1]?.trim() || ''}`
  }
  if (error.includes('IndentationError')) {
    return `들여쓰기 오류: 코드의 들여쓰기(스페이스)를 확인하세요.`
  }
  if (error.includes('ZeroDivisionError')) {
    return `나누기 오류: 0으로 나눌 수 없습니다.`
  }
  if (error.includes('IndexError')) {
    return `인덱스 오류: 리스트의 범위를 벗어났습니다.`
  }
  if (error.includes('KeyError')) {
    const match = error.match(/KeyError: (.+)/)
    return `키 오류: 딕셔너리에 ${match?.[1] || '해당'} 키가 없습니다.`
  }
  if (error.includes('ValueError')) {
    return `값 오류: ${error.split('ValueError:')[1]?.trim() || '잘못된 값이 입력되었습니다.'}`
  }
  if (error.includes('RecursionError') || error.includes('maximum recursion')) {
    return `재귀 오류: 함수가 너무 많이 반복 호출되었습니다.`
  }
  if (error.includes('TimeoutError') || error.includes('timed out')) {
    return `실행 시간 초과: 코드가 10초 이상 실행되었습니다. 무한루프가 있는지 확인하세요.`
  }
  return error
}
