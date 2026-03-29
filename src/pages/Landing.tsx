import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="text-8xl mb-6">🐍</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Python Coding Lab
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          고등학교 파이썬 프로그래밍 학습 플랫폼
        </p>
        <p className="text-gray-500 mb-8">
          브라우저에서 바로 파이썬 코드를 작성하고 실행해보세요.
          6개 단원 학습과 6개 수행활동으로 파이썬 기초를 완성합니다.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/login" className="btn-primary text-lg px-8 py-3">
            로그인
          </Link>
          <Link to="/register" className="btn-secondary text-lg px-8 py-3">
            회원가입
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div className="card">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold">6개 단원</div>
            <div className="text-sm text-gray-500">입출력부터 파일처리까지</div>
          </div>
          <div className="card">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-semibold">6개 수행활동</div>
            <div className="text-sm text-gray-500">실제 코딩 프로젝트</div>
          </div>
          <div className="card">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-semibold">브라우저 실행</div>
            <div className="text-sm text-gray-500">설치 없이 바로 시작</div>
          </div>
        </div>
      </div>
    </div>
  )
}
