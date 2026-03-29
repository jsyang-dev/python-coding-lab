# PRD: Python 코딩 학습 플랫폼

> 작성일: 2026-03-29
> 현황: 구현 진행 중 (코드베이스 분석 기반)

---

## 1. 제품 개요

고등학교 정보 교과 수업용 Python 코딩 학습 플랫폼. 학생은 브라우저에서 Python 코드를 직접 실행하고 수행활동을 제출하며, 교사는 학생 진도와 채점 결과를 대시보드에서 확인한다.

**대상 사용자**
- 학생: 고등학교 정보 교과 이수자 (Python 입문)
- 교사: 담당 교사 1명 이상 (진도 관리, 채점 확인)

**배포 환경**: Cloudflare Workers + D1 (SQLite). URL: `https://python-coding-lab.mycat83.workers.dev`

---

## 2. 기술 스택

| 구분 | 기술 |
|------|------|
| 프론트엔드 | React 18 + TypeScript + Vite + Tailwind CSS |
| 백엔드 | Hono (Cloudflare Worker) |
| DB | Cloudflare D1 (SQLite) |
| Python 실행 | Pyodide v0.26.0 (Web Worker, CDN 로드) |
| 인증 | JWT (jose 라이브러리, PBKDF2 해싱, 24시간 만료) |
| 코드 에디터 | Monaco Editor (데스크톱) / textarea (모바일, 768px 기준) |
| 마크다운 렌더링 | react-markdown + remark-gfm + rehype-raw |

---

## 3. 콘텐츠 현황

### 3-1. 단원 학습 (6단원)

모든 콘텐츠는 TypeScript 파일로 정의됨 (`src/content/lessons/`). DB 없음.

| ID | 파일 | title | 소단원 구성 | 퀴즈 | 코딩 문제 |
|----|------|-------|------------|------|----------|
| 1 | lesson1-io.ts | 입력과 출력 | ①입출력 기능의 이해 ②출력 함수 ③입력 함수 ④입출력의 활용 | 5문항 | 2문제 |
| 2 | lesson2-variables.ts | 변수와 자료형 | 변수/자료형/형변환/문자열 | 5문항 | 2문제 |
| 3 | lesson3-conditionals.ts | 연산자 | 연산자 종류/활용 | 5문항 | 2문제 |
| 4 | lesson4-loops.ts | 제어문 | 제어구조/순차/선택/반복/중첩 | 5문항 | 2문제 |
| 5 | lesson5-functions.ts | 함수 | 함수 정의/매개변수/반환값/내장함수 | 5문항 | 2문제 |
| 6 | lesson6-files.ts | 파일 처리 | 파일 열기/읽기/쓰기/CSV | 5문항 | 2문제 |

> ⚠️ **파일명 불일치**: lesson3 파일명은 `conditionals`, lesson4는 `loops`이나 title은 각각 '연산자', '제어문'으로 교육과정 단원명을 따름.

**레슨 섹션 타입**
- `text`: ReactMarkdown으로 렌더링 (GFM 테이블, 코드 블록 지원)
- `code`: 정적 코드 블록 표시
- `live-code`: Pyodide 실행 가능한 코드 에디터

### 3-2. 수행활동 (6개)

| ID | title | gradingType | relatedLessons |
|----|-------|-------------|----------------|
| 1 | 티끌 모아 태산! | io-match | [1] |
| 2 | 재고 관리 프로그램 | dict-state | [2] |
| 3 | 복리 이자 계산 프로그램 | numeric-range | [3] |
| 4 | 급식 메뉴 알림 TTS | tts | [4] |
| 5 | 가위바위보 프로그램 | scenario | [5] |
| 6 | 학생 건강 체력 평가 | file-io | [6] |

---

## 4. 구현 기능 현황

### 4-1. 학생 기능

| 기능 | 구현 상태 | 비고 |
|------|----------|------|
| 회원가입 / 로그인 | ✅ 완전 구현 | role 항상 student로 고정 |
| 대시보드 - 레슨 진도 | ✅ 완전 구현 | API 연동 |
| 대시보드 - 수행활동 완료 수 | ❌ 미구현 | 항상 `0/6` 하드코딩 |
| 대시보드 - 배지 수 | ❌ 미구현 | 항상 `0` 하드코딩 |
| 단원 학습 (본문 읽기) | ✅ 완전 구현 | |
| 단원 학습 - live-code 실행 | ✅ 완전 구현 | Pyodide |
| 퀴즈 풀기 | ✅ 완전 구현 | 채점 후 DB 저장 |
| 코딩 문제 풀기 | ⚠️ 부분 구현 | UI 완성, 백엔드 라우트 누락 (항상 404) |
| 수행활동 - 코드 작성/실행 | ✅ 완전 구현 | |
| 수행활동 - 힌트 보기 | ✅ 완전 구현 | 단계별 공개 |
| 수행활동 - 채점/제출 | ⚠️ 부분 구현 | UI 동작하나 일부 gradingType 오작동 (하단 참고) |
| 배지 확인 | ❌ 미구현 | DB 저장은 되나 조회 API 없음 |
| 자유 실습 (Playground) | ✅ 완전 구현 | |
| TTS 급식 알림 | ✅ 완전 구현 | Web Speech API + Pyodide speak() |

### 4-2. 교사 기능

| 기능 | 구현 상태 | 비고 |
|------|----------|------|
| 교사 대시보드 (통계) | ✅ 완전 구현 | 학생 수, 단원 완료율, 수행활동 제출/점수 |
| 학생 목록 조회 | ✅ 완전 구현 | |
| 학생 상세 (진도 확인) | ✅ 완전 구현 | |
| 수행활동 제출 목록 조회 | ✅ 완전 구현 | 코드 내용 포함 |
| 교사 계정 생성 | ❌ 미구현 | seed.sql 직접 수정 또는 DB 직접 수정만 가능 |

