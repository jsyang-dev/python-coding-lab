import type { ActivityData } from './types'

export const activity3: ActivityData = {
  id: 3,
  title: '복리 이자 계산 프로그램',
  icon: '📈',
  objective: '연산자를 활용하여 프로그램을 작성할 수 있다.',
  description: `예금이나 적금뿐만 아니라 일상에서 이자를 계산하는 복리 이자 계산 프로그램을 작성해 보자.

**복리 이자 계산 공식**

> A = P(1 + r/n)^(nt)

<table>
<thead><tr><th>기호</th><th>의미</th></tr></thead>
<tbody>
<tr><td>A</td><td>최종 금액</td></tr>
<tr><td>P</td><td>초기 투자 금액 (원금)</td></tr>
<tr><td>r</td><td>연이율 (소수로 표현)</td></tr>
<tr><td>n</td><td>연간 복리 횟수 (예: 연 4회 복리 = 4)</td></tr>
<tr><td>t</td><td>투자 기간 (년)</td></tr>
</tbody>
</table>

다음의 실행 결과를 참고하여 복리 이자 계산 프로그램을 작성해 보자.`,
  targetOutput: `예치 금액(원): 1000000
연 이율(%): 4
예금 기간(년): 3
연간 복리 횟수(예: 연 4회 복리 = 4): 12
원금: 1000000.0원
연이율: 4.0%
투자 기간: 3년
연간 복리 횟수: 12회/년
만기 총 금액: 1127271.87원`,
  relatedLessons: [3],
  starterCode: `principal = float(input('예치 금액(원): '))
annual_rate = float(input('연 이율(%): '))

# 빈칸을 채우세요 (연이율을 소수로 변환)

# 빈칸을 채우세요 (예금 기간(년) 입력)
years =

# 빈칸을 채우세요 (연간 복리 횟수 입력)
compounds_per_year =

# 복리 이자 계산
amount = principal * (1 + annual_rate / compounds_per_year) ** (compounds_per_year * years)

# 빈칸을 채우세요 (원금 출력)

# 빈칸을 채우세요 (연이율 출력)

# 빈칸을 채우세요 (투자 기간 출력)

# 빈칸을 채우세요 (연간 복리 횟수 출력)

# 빈칸을 채우세요 (만기 총 금액 출력)
`,
  hints: [
    '③: annual_rate = annual_rate / 100 으로 % 단위를 소수로 변환하세요.',
    '⑤: years = int(input(\'예금 기간(년): \')) 형태로 입력받으세요.',
    '⑥: compounds_per_year = int(input(\'연간 복리 횟수(예: 연 4회 복리 = 4): \')) 형태로 입력받으세요.',
    '⑦⑧: print(f"원금: {principal}원"), print(f"연이율: {annual_rate * 100}%") 형태로 출력하세요.',
    '⑪⑫⑬: 투자 기간, 복리 횟수, 만기 총 금액을 f-string으로 출력하세요.',
    '만기 금액: print(f"만기 총 금액: {amount:.2f}원")',
  ],
  testCases: [
    {
      id: 1,
      description: '예치 100만원, 연 4%, 12회 복리, 3년 → 만기 1127271.87원',
      inputs: ['1000000', '4', '3', '12'],
      expectedOutput: '1127271',
      tolerance: 1,
    },
  ],
  gradingType: 'numeric-range',
}
