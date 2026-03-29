const tips = [
  '💡 Python에서 print()로 결과를 출력할 수 있어요',
  '💡 변수명은 영문 소문자와 밑줄(_)을 사용하세요',
  '💡 if문의 코드 블록은 4칸 들여쓰기를 사용해요',
  '💡 for i in range(10)은 0부터 9까지 반복해요',
  '💡 함수는 def 키워드로 정의해요',
  '💡 딕셔너리는 {키: 값} 형태로 사용해요',
]

interface Props {
  progress: number
}

export function PyodideLoader({ progress }: Props) {
  const tip = tips[Math.floor(Math.random() * tips.length)]

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-4xl mb-4 animate-bounce">🐍</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Python 환경 준비 중...</h3>

      <div className="w-64 bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mb-4">{progress}%</p>

      <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg max-w-xs">
        {tip}
      </div>
    </div>
  )
}
