import type { ActivityData } from './types'

export const activity5: ActivityData = {
  id: 5,
  title: '가위바위보 프로그램',
  icon: '✂️',
  objective: '문제 상황에 맞는 사용자 함수를 정의하고 결괏값을 반환하는 프로그램을 작성할 수 있다.',
  description: `컴퓨터와 '가위바위보'를 하는 프로그램을 작성해 보자. 단, **사용자 선택**, **컴퓨터 선택**, **승자 계산**에 관한 내용은 함수를 정의하고 이를 호출하여 사용한다.

다음의 실행 결과를 참고하여 빈칸을 채워 프로그램을 완성해 보자.`,
  targetOutput: `가위, 바위, 보 중 하나를 선택하세요: 가위
* 사용자 선택: 가위
* 컴퓨터 선택: 보
* 사용자가 이겼습니다!

가위, 바위, 보 중 하나를 선택하세요: 보
* 사용자 선택: 보
* 컴퓨터 선택: 가위
* 컴퓨터가 이겼습니다!

가위, 바위, 보 중 하나를 선택하세요: 보자기
잘못된 입력입니다. 다시 시도하세요.`,
  relatedLessons: [5],
  starterCode: `# 빈칸을 채우세요 (랜덤 모듈 불러오기)

# 빈칸을 채우세요 (사용자에게 가위, 바위, 보를 입력받아 사용자의 선택을 결정하는 함수 정의하기)
# (가위, 바위, 보 이외의 다른 하나를 선택하면 "잘못된 입력입니다. 다시 시도하세요." 출력)

# 빈칸을 채우세요 (컴퓨터의 선택을 결정하는 함수 정의하기)

# 컴퓨터와 사용자의 가위바위보 결과를 계산하는 함수 정의하기
def determine_winner(user_choice, computer_choice):
    if user_choice == computer_choice:
        return '비겼습니다!'
    elif (user_choice == '가위' and computer_choice == '보') or \\
         (user_choice == '바위' and computer_choice == '가위') or \\
         (user_choice == '보' and computer_choice == '바위'):
        return '사용자가 이겼습니다!'
    else:
        return '컴퓨터가 이겼습니다!'

# 빈칸을 채우세요 (사용자 및 컴퓨터 선택 - 함수 호출하기)
`,
  hints: [
    '①: import random 으로 랜덤 모듈을 불러오세요.',
    '②: def get_user_choice(): 로 함수를 정의하고, while True 루프 안에서 input() 으로 입력받으세요.',
    '②: if choice in ["가위", "바위", "보"]: return choice 로 유효한 입력이면 반환하고, else: print("잘못된 입력입니다. 다시 시도하세요.") 로 안내하세요.',
    '③: def get_computer_choice(): 로 함수를 정의하고, return random.choice(["가위", "바위", "보"]) 를 반환하세요.',
    '④: user_choice = get_user_choice() 와 computer_choice = get_computer_choice() 로 함수를 호출하세요.',
    '④: result = determine_winner(user_choice, computer_choice) 로 결과를 구한 후 * 사용자 선택, * 컴퓨터 선택, * 결과 순으로 출력하세요.',
  ],
  testCases: [
    {
      id: 1,
      description: '가위바위보 결과 출력 확인',
      inputs: ['보자기', '보'],
      expectedOutput: '잘못된 입력',
    },
  ],
  gradingType: 'scenario',
}
