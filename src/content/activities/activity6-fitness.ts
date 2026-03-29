import type { ActivityData } from './types'

export const activity6: ActivityData = {
  id: 6,
  title: '학생 건강 체력 평가',
  icon: '🏃',
  objective: '파일 입출력을 적용한 프로그램을 작성할 수 있다.',
  description: `오늘은 학생 건강 체력 평가의 날이다. 김OO 선생님은 고등학교 1학년 학생들의 체력을 평가한 내용을 다음과 같은 형식으로 구성하여 파일로 저장하려고 한다. (파일명은 \`paps.txt\`로 저장한다)

**왕복 오래달리기 항목**은 다음 측정 기준에 따라 등급을 계산하며, 해당 학번, 왕복 오래달리기 등급의 내용이 저장된다.

<table>
<thead><tr><th>구분</th><th>아주 낮음(5등급)</th><th>낮음(4등급)</th><th>보통(3등급)</th><th>높음(2등급)</th><th>아주 높음(1등급)</th></tr></thead>
<tbody>
<tr><td>왕복 오래달리기 횟수(회)</td><td>16~25</td><td>26~41</td><td>42~55</td><td>56~69</td><td>70~80</td></tr>
</tbody>
</table>

다음 코드의 나머지 부분을 채워 프로그램을 완성해 보자.`,
  targetOutput: `건강 체력 평가 관리 프로그램입니다.
학번/왕복 오래달리기/악력/제자리멀리뛰기를 공백으로 구분하여 입력하세요-> 10101 16 28 160
학번/왕복 오래달리기/악력/제자리멀리뛰기를 공백으로 구분하여 입력하세요-> 10102 56 35 220
학번/왕복 오래달리기/악력/제자리멀리뛰기를 공백으로 구분하여 입력하세요-> 10103 30 28 170
학번/왕복 오래달리기/악력/제자리멀리뛰기를 공백으로 구분하여 입력하세요->
파일이 생성되었습니다.
10101처리 중
10102처리 중
10103처리 중
왕복 오래달리기 등급 계산이 완료되었습니다.`,
  relatedLessons: [6],
  starterCode: `import os
os.chdir('/workspace')

print('건강 체력 평가 관리 프로그램입니다.')
file_w = open('paps.txt', 'w')
while True:
    content = input('학번/왕복 오래달리기/악력/제자리멀리뛰기를 공백으로 구분하여 입력하세요-> ')
    if content != '':

        # 빈칸을 채우세요 (content를 파일에 한 줄씩 쓰기)
        pass

    else:
        break
file_w.close()
print('파일이 생성되었습니다.')
read_f = open('paps.txt', 'r')
write_f = open('run.txt', 'w')
line = read_f.readline()

# 빈칸을 채우세요 (line이 있는 동안 반복하여 학번별 등급 계산)
# - data = line.split() 으로 각 항목 분리
# - data[0]: 학번, int(data[1]): 왕복 오래달리기 횟수
# - 횟수에 따라 등급 계산 (16~25: 아주 낮음, 26~41: 낮음, 42~55: 보통, 56~69: 높음, 70~80: 아주 높음)
# - print(f'{학번}처리 중') 출력
# - write_f.write(f'{학번} {등급}\\n') 으로 run.txt에 저장
# - line = read_f.readline() 으로 다음 줄 읽기

read_f.close()
write_f.close()
print('왕복 오래달리기 등급 계산이 완료되었습니다.')
`,
  hints: [
    '①(6행): file_w.write(content + "\\n") 으로 내용을 파일에 저장하세요.',
    '②(14행~): while line: 으로 반복문을 시작하세요.',
    '②: data = line.split() 으로 공백 기준으로 분리한 후 data[0]은 학번, int(data[1])은 왕복 오래달리기 횟수입니다.',
    '②: if/elif/else 로 횟수 범위에 따라 등급 변수를 설정하세요.',
    '②: print(f"{data[0]}처리 중") 으로 학번을 출력하고, write_f.write(f"{data[0]} {grade}\\n") 으로 run.txt에 저장하세요.',
    '②: 반복문 마지막에 line = read_f.readline() 으로 다음 줄을 읽으세요.',
  ],
  testCases: [
    {
      id: 1,
      description: '3명 입력 후 paps.txt 생성 확인',
      inputs: ['10101 16 28 160', '10102 56 35 220', '10103 30 28 170', ''],
      expectedOutput: 'paps.txt 생성',
    },
    {
      id: 2,
      description: 'run.txt 파일 생성 확인',
      inputs: ['10101 16 28 160', '10102 56 35 220', '10103 30 28 170', ''],
      expectedOutput: 'run.txt 생성',
    },
  ],
  gradingType: 'file-io',
}
