# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# 개발 서버 (프론트엔드 + Cloudflare Worker 동시 실행)
npm run dev

# 프로덕션 빌드 + 배포
npm run deploy

# 타입 체크
npx tsc --noEmit

# DB 스키마 적용
npm run db:migrate              # 로컬
npm run db:migrate -- --remote  # 원격 (Cloudflare D1)

# DB 시드 (교사 계정 T0001/teacher123 생성)
npm run db:seed
npm run db:seed -- --remote
```

## 아키텍처

**Cloudflare Workers Sites** 구조 — Worker 하나가 React SPA(정적 파일)와 API를 모두 서빙한다.

- **프론트엔드**: Vite + React + TypeScript. `npm run build` → `dist/`에 번들됨. `worker/index.ts`에서 `@cloudflare/kv-asset-handler`로 서빙. SPA fallback으로 모든 비-API 경로는 `index.html` 반환.
- **백엔드**: Hono 기반 Cloudflare Worker (`worker/index.ts`). `/api/*` 경로만 처리. DB는 Cloudflare D1 (SQLite). JWT 인증 (`jose` 라이브러리, PBKDF2 해싱).
- **로컬 개발**: `wrangler dev`가 D1을 `.wrangler/state/v3/d1/`에 로컬 SQLite로 에뮬레이션.

### 콘텐츠 구조

모든 학습 콘텐츠는 `src/content/`에 TypeScript 파일로 정의됨 (DB 없음).

**레슨** (`src/content/lessons/lesson1~6.ts`):
- `LessonData` 타입: `sections[]` (text/code/live-code), `quiz[]`, `codingProblems[]`
- 레슨 6개: 입력과 출력, 변수와 자료형, 연산자, 제어문, 함수, 파일 처리

**수행활동** (`src/content/activities/activity1~6.ts`):
- `ActivityData` 타입: `starterCode`, `hints[]`, `testCases[]`, `gradingType`
- `gradingType`: `io-match` | `numeric-range` | `dict-state` | `tts` | `scenario` | `file-io`
- 채점 로직: `src/lib/grader.ts`의 `gradeActivity()` 함수

### Python 실행 환경

Pyodide를 Web Worker(`src/components/editor/PyodideWorker.ts`)에서 실행. `usePyodide` hook이 메인 스레드와 통신.
- `speak(text)` 함수: Worker 내부에서 `##TTS_OUTPUT##` 마커로 메인 스레드에 전달 → 브라우저 Web Speech API 호출
- 파일 I/O 문제는 starterCode 첫 줄에 `os.chdir('/workspace')` 포함

### 콘텐츠 렌더링

- **활동 설명** (`ActivityDetail.tsx`): `react-markdown` + `rehype-raw`. HTML `<table>` 태그 직접 사용.
- **레슨 본문** (`LessonContent.tsx`): `react-markdown` + `remark-gfm` + `rehype-raw`. GFM 테이블(`|---|`) 및 코드 블록 지원.

### 인증 흐름

`useAuth` hook (Zustand store) → `localStorage`에 JWT 저장 → API 요청 시 `Authorization: Bearer` 헤더. 역할: `student` / `teacher`. Teacher 전용 라우트는 `TeacherRoute` 컴포넌트로 보호.

### DB 스키마 (`worker/db/schema.sql`)

테이블: `users`, `lesson_progress`, `activity_submissions`, `badges`. 외래키 활성화 상태. seed.sql은 `ON CONFLICT DO UPDATE`를 사용해야 외래키 오류 없음 (`INSERT OR REPLACE` 사용 금지 — 자식 테이블 FK 위반 발생).

### API 라우트

| 경로 | 파일 |
|------|------|
| `/api/auth/*` | `worker/routes/auth.ts` |
| `/api/lessons/*` | `worker/routes/lessons.ts` |
| `/api/activities/*` | `worker/routes/activities.ts` |
| `/api/teacher/*` | `worker/routes/teacher.ts` |

### 프론트엔드 라우트

- `/lessons/:id` → `/lessons/:id/quiz` → `/lessons/:id/coding`
- `/activities/:id`
- `/teacher`, `/teacher/students/:id`, `/teacher/activities/:id`
