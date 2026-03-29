import type { ActivityData } from './types'

export const activity4: ActivityData = {
  id: 4,
  title: '급식 메뉴 알림 TTS',
  icon: '🍽️',
  objective: '모듈 상황에 맞는 제어 구조를 선택하여 이를 적용한 프로그램을 작성할 수 있다.',
  description: `급식 알림 프로그램을 작성하려고 한다. 원하는 요일을 입력하면 해당 요일의 급식 메뉴를 알려드립니다. 오늘 메뉴는 유부 된장국, 사과 파인애플 샐러드, 두부 스틱, 배추김치, 주스, 오므라이스입니다. "안녕하세요! OO고등학교 월요일 급식을 알려드립니다. 맛있게 드세요."라는 안내를 입력하면 **종료**로 알려준다.

<table>
<thead><tr><th>구분</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th></tr></thead>
<tbody><tr>
<td>메뉴</td>
<td>유부 된장국, 사과 파인애플 샐러드, 무장아찌, 두부 스틱, 배추김치, 주스, 오므라이스</td>
<td>아채죽, 쇠고기 장조림, 감자튀김, 배추김치, 파김치, 오렌지주스, 햄버거</td>
<td>콩나물밥, 근대 된장국, 너비아니 간장조림, 특나물무침, 보쌈김치, 청포도</td>
<td>주꾸미 비빔밥, 맑은 수제비국, 고사리나물, 지짐 꽃전, 백김치, 딸기</td>
<td>계란 게살볶음밥, 참치 김치찌개, 꽃맛울 무침, 풋고추 열무볶음, 소시지볶음, 깍두기, 도시락 김, 아이스 수크림</td>
</tr></tbody>
</table>

다음의 실행 결과를 참고하여 나머지 코드를 채워 급식 메뉴를 완성해 보자.`,
  targetOutput: `원하는 요일을 입력하세요(예: 월): 월
유부 된장국, 사과 파인애플 샐러드, 무장아찌, 두부 스틱, 배추김치, 주스, 오므라이스
원하는 요일을 입력하세요(예: 월): 종료
종료합니다.`,
  relatedLessons: [4],
  starterCode: `# !pip install gTTS  (브라우저 환경에서는 speak() 함수가 gTTS 역할을 대신합니다)
# 급식 메뉴 알림 TTS
try:
    from gtts import gTTS
    from IPython.display import Audio
    from time import sleep
except ImportError:
    class gTTS:
        def __init__(self, text, lang='ko'): pass
        def save(self, path): pass
    display = lambda x: None
    Audio = lambda *a, **k: None
    sleep = lambda t: None
# 급식 메뉴
Monday = '유부 된장국, 사과 파인애플 샐러드, 무장아찌, 두부 스틱, 배추김치, 주스, 오므라이스'

# 빈칸을 채우세요 (화~금요일 메뉴 변수 정의)

while True:
    day = input("원하는 요일을 입력하세요(예: 월), 종료 시 '종료' 입력: ")

    # 빈칸을 채우세요 (조건문(if ~ else), 반복문(while))

    speak(text)
    tts = gTTS(text, lang = 'ko')
    tts.save('output.mp3')
    display(Audio('output.mp3', autoplay = True))
    sleep(1)
`,
  hints: [
    '①: Tuesday = "아채죽, ..." 형태로 화~금요일 메뉴 변수를 정의하세요.',
    '②: if day == "종료": print("종료합니다.") 후 break 로 반복을 종료하세요.',
    '②: elif day == "월": text = Monday 형태로 요일별 text 변수를 설정하세요.',
    '②: else: print("올바른 요일을 입력하세요.") 후 continue 로 다시 입력받으세요.',
    '②: print(text) 로 메뉴를 출력한 뒤 speak(text) 가 실행됩니다.',
  ],
  testCases: [
    {
      id: 1,
      description: '월요일 메뉴 조회 후 종료',
      inputs: ['월', '종료'],
      expectedOutput: '유부 된장국',
    },
  ],
  gradingType: 'tts',
}
