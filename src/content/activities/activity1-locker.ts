import type { ActivityData } from './types'

export const activity1: ActivityData = {
  id: 1,
  title: '티끌 모아 태산!',
  icon: '💰',
  objective: '입력과 출력 기능을 활용한 프로그램을 작성할 수 있다.',
  description: `매달 일정 금액을 납입하면 이자가 붙어 만기에 받을 수 있는 금액을 계산하는 **적금 계산기**를 만들어 봅시다.

오른쪽 실행 결과를 목표로 빈칸을 채워 프로그램을 완성하세요.`,
  targetOutput: `<적금 계산기>
월 납입액을 입력하세요 (원): 100000
연 이자율을 입력하세요 (%): 3.75
적금 기간을 입력하세요 (월): 24
적금 기간 납입한 총 원금: 2400000 원
적금 기간 발생한 총 이자: 7500 원
적금 만기 시 받을 총금액: 2407500 원`,
  relatedLessons: [1],
  starterCode: `print('<적금 계산기>')
deposit = int(input('월 납입액을 입력하세요 (원): '))
rate = float(input('연 이자율을 입력하세요 (%): '))
period = int(input('적금 기간을 입력하세요 (월): '))

total = deposit * period
interest = deposit * (rate / 100) * (period / 12)
final = total + interest

total = int(total)
interest = int(interest)
final = int(final)

# 빈칸을 채우세요 (총 원금 출력)

# 빈칸을 채우세요 (총 이자 출력)

# 빈칸을 채우세요 (총 금액 출력)
`,
  hints: [
    '단리이자 공식: 이자 = 월납입액 × (연이율/100) × (기간/12)',
    '총 원금 = 월 납입액 × 적금 기간(월)',
    'print(f\'적금 기간 납입한 총 원금: {total} 원\') 형태로 출력하세요.',
  ],
  testCases: [
    {
      id: 1,
      description: '월 10만원, 3.75%, 24개월',
      inputs: ['100000', '3.75', '24'],
      expectedOutput: '적금 기간 납입한 총 원금: 2400000 원\n적금 기간 발생한 총 이자: 7500 원\n적금 만기 시 받을 총금액: 2407500 원',
    },
  ],
  gradingType: 'io-match',
}
