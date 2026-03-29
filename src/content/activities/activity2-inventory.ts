import type { ActivityData } from './types'

export const activity2: ActivityData = {
  id: 2,
  title: '재고 관리 프로그램',
  icon: '📦',
  objective: '변수와 자료형을 활용한 프로그램을 작성할 수 있다.',
  description: `상점에서는 보유 중인 물건의 재고 관리가 필요하고, 판매할 물건이 확인되면 재고 상황 변동이 이루어져야 합니다.

다음 실행 결과를 참고하여 문구점 **재고 관리 프로그램**을 완성해 보세요.`,
  targetOutput: `추가할 상품명을 입력하세요: 연필
추가할 상품명을 입력하세요: 볼펜
추가할 상품명을 입력하세요: 연필
현재 재고: [('볼펜', 1), ('연필', 2)]
판매할 상품명을 입력하세요: 볼펜
현재 재고: [('볼펜', 0), ('연필', 2)]`,
  relatedLessons: [2],
  starterCode: `inventory = {}
item = input('추가할 상품명을 입력하세요: ')
number = inventory.get(item, 0) + 1

# 빈칸을 채우세요

item = input('추가할 상품명을 입력하세요: ')
number = inventory.get(item, 0) + 1

# 빈칸을 채우세요

item = input('추가할 상품명을 입력하세요: ')
number = inventory.get(item, 0) + 1

# 빈칸을 채우세요

sorted_inventory = sorted(inventory.items())
print('현재 재고:', sorted_inventory)
item = input('판매할 상품명을 입력하세요: ')
number = inventory.get(item, 0) - 1
inventory[item] = number
sorted_inventory = sorted(inventory.items())
print('현재 재고:', sorted_inventory)
`,
  hints: [
    'inventory[item] = number 로 딕셔너리에 상품과 수량을 저장하세요.',
    '세 개의 빈칸 모두 같은 코드를 작성하면 됩니다.',
    'inventory.get(item, 0) 은 item이 없으면 0을 반환합니다.',
  ],
  testCases: [
    {
      id: 1,
      description: '연필 2개·볼펜 1개 추가 후 볼펜 판매',
      inputs: ['연필', '볼펜', '연필', '볼펜'],
      expectedOutput: "현재 재고: [('볼펜', 1), ('연필', 2)]",
    },
  ],
  gradingType: 'io-match',
}
