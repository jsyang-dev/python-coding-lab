import type { LessonData } from './types'

export const lesson5: LessonData = {
  id: 5,
  title: '함수',
  icon: '⚙️',
  description: '함수의 개념을 이해하고 def로 함수를 정의하여 다양하게 활용하는 방법을 학습합니다.',
  sections: [
    {
      type: 'text',
      content: `## ① 함수의 이해

**함수(Function)** 는 특정 작업을 수행하는 코드 묶음입니다.
같은 코드를 반복 작성하지 않고, 필요할 때마다 **호출**하여 사용합니다.

### 함수를 사용하는 이유
- **재사용성**: 한 번 정의하면 여러 번 사용 가능
- **가독성**: 코드가 짧아지고 이해하기 쉬움
- **유지보수**: 수정이 필요할 때 함수 내부만 바꾸면 됨

### 파이썬의 내장 함수
파이썬에는 이미 만들어진 함수들이 있습니다.

| 함수 | 설명 | 예시 |
|------|------|------|
| \`print()\` | 화면에 출력 | \`print("안녕")\` |
| \`input()\` | 키보드 입력 | \`input("이름: ")\` |
| \`len()\` | 길이 반환 | \`len([1,2,3])\` → 3 |
| \`int()\` | 정수 변환 | \`int("10")\` → 10 |
| \`range()\` | 정수 수열 생성 | \`range(1, 6)\` |
| \`max()\` | 최댓값 | \`max([3,1,5])\` → 5 |
| \`min()\` | 최솟값 | \`min([3,1,5])\` → 1 |
| \`sum()\` | 합계 | \`sum([1,2,3])\` → 6 |`
    },
    {
      type: 'live-code',
      content: '파이썬 내장 함수 활용',
      starterCode: `# 자주 쓰는 내장 함수
numbers = [5, 2, 8, 1, 9, 3, 7]

print(f"개수: {len(numbers)}")
print(f"최댓값: {max(numbers)}")
print(f"최솟값: {min(numbers)}")
print(f"합계: {sum(numbers)}")
print(f"평균: {sum(numbers) / len(numbers):.1f}")
print(f"정렬(오름차순): {sorted(numbers)}")
print(f"정렬(내림차순): {sorted(numbers, reverse=True)}")

# 문자열 함수
text = "Hello, Python!"
print(f"\n원본: {text}")
print(f"대문자: {text.upper()}")
print(f"소문자: {text.lower()}")
print(f"분리: {text.split(', ')}")
print(f"교체: {text.replace('Python', '파이썬')}")`
    },
    {
      type: 'text',
      content: `## ② 함수의 정의 및 호출

### 함수 정의 문법
\`\`\`python
def 함수이름(매개변수1, 매개변수2, ...):
    실행할 코드
    return 반환값   # 반환값이 없으면 생략 가능
\`\`\`

### 함수 호출
\`\`\`python
결과 = 함수이름(인수1, 인수2, ...)
\`\`\`

### 매개변수와 인수
- **매개변수(parameter)**: 함수 정의 시 괄호 안에 쓰는 변수
- **인수(argument)**: 함수 호출 시 전달하는 실제 값

### 기본값 매개변수
매개변수에 기본값을 설정하면 인수를 생략해도 됩니다.
\`\`\`python
def greet(name, greeting="안녕하세요"):
    print(f"{greeting}, {name}님!")

greet("김철수")             # 기본값 사용
greet("이영희", "반갑습니다")  # 기본값 덮어쓰기
\`\`\``
    },
    {
      type: 'live-code',
      content: '함수 정의와 호출',
      starterCode: `# 반환값 없는 함수
def print_line(char="-", length=20):
    print(char * length)

print_line()           # 기본값: "--------------------"
print_line("=")        # "===================="
print_line("*", 10)    # "**********"

# 반환값 있는 함수
def add(a, b):
    return a + b

def calculate(a, b):
    # 여러 값을 tuple로 반환
    return a + b, a - b, a * b

result = add(10, 20)
print(f"\n10 + 20 = {result}")

s, d, p = calculate(8, 3)
print(f"8+3={s}, 8-3={d}, 8×3={p}")

# 기본값 매개변수
def introduce(name, grade=2, school="고등학교"):
    print(f"저는 {school} {grade}학년 {name}입니다.")

introduce("김민수")
introduce("박서연", 1)
introduce("이준호", 3, "대학교")`
    },
    {
      type: 'live-code',
      content: '지역 변수와 전역 변수',
      starterCode: `# 전역 변수: 함수 밖에서 선언, 어디서나 읽기 가능
school = "한빛고등학교"
total_students = 0

def enroll(name):
    global total_students   # 전역 변수 수정 시 global 선언 필요
    total_students += 1
    local_msg = f"{name} 등록 완료"   # 지역 변수: 함수 안에서만 유효
    print(local_msg)
    print(f"학교: {school}")          # 전역 변수 읽기는 가능

enroll("김철수")
enroll("이영희")
enroll("박민준")

print(f"\n총 등록 학생: {total_students}명")

# 지역 변수는 함수 밖에서 접근 불가
# print(local_msg)  # NameError 발생!`
    },
    {
      type: 'text',
      content: `## ③ 함수의 활용

함수를 잘 활용하면 복잡한 문제를 작은 단위로 나누어 해결할 수 있습니다.

### 함수 설계 원칙
- **하나의 함수는 하나의 역할**: 함수가 하는 일을 함수 이름으로 명확히 표현
- **적절한 길이**: 함수 하나가 너무 길면 여러 함수로 분리
- **재사용 가능하게**: 특정 상황에만 쓰이는 값은 매개변수로 받기

### 재귀 함수
함수가 자기 자신을 호출하는 방식입니다.
\`\`\`python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # 자기 자신 호출
\`\`\``
    },
    {
      type: 'live-code',
      content: '함수 활용 종합 예제',
      starterCode: `# 성적 관리 프로그램을 함수로 구현

def get_grade(score):
    """점수를 받아 등급 반환"""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

def print_report(name, scores):
    """학생 성적표 출력"""
    total = sum(scores)
    avg = total / len(scores)
    grade = get_grade(avg)

    print(f"\n{'=' * 25}")
    print(f"  {name} 성적표")
    print(f"{'=' * 25}")
    subjects = ["국어", "영어", "수학"]
    for i, score in enumerate(scores):
        print(f"  {subjects[i]}: {score}점")
    print(f"{'-' * 25}")
    print(f"  평균: {avg:.1f}점  등급: {grade}")

def factorial(n):
    """재귀 함수: n 팩토리얼"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# 함수 호출
print_report("김철수", [85, 92, 78])
print_report("이영희", [95, 88, 96])

print(f"\n5! = {factorial(5)}")
print(f"10! = {factorial(10)}")`
    },
  ],
  codingProblems: [
    {
      id: 1,
      title: '두 수 중 큰 수 반환',
      description: '두 수 중 큰 수를 반환하는 함수 get_max(a, b)를 작성하세요.',
      examples: [
        { input: '7\n3', output: '7과 3 중 큰 수: 7' }
      ],
      starterCode: `def get_max(a, b):\n    # 아래를 완성하세요\n    pass\n\na = int(input("첫 번째 수: "))\nb = int(input("두 번째 수: "))\nprint(f"{a}과 {b} 중 큰 수: {get_max(a, b)}")\n`,
      testCases: [
        { inputs: ['7', '3'], expectedOutput: '7과 3 중 큰 수: 7' }
      ],
      hint: 'if a >= b: return a else: return b 또는 return a if a >= b else b 를 사용하세요.',
    },
    {
      id: 2,
      title: '팩토리얼 계산',
      description: '팩토리얼을 계산하는 함수 factorial(n)을 작성하세요.',
      examples: [
        { input: '5', output: '5! = 120' }
      ],
      starterCode: `def factorial(n):\n    # 아래를 완성하세요\n    pass\n\nn = int(input("N: "))\nprint(f"{n}! = {factorial(n)}")\n`,
      testCases: [
        { inputs: ['5'], expectedOutput: '5! = 120' }
      ],
      hint: 'result = 1 로 시작하여 for i in range(1, n+1): result *= i 로 계산하세요.',
    },
  ],
  quiz: [
    {
      id: 1,
      question: '함수를 정의할 때 사용하는 키워드는?',
      options: ['function', 'func', 'def', 'define'],
      answer: 2,
      explanation: '파이썬에서 함수를 정의할 때는 def 키워드를 사용합니다.',
    },
    {
      id: 2,
      question: '함수에서 값을 반환할 때 사용하는 키워드는?',
      options: ['print', 'yield', 'output', 'return'],
      answer: 3,
      explanation: 'return 키워드로 함수에서 값을 반환합니다. return 이후 코드는 실행되지 않습니다.',
    },
    {
      id: 3,
      question: '함수 안에서 전역 변수를 수정하려면?',
      options: ['local 변수명', 'global 변수명', 'extern 변수명', '수정 불가'],
      answer: 1,
      explanation: 'global 키워드를 사용하면 함수 안에서 전역 변수를 수정할 수 있습니다.',
    },
    {
      id: 4,
      question: '다음 중 기본값 매개변수 사용이 올바른 것은?',
      options: [
        'def f(a=1, b):',
        'def f(a, b=2):',
        'def f(a=1, b=2, c):',
        'def f(=1, b):',
      ],
      answer: 1,
      explanation: '기본값 매개변수는 반드시 일반 매개변수 뒤에 와야 합니다. def f(a, b=2):가 올바릅니다.',
    },
    {
      id: 5,
      question: 'sorted([3, 1, 2], reverse=True)의 결과는?',
      options: ['[1, 2, 3]', '[3, 2, 1]', '[2, 1, 3]', 'None'],
      answer: 1,
      explanation: 'sorted()에 reverse=True를 주면 내림차순으로 정렬됩니다. 결과는 [3, 2, 1]입니다.',
    },
  ],
}
