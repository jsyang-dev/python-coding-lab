import type { LessonData } from './types'

export const lesson1: LessonData = {
  id: 1,
  title: '입력과 출력',
  icon: '📤',
  description: 'input()과 print()를 사용하여 데이터를 입력받고 출력하는 방법을 학습합니다.',
  sections: [
    {
      type: 'text',
      content: `## ① 입출력 기능의 이해

컴퓨터 프로그램은 **입력(Input) → 처리(Process) → 출력(Output)** 의 흐름으로 동작합니다.

| 구분 | 설명 | 파이썬 함수 |
|------|------|------------|
| **입력** | 사용자로부터 데이터를 받음 | \`input()\` |
| **처리** | 받은 데이터를 계산하거나 변환 | 연산자, 함수 등 |
| **출력** | 처리 결과를 화면에 표시 | \`print()\` |

파이썬에서는 \`input()\`과 \`print()\` 함수로 입출력을 처리합니다.`
    },
    {
      type: 'live-code',
      content: '입출력 기본 흐름 확인하기',
      starterCode: `# 입력 → 처리 → 출력의 흐름
# 입력: 숫자 두 개를 미리 설정
a = 10
b = 20

# 처리: 두 수를 더함
result = a + b

# 출력: 결과를 화면에 표시
print("두 수의 합:", result)`
    },
    {
      type: 'text',
      content: `## ② 출력 함수

\`print()\` 함수는 값을 화면에 출력합니다.

\`\`\`python
print(값1, 값2, ..., sep=구분자, end=끝문자)
\`\`\`

| 매개변수 | 기본값 | 설명 |
|----------|--------|------|
| \`sep\` | \`" "\` (공백) | 값 사이의 구분자 |
| \`end\` | \`"\\n"\` (줄바꿈) | 출력 후 끝에 붙는 문자 |

### f-문자열 (f-string)
f-문자열을 사용하면 변수를 문자열 안에 쉽게 삽입할 수 있습니다.

\`\`\`python
name = "홍길동"
print(f"안녕하세요, {name}님!")   # 안녕하세요, 홍길동님!
\`\`\``
    },
    {
      type: 'live-code',
      content: 'print() 함수 다양한 사용법',
      starterCode: `# 기본 출력
print("안녕하세요!")
print(2025, 3, 14)

# sep: 구분자 변경
print("사과", "바나나", "딸기", sep=", ")
print(2025, 3, 14, sep="-")

# end: 줄바꿈 없이 출력
print("안녕", end=" ")
print("반가워요!")

# f-문자열
name = "이영희"
score = 95.5
print(f"이름: {name}")
print(f"점수: {score:.1f}점")   # 소수점 1자리`
    },
    {
      type: 'text',
      content: `## ③ 입력 함수

\`input()\` 함수는 키보드로 입력받은 값을 **항상 문자열(str)** 로 반환합니다.

\`\`\`python
변수 = input("안내 메시지")
\`\`\`

숫자로 사용하려면 **형변환**이 필요합니다.

| 함수 | 변환 결과 | 예시 |
|------|-----------|------|
| \`int()\` | 정수 | \`int("17")\` → 17 |
| \`float()\` | 실수 | \`float("3.14")\` → 3.14 |
| \`str()\` | 문자열 | \`str(100)\` → "100" |`
    },
    {
      type: 'live-code',
      content: 'input() 함수와 형변환',
      starterCode: `# input()은 항상 문자열을 반환합니다
# 아래는 입력값을 미리 지정한 예시입니다

name = "김철수"           # input("이름을 입력하세요: ")
age_str = "17"            # input("나이를 입력하세요: ")
height_str = "175.5"      # input("키를 입력하세요: ")

# 문자열 → 정수 변환
age = int(age_str)

# 문자열 → 실수 변환
height = float(height_str)

print("이름:", name)
print("나이:", age, "살")
print("내년 나이:", age + 1, "살")
print("키:", height, "cm")`
    },
    {
      type: 'text',
      content: `## ④ 입출력의 활용

\`input()\`으로 받은 값을 가공하여 의미 있는 결과를 출력할 수 있습니다.

**주의사항:**
- \`input()\`의 반환값은 항상 **문자열**
- 수식에 사용하려면 반드시 **형변환** 필요
- 여러 값을 한 줄에 입력받으려면 \`split()\` 사용

\`\`\`python
# 한 줄에 여러 값 입력받기
a, b = input("두 수를 입력하세요: ").split()
a, b = int(a), int(b)
\`\`\``
    },
    {
      type: 'live-code',
      content: '입력값을 활용한 계산 프로그램',
      starterCode: `# 학생 정보를 입력받아 출력하는 프로그램
# (실제로는 input()을 사용하지만 여기서는 값을 직접 설정)

name = "박민준"
korean = 85
english = 92
math = 78

# 처리: 평균 계산
total = korean + english + math
average = total / 3

# 출력: 성적표 형식으로 출력
print("=" * 20)
print(f"   {name} 성적표")
print("=" * 20)
print(f"국어: {korean}점")
print(f"영어: {english}점")
print(f"수학: {math}점")
print("-" * 20)
print(f"합계: {total}점")
print(f"평균: {average:.1f}점")`
    },
  ],
  codingProblems: [
    {
      id: 1,
      title: '인사 메시지 출력',
      description: '이름과 나이를 입력받아 인사 메시지를 출력하세요.\n\n이름과 나이를 입력받아 "안녕하세요, [이름]님! 내년에는 [나이+1]살이 됩니다." 형식으로 출력합니다.',
      examples: [
        { input: '홍길동\n17', output: '안녕하세요, 홍길동님! 내년에는 18살이 됩니다.' }
      ],
      starterCode: `name = input("이름: ")\nage = int(input("나이: "))\n# 아래를 완성하세요\n`,
      testCases: [
        { inputs: ['홍길동', '17'], expectedOutput: '안녕하세요, 홍길동님! 내년에는 18살이 됩니다.' }
      ],
      hint: 'f-문자열을 사용하면 편리합니다. print(f"안녕하세요, {name}님! 내년에는 {age+1}살이 됩니다.")',
    },
    {
      id: 2,
      title: '합계와 평균 계산',
      description: '두 수를 입력받아 합계와 평균을 출력하세요.\n\n합계는 정수로, 평균은 소수점 1자리로 출력합니다.',
      examples: [
        { input: '10\n20', output: '합계: 30\n평균: 15.0' }
      ],
      starterCode: `a = int(input("첫 번째 수: "))\nb = int(input("두 번째 수: "))\n# 아래를 완성하세요\n`,
      testCases: [
        { inputs: ['10', '20'], expectedOutput: '합계: 30\n평균: 15.0' }
      ],
      hint: '평균은 (a + b) / 2 로 계산합니다. f"{평균:.1f}" 로 소수점 1자리를 맞출 수 있습니다.',
    },
  ],
  quiz: [
    {
      id: 1,
      question: 'input() 함수가 반환하는 값의 자료형은?',
      options: ['int (정수)', 'float (실수)', 'str (문자열)', '입력한 값에 따라 다름'],
      answer: 2,
      explanation: 'input()은 항상 문자열(str)을 반환합니다. 숫자로 사용하려면 int() 또는 float()으로 변환해야 합니다.',
    },
    {
      id: 2,
      question: 'print("사과", "바나나", sep="★")의 출력 결과는?',
      options: ['사과 바나나', '사과★바나나', '사과,바나나', '사과바나나'],
      answer: 1,
      explanation: 'sep="★"는 값 사이의 구분자를 "★"로 지정합니다. 결과는 "사과★바나나"입니다.',
    },
    {
      id: 3,
      question: 'age = "17"일 때, age + 1을 올바르게 계산하는 코드는?',
      options: ['age + 1', 'str(age) + 1', 'int(age) + 1', 'float(age + 1)'],
      answer: 2,
      explanation: 'input()으로 받은 "17"은 문자열이므로, int("17") + 1 = 18이 됩니다.',
    },
    {
      id: 4,
      question: 'f-문자열에서 소수점 2자리까지 출력하는 형식 지정자는?',
      options: ['{x:2f}', '{x:.2f}', '{x,2f}', '{x:2d}'],
      answer: 1,
      explanation: '소수점 자리를 지정하려면 {변수:.자리수f} 형식을 사용합니다. 예: {x:.2f}는 소수점 2자리까지 출력합니다.',
    },
    {
      id: 5,
      question: 'print("안녕", end="!")의 출력 결과는?',
      options: ['안녕\n', '안녕!', '!안녕', '안녕 !'],
      answer: 1,
      explanation: 'end="!"는 줄바꿈 대신 "!"로 출력을 끝냅니다. 결과는 "안녕!"입니다.',
    },
  ],
}
