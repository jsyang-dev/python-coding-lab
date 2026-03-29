import type { LessonData } from './types'

export const lesson6: LessonData = {
  id: 6,
  title: '파일 처리',
  icon: '📁',
  description: '파일의 개념을 이해하고 open()으로 파일을 읽고 쓰는 방법을 학습합니다.',
  sections: [
    {
      type: 'text',
      content: `## ① 파일의 이해

**파일(File)** 은 데이터를 영구적으로 저장하는 단위입니다.
프로그램이 종료되어도 파일에 저장된 데이터는 유지됩니다.

### 파일 처리가 필요한 이유
- 변수에 저장한 데이터는 프로그램 종료 시 **사라짐**
- 파일에 저장하면 나중에 다시 읽을 수 있음
- 대량의 데이터를 다루거나 다른 프로그램과 데이터를 공유할 때 사용

### 텍스트 파일 vs 이진 파일

| 구분 | 텍스트 파일 | 이진 파일 |
|------|-------------|-----------|
| 형식 | 사람이 읽을 수 있는 문자 | 0과 1의 이진 데이터 |
| 예시 | .txt, .csv, .py | .jpg, .mp3, .exe |
| 파이썬 모드 | 기본 모드 | \`b\` 붙임 (rb, wb) |

### 파일 열기 모드

| 모드 | 의미 | 파일 없을 때 |
|------|------|-------------|
| \`'r'\` | 읽기 (기본값) | 오류 발생 |
| \`'w'\` | 쓰기 (덮어씀) | 새로 생성 |
| \`'a'\` | 추가 쓰기 | 새로 생성 |
| \`'r+'\` | 읽기 + 쓰기 | 오류 발생 |`
    },
    {
      type: 'live-code',
      content: '파일 기본 개념 확인',
      starterCode: `# 파이썬에서 파일을 다루는 기본 흐름
# 1. 파일 열기 (open)
# 2. 파일 읽기/쓰기
# 3. 파일 닫기 (close)

# with 문을 사용하면 자동으로 닫힘 (권장)
# with open("파일명", "모드", encoding="utf-8") as f:
#     파일 작업

# 파일 모드 확인용 예제
modes = {
    "'r'": "읽기 모드 - 파일이 없으면 오류",
    "'w'": "쓰기 모드 - 파일이 없으면 생성, 있으면 덮어씀",
    "'a'": "추가 모드 - 파일 끝에 내용 추가",
}

for mode, desc in modes.items():
    print(f"{mode}: {desc}")

print("\n인코딩: 한글을 올바르게 처리하려면 encoding='utf-8' 지정")`
    },
    {
      type: 'text',
      content: `## ② 파일의 처리

### 파일 쓰기
\`\`\`python
with open("파일명.txt", "w", encoding="utf-8") as f:
    f.write("저장할 내용\\n")    # 줄바꿈은 \\n으로
\`\`\`

### 파일 읽기

| 메서드 | 설명 | 반환 타입 |
|--------|------|-----------|
| \`f.read()\` | 전체 내용을 한 번에 읽기 | str |
| \`f.readline()\` | 한 줄씩 읽기 | str |
| \`f.readlines()\` | 모든 줄을 리스트로 읽기 | list |

### with 문을 사용하는 이유
\`\`\`python
# with 문 사용 (권장) - 자동으로 f.close() 호출
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()

# with 문 미사용 - 직접 close() 해야 함 (비권장)
f = open("data.txt", "r", encoding="utf-8")
content = f.read()
f.close()   # 깜빡하면 파일이 잠길 수 있음
\`\`\``
    },
    {
      type: 'live-code',
      content: '파일 쓰기',
      starterCode: `# 파일에 학생 정보 저장하기
students = [
    ("김철수", 85, 92, 78),
    ("이영희", 90, 88, 95),
    ("박민준", 76, 82, 80),
    ("최서연", 92, 95, 91),
]

# 파일 쓰기 (w 모드)
with open("students.txt", "w", encoding="utf-8") as f:
    f.write("이름,국어,영어,수학\n")   # 헤더 행
    for name, korean, english, math in students:
        f.write(f"{name},{korean},{english},{math}\n")

print("students.txt 파일 저장 완료!")
print(f"저장된 학생 수: {len(students)}명")

# 추가 쓰기 (a 모드)
with open("students.txt", "a", encoding="utf-8") as f:
    f.write("정다운,88,84,90\n")

print("정다운 학생 추가 완료!")`
    },
    {
      type: 'live-code',
      content: '파일 읽기',
      starterCode: `# 앞에서 저장한 파일 읽기

# 1. 전체 내용 한 번에 읽기
with open("students.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print("=== 전체 내용 ===")
    print(content)

# 2. 줄 단위로 읽기 (readlines)
with open("students.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"총 {len(lines)}줄")
    print("첫 번째 줄:", lines[0].strip())

# 3. for문으로 한 줄씩 처리 (가장 권장)
print("\n=== 성적 분석 ===")
with open("students.txt", "r", encoding="utf-8") as f:
    next(f)   # 헤더 건너뜀
    for line in f:
        parts = line.strip().split(",")
        name = parts[0]
        scores = list(map(int, parts[1:]))
        avg = sum(scores) / len(scores)
        print(f"{name}: 평균 {avg:.1f}점")`
    },
    {
      type: 'live-code',
      content: '파일 처리 종합 예제',
      starterCode: `# 파일을 활용한 성적 관리 프로그램

def save_scores(filename, data):
    """성적 데이터를 파일에 저장"""
    with open(filename, "w", encoding="utf-8") as f:
        for name, scores in data.items():
            line = f"{name}," + ",".join(map(str, scores))
            f.write(line + "\n")
    print(f"{filename} 저장 완료 ({len(data)}명)")

def load_scores(filename):
    """파일에서 성적 데이터 불러오기"""
    data = {}
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split(",")
            name = parts[0]
            scores = list(map(int, parts[1:]))
            data[name] = scores
    return data

def print_summary(data):
    """성적 요약 출력"""
    print("\n=== 성적 요약 ===")
    for name, scores in data.items():
        avg = sum(scores) / len(scores)
        grade = "A" if avg >= 90 else "B" if avg >= 80 else "C"
        print(f"{name}: {scores} → 평균 {avg:.1f}점 ({grade})")

# 실행
grade_data = {
    "김철수": [85, 92, 78],
    "이영희": [95, 88, 96],
    "박민준": [76, 82, 80],
}

save_scores("grade.txt", grade_data)
loaded = load_scores("grade.txt")
print_summary(loaded)`
    },
  ],
  codingProblems: [
    {
      id: 1,
      title: '성적 파일 저장 및 읽기',
      description: '이름과 점수 3개를 입력받아 scores.txt에 저장하고, 다시 읽어서 출력하세요.',
      examples: [
        { input: '홍길동\n85\n90\n78', output: '홍길동 85 90 78' }
      ],
      starterCode: `import os\nos.chdir('/workspace')\nname = input("이름: ")\ns1 = input("점수1: ")\ns2 = input("점수2: ")\ns3 = input("점수3: ")\n# scores.txt에 저장하고 읽어서 출력하세요\n`,
      testCases: [
        { inputs: ['홍길동', '85', '90', '78'], expectedOutput: '홍길동 85 90 78' }
      ],
      hint: 'with open("scores.txt", "w") as f: f.write(...)\n그 다음 with open("scores.txt", "r") as f: print(f.read().strip())',
    },
    {
      id: 2,
      title: '메모 파일 저장',
      description: '문자열 여러 줄을 입력받아("" 입력 시 종료) memo.txt에 저장하고 저장된 줄 수를 출력하세요.',
      examples: [
        { input: '안녕하세요\n반갑습니다\n', output: '저장된 줄 수: 2' }
      ],
      starterCode: `import os\nos.chdir('/workspace')\nlines = []\n# "" 입력까지 반복하여 lines에 추가하세요\n# memo.txt에 저장하고 줄 수를 출력하세요\n`,
      testCases: [
        { inputs: ['안녕하세요', '반갑습니다', ''], expectedOutput: '저장된 줄 수: 2' }
      ],
      hint: 'while True: line = input(); if line == "": break; lines.append(line)\n저장 후 print(f"저장된 줄 수: {len(lines)}")',
    },
  ],
  quiz: [
    {
      id: 1,
      question: "open('data.txt', 'w')로 파일을 열면?",
      options: [
        '파일이 없으면 오류 발생',
        '파일이 없으면 새로 생성, 있으면 덮어씀',
        '파일 끝에 내용을 추가',
        '읽기 전용으로 열림',
      ],
      answer: 1,
      explanation: "'w' 모드는 쓰기 모드로, 파일이 없으면 새로 만들고 있으면 기존 내용을 지우고 덮어씁니다.",
    },
    {
      id: 2,
      question: 'with 문으로 파일을 열면 장점은?',
      options: [
        '파일을 더 빠르게 읽을 수 있다',
        '파일 크기가 줄어든다',
        '코드 블록을 벗어나면 자동으로 파일이 닫힌다',
        '인코딩이 자동 설정된다',
      ],
      answer: 2,
      explanation: 'with 문을 사용하면 코드 블록이 끝날 때 자동으로 f.close()가 호출됩니다.',
    },
    {
      id: 3,
      question: 'f.readlines()의 반환 타입은?',
      options: ['str (문자열)', 'list (리스트)', 'tuple (튜플)', 'dict (딕셔너리)'],
      answer: 1,
      explanation: 'readlines()는 파일의 각 줄을 요소로 갖는 리스트를 반환합니다.',
    },
    {
      id: 4,
      question: '파일에 내용을 추가하고 싶을 때 사용하는 파일 모드는?',
      options: ["'r'", "'w'", "'a'", "'x'"],
      answer: 2,
      explanation: "'a' (append) 모드는 파일 끝에 내용을 추가합니다. 파일이 없으면 새로 생성합니다.",
    },
    {
      id: 5,
      question: '한글 텍스트 파일을 올바르게 읽으려면?',
      options: [
        "open('file.txt', 'r')",
        "open('file.txt', 'r', encoding='utf-8')",
        "open('file.txt', 'r', charset='utf-8')",
        "open('file.txt', 'r', language='ko')",
      ],
      answer: 1,
      explanation: "한글 등 비ASCII 문자를 올바르게 처리하려면 encoding='utf-8'을 지정해야 합니다.",
    },
  ],
}
