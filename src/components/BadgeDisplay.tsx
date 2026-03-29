interface Badge {
  id: string
  label: string
  icon: string
  description: string
  earned: boolean
}

function getBadges(earnedIds: string[]): Badge[] {
  const all: Badge[] = [
    { id: 'lesson_complete_1', label: '1단원 완료', icon: '📖', description: '입력과 출력 단원 완료', earned: false },
    { id: 'lesson_complete_2', label: '2단원 완료', icon: '📖', description: '변수와 자료형 단원 완료', earned: false },
    { id: 'lesson_complete_3', label: '3단원 완료', icon: '📖', description: '선택구조 단원 완료', earned: false },
    { id: 'lesson_complete_4', label: '4단원 완료', icon: '📖', description: '반복구조 단원 완료', earned: false },
    { id: 'lesson_complete_5', label: '5단원 완료', icon: '📖', description: '함수 단원 완료', earned: false },
    { id: 'lesson_complete_6', label: '6단원 완료', icon: '📖', description: '파일 처리 단원 완료', earned: false },
    { id: 'activity_perfect_1', label: '수행1 만점', icon: '🏆', description: '사물함 번호 100점', earned: false },
    { id: 'activity_perfect_2', label: '수행2 만점', icon: '🏆', description: '재고 관리 100점', earned: false },
    { id: 'activity_perfect_3', label: '수행3 만점', icon: '🏆', description: '복리이자 100점', earned: false },
    { id: 'activity_perfect_4', label: '수행4 만점', icon: '🏆', description: '급식 TTS 100점', earned: false },
    { id: 'activity_perfect_5', label: '수행5 만점', icon: '🏆', description: '가위바위보 100점', earned: false },
    { id: 'activity_perfect_6', label: '수행6 만점', icon: '🏆', description: '체력 평가 100점', earned: false },
    { id: 'streak_3', label: '3일 연속', icon: '🔥', description: '3일 연속 학습', earned: false },
    { id: 'streak_7', label: '7일 연속', icon: '🔥', description: '7일 연속 학습', earned: false },
    { id: 'all_lessons', label: '모든 단원 완료', icon: '🎓', description: '6개 단원 모두 완료', earned: false },
    { id: 'all_activities', label: '모든 수행 완료', icon: '🌟', description: '6개 수행활동 모두 제출', earned: false },
  ]
  return all.map(b => ({ ...b, earned: earnedIds.includes(b.id) }))
}

interface Props {
  earnedIds: string[]
  showAll?: boolean
}

export function BadgeDisplay({ earnedIds, showAll = true }: Props) {
  const badges = getBadges(earnedIds)
  const displayed = showAll ? badges : badges.filter(b => b.earned)

  if (displayed.length === 0) {
    return <p className="text-sm text-gray-400">아직 획득한 배지가 없습니다.</p>
  }

  return (
    <div className="flex flex-wrap gap-3">
      {displayed.map(b => (
        <div
          key={b.id}
          title={b.description}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center w-20 transition-all ${
            b.earned
              ? 'bg-yellow-50 border-yellow-300 shadow-sm'
              : 'bg-gray-50 border-gray-200 opacity-40 grayscale'
          }`}
        >
          <span className="text-2xl">{b.icon}</span>
          <span className="text-xs font-medium text-gray-700 leading-tight">{b.label}</span>
        </div>
      ))}
    </div>
  )
}
