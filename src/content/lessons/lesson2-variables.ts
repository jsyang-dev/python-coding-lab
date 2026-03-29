import type { LessonData } from './types'

export const lesson2: LessonData = {
  id: 2,
  title: '변수와 자료형',
  icon: '📦',
  description: '변수의 개념과 파이썬의 기본 자료형 및 컨테이너 자료형을 학습합니다.',
  sections: [
    {
      type: 'text',
      content: `## ① 변수와 자료형의 이해

**변수(Variable)** 는 데이터를 저장하는 이름이 붙은 공간입니다.
파이썬에서는 변수를 선언할 때 자료형을 따로 적지 않아도 됩니다.

\`\`\`python
변수명 = 값
\`\`\`

**변수 명명 규칙:**
- 영문자, 숫자, 밑줄(_)만 사용
- 숫자로 시작할 수 없음
- 대소문자 구별 (name ≠ Name)
- 파이썬 예약어 사용 불가 (if, for, while 등)

**자료형(Data Type)** 이란 변수에 저장되는 데이터의 종류를 말합니다.
\`type()\` 함수로 자료형을 확인할 수 있습니다.`
    },
    {
      type: 'live-code',
      content: '변수 선언과 자료형 확인',
      starterCode: `# 변수 선언
name = "홍길동"       # 문자열
age = 17              # 정수
height = 175.5        # 실수
is_student = True     # 논리값

# 값 출력
print(name, age, height, is_student)

# 자료형 확인
print(type(name))
print(type(age))
print(type(height))
print(type(is_student))

# 변수는 언제든 다른 값으로 바꿀 수 있음
age = 18
print("변경된 나이:", age)`
    },
    {
      type: 'text',
      content: `## ② 기본 자료형

파이썬의 4가지 기본 자료형입니다.

| 자료형 | 키워드 | 예시 | 설명 |
|--------|--------|------|------|
| 정수 | \`int\` | 10, -5, 0 | 소수점 없는 수 |
| 실수 | \`float\` | 3.14, -0.5 | 소수점 있는 수 |
| 문자열 | \`str\` | "안녕", 'hello' | 따옴표로 감싼 텍스트 |
| 논리값 | \`bool\` | True, False | 참/거짓 |

**형변환(Type Casting):** 자료형을 다른 자료형으로 변환합니다.

\`\`\`python
int("10")    # 문자열 → 정수: 10
float("3.14") # 문자열 → 실수: 3.14
str(100)     # 정수 → 문자열: "100"
bool(0)      # 정수 → 논리값: False
\`\`\``
    },
    {
      type: 'live-code',
      content: '기본 자료형과 형변환',
      starterCode: `# 정수(int)
x = 42
print(f"정수: {x}, 타입: {type(x)}")

# 실수(float)
pi = 3.14159
print(f"실수: {pi:.2f}, 타입: {type(pi)}")

# 문자열(str)
greeting = "안녕하세요"
print(f"문자열: {greeting}, 길이: {len(greeting)}")

# 논리값(bool)
is_pass = True
print(f"논리값: {is_pass}, 타입: {type(is_pass)}")

# 형변환
age_str = "17"
age_int = int(age_str)    # 문자열 → 정수
print(f"형변환: '{age_str}' → {age_int}, {age_int + 1}살이 됩니다")

score = float("95.5")     # 문자열 → 실수
print(f"실수 변환: {score * 2}")`
    },
    {
      type: 'text',
      content: `## ③ 컨테이너 자료형

여러 값을 하나의 변수에 저장하는 자료형입니다.

### 리스트 (List)
순서가 있고, **수정 가능**한 자료형입니다.
\`\`\`python
fruits = ["사과", "바나나", "딸기"]
fruits[0]  # "사과" (인덱스는 0부터 시작)
\`\`\`

### 튜플 (Tuple)
순서가 있고, **수정 불가능**한 자료형입니다.
\`\`\`python
point = (10, 20)   # 변경 불가
\`\`\`

### 딕셔너리 (Dictionary)
**키(key)-값(value)** 쌍으로 데이터를 저장합니다.
\`\`\`python
student = {"이름": "김철수", "나이": 17}
student["이름"]  # "김철수"
\`\`\``
    },
    {
      type: 'live-code',
      content: '리스트 사용법',
      starterCode: `# 리스트 생성
fruits = ["사과", "바나나", "딸기"]
scores = [85, 92, 78, 96, 88]

# 인덱싱 (0부터 시작)
print("첫 번째:", fruits[0])    # 사과
print("마지막:", fruits[-1])    # 딸기 (음수 인덱스)

# 슬라이싱
print("앞 두 개:", fruits[0:2])

# 리스트 수정
fruits.append("포도")          # 끝에 추가
fruits.insert(1, "키위")       # 특정 위치에 추가
print("수정 후:", fruits)

# 리스트 정보
print("개수:", len(scores))
print("최댓값:", max(scores))
print("합계:", sum(scores))`
    },
    {
      type: 'live-code',
      content: '딕셔너리 사용법',
      starterCode: `# 딕셔너리 생성
student = {
    "이름": "김철수",
    "나이": 17,
    "반": "2-3",
    "성적": [90, 85, 92]
}

# 값 접근
print("이름:", student["이름"])
print("나이:", student["나이"])

# 없는 키 안전하게 접근
print("점수:", student.get("점수", "미등록"))

# 값 추가 / 수정
student["점수"] = 89
student["나이"] = 18
print("수정 후:", student)

# 키와 값 목록
print("키 목록:", list(student.keys()))
print("값 목록:", list(student.values()))`
    },
    {
      type: 'text',
      content: `## ④ 변수와 자료형의 활용

다양한 자료형을 조합하여 실생활의 데이터를 표현할 수 있습니다.

**문자열 주요 메서드:**

| 메서드 | 설명 | 예시 |
|--------|------|------|
| \`upper()\` | 대문자 변환 | \`"hello".upper()\` → "HELLO" |
| \`lower()\` | 소문자 변환 | \`"HELLO".lower()\` → "hello" |
| \`strip()\` | 앞뒤 공백 제거 | \`"  hi  ".strip()\` → "hi" |
| \`split()\` | 문자열 분리 | \`"a,b,c".split(",")\` → ["a","b","c"] |
| \`replace()\` | 문자열 교체 | \`"hello".replace("l","r")\` → "herro" |`
    },
    {
      type: 'live-code',
      content: '자료형 종합 활용 예제',
      starterCode: `# 학급 정보를 다양한 자료형으로 표현하기
class_name = "2학년 3반"
students = ["김철수", "이영희", "박민준", "최서연"]
scores = {"김철수": 90, "이영희": 85, "박민준": 92, "최서연": 88}

# 문자열 메서드 활용
print(class_name.upper())
print("학생 수:", len(students))

# 리스트 + 딕셔너리 활용
print("\n=== 성적 목록 ===")
for name in students:
    print(f"{name}: {scores[name]}점")

# 계산
total = sum(scores.values())
average = total / len(scores)
print(f"\n학급 평균: {average:.1f}점")`
    },
  ],
  codingProblems: [
    {
      id: 1,
      title: '원의 둘레와 넓이',
      description: '원의 반지름을 입력받아 둘레와 넓이를 소수점 2자리로 출력하세요.\n\npi = 3.14 를 사용합니다.',
      examples: [
        { input: '5', output: '둘레: 31.40\n넓이: 78.50' }
      ],
      starterCode: `pi = 3.14\nradius = float(input("반지름: "))\n# 아래를 완성하세요\n`,
      testCases: [
        { inputs: ['5'], expectedOutput: '둘레: 31.40\n넓이: 78.50' }
      ],
      hint: '둘레 = 2 * pi * radius, 넓이 = pi * radius ** 2\nf"{값:.2f}" 로 소수점 2자리를 맞출 수 있습니다.',
    },
    {
      id: 2,
      title: '문자열 변환',
      description: '문자열을 입력받아 길이, 대문자, 소문자, 뒤집기를 출력하세요.',
      examples: [
        { input: 'Hello', output: '길이: 5\n대문자: HELLO\n소문자: hello\n뒤집기: olleH' }
      ],
      starterCode: `s = input("문자열: ")\n# 아래를 완성하세요\n`,
      testCases: [
        { inputs: ['Hello'], expectedOutput: '길이: 5\n대문자: HELLO\n소문자: hello\n뒤집기: olleH' }
      ],
      hint: 'len(s), s.upper(), s.lower(), s[::-1] 을 사용하세요.',
    },
  ],
  quiz: [
    {
      id: 1,
      question: 'x = "10"일 때, x + 5의 결과는?',
      options: ['15', '"105"', '오류 발생', '"10" + "5"'],
      answer: 2,
      explanation: '문자열과 정수는 더할 수 없어 TypeError가 발생합니다. int(x) + 5 = 15로 변환해야 합니다.',
    },
    {
      id: 2,
      question: 'fruits = ["사과", "바나나", "딸기"]일 때 fruits[-1]은?',
      options: ['사과', '바나나', '딸기', '오류'],
      answer: 2,
      explanation: '음수 인덱스는 뒤에서부터 셉니다. -1은 마지막 요소인 "딸기"입니다.',
    },
    {
      id: 3,
      question: '딕셔너리에서 없는 키에 접근할 때 오류를 피하려면?',
      options: ['dict[key]', 'dict.get(key)', 'dict.get(key, 기본값)', 'dict.find(key)'],
      answer: 2,
      explanation: 'dict.get(key, 기본값)은 키가 없으면 기본값을 반환하여 KeyError를 방지합니다.',
    },
    {
      id: 4,
      question: '다음 중 변수명으로 사용할 수 없는 것은?',
      options: ['my_score', 'score1', '1score', '_name'],
      answer: 2,
      explanation: '변수명은 숫자로 시작할 수 없습니다. "1score"는 잘못된 변수명입니다.',
    },
    {
      id: 5,
      question: 'bool(0)의 결과는?',
      options: ['True', 'False', '0', '오류'],
      answer: 1,
      explanation: '파이썬에서 0, 빈 문자열, 빈 리스트 등은 bool로 변환하면 False가 됩니다.',
    },
  ],
}