### 4-3. 인프라 / 백엔드

| 항목 | 상태 | 비고 |
|------|------|------|
| API 인증 (JWT) | ✅ 완전 구현 | 24시간 만료 |
| CORS 설정 | ⚠️ 부분 구현 | `*.workers.dev`, `*.pages.dev`, `localhost:5173`만 허용. 커스텀 도메인 미지원 |
| Cloudflare D1 연동 | ✅ 완전 구현 | |
| 정적 파일 서빙 (Workers Sites) | ✅ 완전 구현 | SPA fallback 포함 |
| 부정행위 방지 (anticheat) | ⚠️ 최소 구현 | 코드 길이, stdout 존재 여부만 체크 |

---

## 5. 알려진 버그 및 결함

### Critical (기능 오작동)

**1. 채점 로직(grader.ts) 다수 불일치**

| gradingType | 문제 | 실제 활동 내용 |
|-------------|------|--------------|
| `dict-state` (activity2) | '야구공', '농구공', '테니스공'을 검증 | activity2 실제 내용은 '연필', '볼펜' 재고 관리 |
| `scenario` (activity5) | '승!', '패!', '무승부!'를 검증 | activity5 실제 출력은 '이겼습니다!', '졌습니다!' |
| `file-io` (activity6) | 'baps.txt' 파일을 검증 | activity6 실제 코드는 'paps.txt' 생성 |
| `tts` (activity4) | stdout에 '메뉴' 문자열만 있으면 통과 | 실제 메뉴 내용과 무관하게 통과 |

**2. 코딩 문제 제출 API 누락**
- `LessonCoding.tsx` 20행: `POST /api/lessons/:id/coding` 호출
- `worker/routes/lessons.ts`에 해당 라우트 없음 → 항상 404 응답

### High (데이터 불일치)

**3. 대시보드 하드코딩**
- `Dashboard.tsx` 38행: 수행활동 완료 수 `0/6` 고정
- `Dashboard.tsx` 43행: 배지 수 `0` 고정
- 배지 저장 API(`/api/lessons/:id/quiz`, `/api/activities/:id/submit`)는 badges 테이블에 INSERT하지만, 조회 엔드포인트가 없음

**4. StudentDetail.tsx 단원명 불일치**
- `LESSON_TITLES = ['입출력', '변수/자료형', '조건문', '반복문', '함수', '파일']`
- 실제 콘텐츠 및 TeacherDashboard와 불일치

### Medium (보안 / 안정성)

**5. JWT 만료 후 미처리**
- 토큰 만료 시 프론트엔드에서 갱신 또는 로그아웃 로직 없음
- 만료된 토큰이 localStorage에 남아 로그인 상태처럼 보이나 모든 API 호출이 401 반환

**6. Pyodide Worker 타임아웃 미처리**
- `usePyodide.ts`: 10초 타임아웃 후 `clearTimeout`만 호출, `worker.terminate()` 미호출
- 무한루프 코드 실행 시 Worker가 계속 CPU 소비

**7. JWT_SECRET 하드코딩**
- `wrangler.toml` 14행: `JWT_SECRET = "dev-secret-change-in-production"`
- 프로덕션 배포에서도 동일 값 사용 중

**8. 클라이언트 측 채점**
- 채점은 브라우저의 `grader.ts`에서 수행, 서버는 전달된 `score` 값을 신뢰하여 저장
- DevTools로 score 값을 조작하면 임의 점수 제출 가능

---

## 6. 미구현 / 향후 개발 필요 항목

| 우선순위 | 항목 |
|---------|------|
| P0 | grader.ts 채점 로직 각 활동과 일치하도록 수정 |
| P0 | `POST /api/lessons/:id/coding` 백엔드 라우트 추가 |
| P0 | 대시보드 수행활동 완료 수 실제 API 데이터로 연동 |
| P1 | 배지 조회 API 엔드포인트 추가 및 프론트엔드 표시 |
| P1 | JWT 만료 시 자동 로그아웃 처리 |
| P1 | StudentDetail.tsx 단원명 수정 |
| P1 | Pyodide Worker 무한루프 방지 (terminate 호출) |
| P2 | JWT_SECRET 환경변수 분리 (Cloudflare Workers Secret 사용) |
| P2 | 교사 계정 생성 UI 또는 관리 도구 |
| P2 | 커스텀 도메인 CORS 지원 |
| P3 | 서버 측 채점으로 전환 (보안 강화) |
| P3 | Pyodide Worker 싱글톤화 (메모리 최적화) |
| P3 | 비밀번호 정책 추가 (최소 길이 등) |

---

## 7. 제약사항

- **Python 실행**: Pyodide CDN(`cdn.jsdelivr.net`) 의존. 네트워크 단절 또는 CDN 장애 시 Python 실행 불가.
- **모바일 에디터**: 768px 이하에서 Monaco Editor 대신 textarea 사용. 구문 강조 없음.
- **교사 계정**: 별도 생성 UI 없음. 현재는 `npm run db:seed -- --remote`로 T0001/teacher123 계정만 존재.
- **수행활동 제출 횟수**: `is_final=1` 최종 제출은 중복 방지되나, 일반 제출(`is_final=0`)은 횟수 제한 없음.
- **TTS**: 브라우저 Web Speech API 의존. 지원하지 않는 브라우저에서 음성 출력 불가 (텍스트 출력은 정상).
