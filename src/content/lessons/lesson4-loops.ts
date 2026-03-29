import type { LessonData } from './types'

export const lesson4: LessonData = {
  id: 4,
  title: '제어문',
  icon: '🔀',
  description: '순차, 선택, 반복 구조를 이용한 제어문과 중첩 활용을 학습합니다.',
  sections: [
    {
      type: 'text',
      content: `## ① 제어 구조의 이해

프로그램은 코드의 실행 순서를 **제어 구조**로 결정합니다.

| 구조 | 설명 | 키워드 |
|------|------|--------|
| **순차 구조** | 위에서 아래로 순서대로 실행 | (기본 흐름) |
| **선택 구조** | 조건에 따라 다른 코드를 실행 | \`if\`, \`elif\`, \`else\` |
| **반복 구조** | 같은 코드를 여러 번 반복 실행 | \`for\`, \`while\` |

파이썬은 **들여쓰기(4칸 또는 탭)**로 코드 블록을 구분합니다.
들여쓰기가 잘못되면 오류가 발생하므로 주의해야 합니다.`
    },
    {
      type: 'live-code',
      content: '세 가지 제어 구조 비교',
      starterCode: `# 1. 순차 구조 - 위에서 아래로 실행
print("1단계: 시작")
print("2단계: 처리")
print("3단계: 종료")

# 2. 선택 구조 - 조건에 따라 분기
score = 85
if score >= 90:
    print("우수")
else:
    print("보통")

# 3. 반복 구조 - 같은 코드 반복
for i in range(1, 4):
    print(f"반복 {i}회")`
    },
    {
      type: 'text',
      content: `## ② 순차 구조

코드를 위에서 아래로 순서대로 실행하는 기본 구조입니다.
변수 선언, 계산, 출력이 순서대로 이루어집니다.

**순차 구조가 중요한 이유:**
- 코드의 실행 순서가 결과에 직접 영향을 줍니다
- 변수를 선언하기 전에 사용하면 오류가 발생합니다
- 계산 순서가 바뀌면 결과가 달라질 수 있습니다`
    },
    {
      type: 'live-code',
      content: '순차 구조 예제 - 원의 넓이 계산',
      starterCode: `# 순차 구조: 위에서 아래로 차례대로 실행
# 1. 입력 (값 설정)
radius = 5         # 반지름
pi = 3.14159       # 원주율

# 2. 처리 (계산)
circumference = 2 * pi * radius    # 둘레
area = pi * radius ** 2            # 넓이

# 3. 출력 (결과 표시)
print(f"반지름: {radius}cm")
print(f"원의 둘레: {circumference:.2f}cm")
print(f"원의 넓이: {area:.2f}cm²")`
    },
    {
      type: 'text',
      content: `## ③ 선택 구조

조건의 참/거짓에 따라 실행할 코드를 선택합니다.

\`\`\`python
if 조건1:
    # 조건1이 True일 때 실행
elif 조건2:
    # 조건2가 True일 때 실행
else:
    # 모든 조건이 False일 때 실행
\`\`\`

**주의사항:**
- \`elif\`와 \`else\`는 필요할 때만 사용 (생략 가능)
- \`elif\`는 여러 번 사용 가능
- 조건은 위에서부터 순서대로 검사하며, 처음으로 True인 블록만 실행

### 조건 표현식 (삼항 연산자)
한 줄로 간단한 선택 구조를 표현합니다.
\`\`\`python
결과 = 참일때값 if 조건 else 거짓일때값
\`\`\``
    },
    {
      type: 'live-code',
      content: 'if-elif-else 선택 구조',
      starterCode: `# 성적 등급 판정
score = 83

if score >= 90:
    grade = "A"
    comment = "우수"
elif score >= 80:
    grade = "B"
    comment = "양호"
elif score >= 70:
    grade = "C"
    comment = "보통"
elif score >= 60:
    grade = "D"
    comment = "미흡"
else:
    grade = "F"
    comment = "재수강"

print(f"점수: {score}점")
print(f"등급: {grade} ({comment})")

# 조건 표현식 (한 줄 if)
result = "합격" if score >= 60 else "불합격"
print(f"결과: {result}")`
    },
    {
      type: 'text',
      content: `## ④ 반복 구조

같은 코드를 여러 번 반복 실행합니다.

### for 반복문
시퀀스(리스트, 문자열, range 등)의 요소를 하나씩 꺼내어 반복합니다.
\`\`\`python
for 변수 in 시퀀스:
    반복할 코드
\`\`\`

**range() 함수:**
\`\`\`python
range(5)        # 0, 1, 2, 3, 4
range(1, 6)     # 1, 2, 3, 4, 5
range(0, 10, 2) # 0, 2, 4, 6, 8  (2씩 증가)
\`\`\`

### while 반복문
조건이 참인 동안 계속 반복합니다.
\`\`\`python
while 조건:
    반복할 코드
\`\`\`

### 반복 제어
| 키워드 | 설명 |
|--------|------|
| \`break\` | 반복문 즉시 종료 |
| \`continue\` | 현재 반복 건너뛰고 다음 반복으로 |`
    },
    {
      type: 'live-code',
      content: 'for 반복문과 range()',
      starterCode: `# range()를 이용한 반복
print("=== 1부터 5까지 ===")
for i in range(1, 6):
    print(i, end=" ")
print()

# 리스트 순회
subjects = ["국어", "영어", "수학", "과학"]
scores = [85, 92, 78, 88]

print("\n=== 성적 목록 ===")
for i in range(len(subjects)):
    print(f"{subjects[i]}: {scores[i]}점")

# break: 조건 만족 시 반복 종료
print("\n=== 첫 번째 90점 이상 ===")
for i, score in enumerate(scores):
    if score >= 90:
        print(f"{subjects[i]}에서 90점 이상 달성!")
        break

# continue: 조건 만족 시 건너뜀
print("\n=== 80점 이상만 출력 ===")
for i, score in enumerate(scores):
    if score < 80:
        continue
    print(f"{subjects[i]}: {score}점")`
    },
    {
      type: 'live-code',
      content: 'while 반복문',
      starterCode: `# while 반복문 기본
count = 1
total = 0

while count <= 10:
    total += count
    count += 1

print(f"1부터 10까지의 합: {total}")

# while로 특정 조건까지 반복
number = 1
print("\n=== 2배씩 증가 ===")
while number < 100:
    print(number, end=" ")
    number *= 2
print()

# while + break 패턴
attempt = 0
secret = 42

print("\n=== 숫자 맞추기 ===")
guesses = [10, 42, 99]   # 실제로는 input()으로 받음
for guess in guesses:
    attempt += 1
    print(f"시도 {attempt}: {guess}")
    if guess == secret:
        print("정답!")
        break
else:
    print("모두 틀렸습니다")`
    },
    {
      type: 'text',
      content: `## ⑤ 중첩 활용

선택 구조와 반복 구조를 서로 중첩하여 복잡한 로직을 구현할 수 있습니다.

**중첩 반복문:** 반복문 안에 또 다른 반복문을 넣습니다.
\`\`\`python
for i in range(3):      # 외부 반복: 3번
    for j in range(3):  # 내부 반복: 3번
        print(i, j)     # 총 9번 실행
\`\`\`

**반복문 안의 선택 구조:** 반복 중 조건에 따라 다른 처리를 합니다.

**주의:** 중첩이 깊어질수록 코드가 복잡해지므로 2~3단계로 제한하는 것이 좋습니다.`
    },
    {
      type: 'live-code',
      content: '중첩 활용 예제 - 구구단 + 조건',
      starterCode: `# 중첩 반복문: 구구단 (2단~4단)
print("=== 구구단 ===")
for i in range(2, 5):
    for j in range(1, 11):
        print(f"{i}×{j}={i*j:2d}", end="  ")
    print()   # 단이 바뀔 때 줄바꿈

# 반복 + 선택 중첩: 소수 판별
print("\n=== 1~20 소수 목록 ===")
for n in range(2, 21):
    is_prime = True
    for i in range(2, n):
        if n % i == 0:
            is_prime = False
            break
    if is_prime:
        print(n, end=" ")
print()

# 2차원 리스트 처리
print("\n=== 반별 성적 ===")
class_scores = [
    ["1반", 85, 90, 78],
    ["2반", 92, 88, 95],
    ["3반", 76, 82, 80],
]
for row in class_scores:
    name = row[0]
    avg = sum(row[1:]) / len(row[1:])
    result = "우수반" if avg >= 88 else "일반반"
    print(f"{name}: 평균 {avg:.1f}점 → {result}")`
    },
  ],
  codingProblems: [
    {
      id: 1,
      title: '1부터 N까지의 합',
      description: '정수 N을 입력받아 1부터 N까지의 합을 구하세요.',
      examples: [
        { input: '10', output: '1부터 10까지의 합: 55' }
      ],
      starterCode: `n = int(input("N: "))\n# 아래를 완성하세요\n`,
      testCases: [
        { inputs: ['10'], expectedOutput: '1부터 10까지의 합: 55' }
      ],
      hint: 'for i in range(1, n+1): 로 반복하며 합산하세요.',
    },
    {
      id: 2,
      title: '구구단 출력',
      description: '단 수를 입력받아 구구단을 출력하세요.\n\n형식: "3 x 1 = 3"',
      examples: [
        { input: '3', output: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27' }
      ],
      starterCode: `dan = int(input("단: "))\n# 아래를 완성하세요\n`,
      testCases: [
        { inputs: ['3'], expectedOutput: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27' }
      ],
      hint: 'for i in range(1, 10): 로 반복하며 print(f"{dan} x {i} = {dan*i}") 를 출력하세요.',
    },
  ],
  quiz: [
    {
      id: 1,
      question: 'if-elif-else에서 elif는 몇 번 사용할 수 있나요?',
      options: ['1번만', '2번까지', '3번까지', '제한 없음'],
      answer: 3,
      explanation: 'elif는 제한 없이 여러 번 사용할 수 있습니다. 조건이 많을수록 elif를 추가합니다.',
    },
    {
      id: 2,
      question: 'range(2, 8, 2)가 생성하는 수열은?',
      options: ['2, 4, 6, 8', '2, 4, 6', '2, 3, 4, 5, 6, 7', '0, 2, 4, 6'],
      answer: 1,
      explanation: 'range(2, 8, 2)는 2부터 시작해서 2씩 증가하며 8 미만까지입니다. 결과: 2, 4, 6',
    },
    {
      id: 3,
      question: 'for 반복문에서 현재 반복만 건너뛰고 싶을 때 사용하는 키워드는?',
      options: ['break', 'continue', 'pass', 'skip'],
      answer: 1,
      explanation: 'continue는 현재 반복의 나머지 코드를 건너뛰고 다음 반복으로 넘어갑니다.',
    },
    {
      id: 4,
      question: 'while True: 루프를 종료하려면?',
      options: ['exit()', 'stop()', 'break', 'return'],
      answer: 2,
      explanation: 'while True는 무한루프이므로 break를 사용하여 반복문을 탈출합니다.',
    },
    {
      id: 5,
      question: '중첩 반복문에서 range(3) 안에 range(4)가 있을 때 총 몇 번 실행되나요?',
      options: ['3번', '4번', '7번', '12번'],
      answer: 3,
      explanation: '외부 반복 3번 × 내부 반복 4번 = 총 12번 실행됩니다.',
    },
  ],
}
