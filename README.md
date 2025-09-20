🍚 DutchPay
Next.js(프론트) + NestJS(백엔드) + MySQL을 사용한 글로벌캠퍼스 더치페이 웹

🚀 실행 방법
# 1) 레포 클론
git clone https://github.com/babgroup/Dutchpay
cd babgroup-dutchPay

# 2) .env 생성 후 작성

# 3) 컨테이너 실행
docker compose up -d

접속 경로

프론트엔드(Next): http://localhost:3000

백엔드(Nest API): http://localhost:3001

MySQL(호스트 접속): 127.0.0.1:3301

mysql -h 127.0.0.1 -P 3301 -u user -p1234 db

🧭 Git 규칙
커밋 규칙

🎉 begin — 프로젝트 시작

✨ feat — 기능 추가/변경

🐛 fix — 버그 수정

✏️ chore — 패키지/빌드/기타 변경(예: .gitignore)

📖 docs — 문서/주석 변경

🔥 remove — 코드/파일 삭제

🎨 style — 포맷/스타일(동작 변화 없음)

🔨 refactor — 리팩터링(동작 변화 없음)

✅ test — 테스트 추가/수정

예) feat(restaurant): add list endpoint

브랜치 규칙

feature/<기능요약> — 기능 개발/개선

bugfix/issue-#<번호> — 버그 수정

그 외는 커밋 타입 + 이슈번호 조합

예) remove/issue-#123