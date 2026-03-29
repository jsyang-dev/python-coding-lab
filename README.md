# Python 코딩 학습 플랫폼

고등학교 정보 교과용 Python 코딩 학습 플랫폼. 브라우저에서 Python 코드를 직접 실행하고 수행활동을 제출하며, 교사는 학생 진도와 채점 결과를 대시보드에서 확인할 수 있습니다.

**배포 URL**: https://python-coding-lab.mycat83.workers.dev

---

## 기술 스택

- **프론트엔드**: React 18 + TypeScript + Vite + Tailwind CSS
- **백엔드**: Hono (Cloudflare Worker)
- **DB**: Cloudflare D1 (SQLite)
- **Python 실행**: Pyodide (브라우저 Web Worker)
- **배포**: Cloudflare Workers Sites

---

## 시작하기

### 요구사항

- Node.js 18+
- Cloudflare 계정 및 `wrangler` 로그인

```bash
npx wrangler login
```

### 설치

```bash
npm install
```

### 로컬 개발

```bash
npm run dev
```

프론트엔드(`localhost:5173`)와 Cloudflare Worker(`localhost:8787`)가 동시에 실행됩니다.

---

## 데이터베이스 설정

### 로컬 DB 초기화

```bash
npm run db:migrate   # 스키마 적용
npm run db:seed      # 교사 계정 생성 (T0001 / teacher123)
```

### 원격 D1 DB (최초 배포 시)

```bash
# 1. Cloudflare에 D1 데이터베이스 생성
npx wrangler d1 create python-coding-lab-db

# 2. 출력된 database_id를 wrangler.toml의 database_id에 반영

# 3. 원격 DB 초기화
npm run db:migrate -- --remote
npm run db:seed -- --remote
```

---

## 배포

```bash
npm run deploy
```

빌드(`tsc -b && vite build`) 후 Cloudflare Workers에 자동 배포됩니다.

---

## 프로젝트 구조

```
├── src/                      # 프론트엔드
│   ├── content/
│   │   ├── lessons/          # 단원 학습 콘텐츠 (lesson1~6.ts)
│   │   └── activities/       # 수행활동 콘텐츠 (activity1~6.ts)
│   ├── components/
│   │   ├── editor/           # 코드 에디터, Pyodide Worker
│   │   ├── lesson/           # 레슨 렌더링 컴포넌트
│   │   └── activity/         # 수행활동 컴포넌트
│   ├── pages/                # 페이지 컴포넌트
│   │   └── teacher/          # 교사 전용 페이지
│   ├── hooks/                # usePyodide, useAuth, useApi 등
│   └── lib/grader.ts         # 수행활동 채점 로직
├── worker/                   # Cloudflare Worker (백엔드)
│   ├── index.ts              # 진입점, 정적 파일 서빙
│   ├── routes/               # API 라우트 (auth, lessons, activities, teacher)
│   ├── lib/                  # JWT, 인증 미들웨어
│   └── db/
│       ├── schema.sql        # DB 스키마
│       └── seed.sql          # 초기 데이터
└── wrangler.toml             # Cloudflare 배포 설정
```

---

## 콘텐츠

### 단원 학습 (6단원)

| 단원 | 제목 |
|------|------|
| 1 | 입력과 출력 |
| 2 | 변수와 자료형 |
| 3 | 연산자 |
| 4 | 제어문 |
| 5 | 함수 |
| 6 | 파일 처리 |

각 단원은 본문 학습 → 퀴즈 → 코딩 문제 순으로 구성됩니다.

### 수행활동 (6개)

| 활동 | 제목 |
|------|------|
| 1 | 티끌 모아 태산! |
| 2 | 재고 관리 프로그램 |
| 3 | 복리 이자 계산 프로그램 |
| 4 | 급식 메뉴 알림 TTS |
| 5 | 가위바위보 프로그램 |
| 6 | 학생 건강 체력 평가 |

---

> **주의**: 배포 전 `wrangler.toml`의 `JWT_SECRET`을 변경하거나 Cloudflare Workers Secret으로 분리하세요.
