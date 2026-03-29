import type { LessonData } from './types'

export const lesson3: LessonData = {
  id: 3,
  title: '연산자',
  icon: '🔢',
  description: '파이썬의 다양한 연산자 종류와 활용법을 학습합니다.',
  sections: [
    {
      type: 'text',
      content: `## ① 연산자의 종류

**연산자(Operator)** 는 값을 계산하거나 비교하는 기호입니다.

### 산술 연산자
수학 계산에 사용하는 연산자입니다.

| 연산자 | 의미 | 예시 | 결과 |
|--------|------|------|------|
| \`+\` | 덧셈 | \`7 + 3\` | 10 |
| \`-\` | 뺄셈 | \`7 - 3\` | 4 |
| \`*\` | 곱셈 | \`7 * 3\` | 21 |
| \`/\` | 나눗셈 (실수) | \`7 / 3\` | 2.333... |
| \`//\` | 정수 나눗셈 | \`7 // 3\` | 2 |
| \`%\` | 나머지 | \`7 % 3\` | 1 |
| \`**\` | 거듭제곱 | \`2 ** 3\` | 8 |

### 대입 연산자
변수에 값을 저장하거나 갱신하는 연산자입니다.

| 연산자 | 의미 | 예시 |
|--------|------|------|
| \`=\` | 대입 | \`x = 10\` |
| \`+=\` | 더하고 대입 | \`x += 3\` → \`x = x + 3\` |
| \`-=\` | 빼고 대입 | \`x -= 3\` → \`x = x - 3\` |
| \`*=\` | 곱하고 대입 | \`x *= 2\` → \`x = x * 2\` |
| \`//=\` | 몫 대입 | \`x //= 2\` → \`x = x // 2\` |`
    },
    {
      type: 'live-code',
      content: '산술 연산자와 대입 연산자',
      starterCode: `# 산술 연산자
a = 17
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")   # 실수 나눗셈
print(f"{a} // {b} = {a // b}")     # 정수 나눗셈 (몫)
print(f"{a} % {b} = {a % b}")       # 나머지
print(f"2 ** 10 = {2 ** 10}")       # 거듭제곱

# 대입 연산자
score = 80
print(f"\n초기 점수: {score}")
score += 10    # score = score + 10
print(f"+10 후: {score}")
score -= 5     # score = score - 5
print(f"-5 후: {score}")`
    },
    {
      type: 'text',
      content: `### 비교 연산자
두 값을 비교하여 **True** 또는 **False**를 반환합니다.

| 연산자 | 의미 | 예시 | 결과 |
|--------|------|------|------|
| \`==\` | 같다 | \`5 == 5\` | True |
| \`!=\` | 다르다 | \`5 != 3\` | True |
| \`>\` | 크다 | \`7 > 3\` | True |
| \`<\` | 작다 | \`2 < 1\` | False |
| \`>=\` | 크거나 같다 | \`5 >= 5\` | True |
| \`<=\` | 작거나 같다 | \`3 <= 4\` | True |

### 논리 연산자
여러 조건을 조합할 때 사용합니다.

| 연산자 | 의미 | 설명 |
|--------|------|------|
| \`and\` | 그리고 | 두 조건 모두 True일 때 True |
| \`or\` | 또는 | 하나라도 True면 True |
| \`not\` | 아니다 | True → False, False → True |`
    },
    {
      type: 'live-code',
      content: '비교 연산자와 논리 연산자',
      starterCode: `# 비교 연산자
x = 75

print(x > 60)       # True
print(x == 100)     # False
print(x != 100)     # True
print(x >= 75)      # True

# 논리 연산자
age = 17
has_ticket = True
is_holiday = False
is_weekend = True

# and: 둘 다 참이어야 True
print(age >= 13 and has_ticket)    # True

# or: 하나라도 참이면 True
print(is_holiday or is_weekend)    # True

# not: 반대
print(not is_holiday)              # True
print(not has_ticket)              # False`
    },
    {
      type: 'text',
      content: `### 멤버십 연산자 / 식별 연산자

**멤버십 연산자**: 값이 시퀀스 안에 포함되어 있는지 확인합니다.

| 연산자 | 의미 | 예시 |
|--------|------|------|
| \`in\` | 포함되어 있음 | \`"사과" in fruits\` |
| \`not in\` | 포함되어 있지 않음 | \`"포도" not in fruits\` |

**연산자 우선순위** (높을수록 먼저 계산):
1. \`**\` (거듭제곱)
2. \`*\`, \`/\`, \`//\`, \`%\`
3. \`+\`, \`-\`
4. \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`
5. \`not\`
6. \`and\`
7. \`or\`

괄호 \`()\`를 사용하면 우선순위를 직접 지정할 수 있습니다.`
    },
    {
      type: 'live-code',
      content: '멤버십 연산자와 우선순위',
      starterCode: `# 멤버십 연산자
fruits = ["사과", "바나나", "딸기", "포도"]

print("사과" in fruits)        # True
print("키위" in fruits)        # False
print("키위" not in fruits)    # True

# 문자열에서도 사용 가능
sentence = "파이썬은 재미있다"
print("파이썬" in sentence)    # True

# 연산자 우선순위
result1 = 2 + 3 * 4         # 3*4 먼저 → 14
result2 = (2 + 3) * 4       # 괄호 먼저 → 20
print(f"2 + 3 * 4 = {result1}")
print(f"(2 + 3) * 4 = {result2}")

# 짝수 판별 (% 연산자 활용)
n = 24
print(f"{n}은 짝수: {n % 2 == 0}")`
    },
    {
      type: 'text',
      content: `## ② 연산자의 활용

연산자를 조합하면 다양한 프로그램을 만들 수 있습니다.

**자주 쓰이는 패턴:**
- \`n % 2 == 0\` → n이 짝수인지 확인
- \`0 <= x < 100\` → x가 0 이상 100 미만인지 확인 (파이썬에서 연속 비교 가능)
- \`x += 1\` → x를 1 증가 (카운터)
- \`x //= 10\` → 10의 자리 이하 제거`
    },
    {
      type: 'live-code',
      content: '연산자 종합 활용 예제',
      starterCode: `# 점수를 입력받아 등급을 판정하는 프로그램
score = 83

# 연속 비교 연산자 (파이썬 특징)
is_valid = 0 <= score <= 100
print(f"점수 {score}점은 유효한 점수: {is_valid}")

# 산술 + 비교 연산자 조합
korean = 85
english = 92
math = 78

total = korean + english + math
average = total / 3

print(f"\n총점: {total}점")
print(f"평균: {average:.1f}점")
print(f"평균 60점 이상 합격: {average >= 60}")
print(f"모든 과목 70점 이상: {korean >= 70 and english >= 70 and math >= 70}")

# 나머지 연산자로 홀짝 판별
for n in range(1, 8):
    kind = "짝수" if n % 2 == 0 else "홀수"
    print(f"{n}: {kind}")`
    },
  ],
  codingProblems: [
    {
      id: 1,
      title: '나눗셈 몫과 나머지',
      description: '두 정수를 입력받아 나눗셈의 몫과 나머지를 출력하세요.',
      examples: [
        { input: '17\n5', output: '몫: 3\n나머지: 2' }
      ],
      starterCode: `a = int(input("나뉘는 수: "))\nb = int(input("나누는 수: "))\n# 아래를 완성하세요\n`,
      testCases: [
        { inputs: ['17', '5'], expectedOutput: '몫: 3\n나머지: 2' }
      ],
      hint: '몫은 // 연산자, 나머지는 % 연산자를 사용합니다.',
    },
    {
      id: 2,
      title: '성적 등급 출력',
      description: '세 과목 점수를 입력받아 총점, 평균(소수점 1자리), 등급을 출력하세요.\n\n등급 기준: 90이상 A, 80이상 B, 70이상 C, 60이상 D, 나머지 F',
      examples: [
        { input: '85\n90\n78', output: '총점: 253\n평균: 84.3\n등급: B' }
      ],
      starterCode: `s1 = int(input("점수1: "))\ns2 = int(input("점수2: "))\ns3 = int(input("점수3: "))\n# 아래를 완성하세요\n`,
      testCases: [
        { inputs: ['85', '90', '78'], expectedOutput: '총점: 253\n평균: 84.3\n등급: B' }
      ],
      hint: 'total = s1 + s2 + s3, avg = total / 3\nif/elif/else로 등급을 판별하세요.',
    },
  ],
  quiz: [
    {
      id: 1,
      question: '7 // 2의 결과는?',
      options: ['3.5', '3', '1', '2'],
      answer: 1,
      explanation: '// 연산자는 정수 나눗셈(몫)입니다. 7 // 2 = 3입니다.',
    },
    {
      id: 2,
      question: 'x = 10일 때 x += 5 후 x의 값은?',
      options: ['5', '10', '15', '50'],
      answer: 2,
      explanation: 'x += 5는 x = x + 5와 같습니다. 10 + 5 = 15입니다.',
    },
    {
      id: 3,
      question: 'not True의 결과는?',
      options: ['True', 'False', '0', 'None'],
      answer: 1,
      explanation: 'not 연산자는 논리값을 반대로 만듭니다. not True = False입니다.',
    },
    {
      id: 4,
      question: '"파이썬" in "파이썬은 재미있다"의 결과는?',
      options: ['True', 'False', '오류', '"파이썬"'],
      answer: 0,
      explanation: 'in 연산자는 문자열 안에 특정 문자열이 포함되어 있으면 True를 반환합니다.',
    },
    {
      id: 5,
      question: '2 + 3 * 4의 결과는?',
      options: ['20', '14', '24', '10'],
      answer: 1,
      explanation: '연산자 우선순위에 의해 곱셈이 먼저 계산됩니다. 3 * 4 = 12, 2 + 12 = 14입니다.',
    },
  ],
}
