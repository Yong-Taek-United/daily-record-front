# daily-record

'하루를 기록해요'
<br />
<br />
프로젝트를 만들고 과제를 설정해 하루를 기록하는 웹 어플리케이션입니다.
기록한 내용이 달력에 시각적으로 표시되어 보다 즐겁게 과제를 수행할 수 있습니다.
<br />
<br />

## 제작 동기

회사 백엔드 동료분과 기술적 부재를 채우기 위해 퇴근 후 같이 고민하며 만들게 되었습니다.
<br />
<br />

## 프론트엔드 파트 기술

- Next.js 13(Page Router), React 18
  - Server-side Rendering, Client-side Rendering을 상황에 맞게 사용하였습니다.
  - Coustom Hook을 설계해 반복적인 로직을 처리하였습니다.
    - useForm Hook 구현하여 모든 form페이지에 활용 [코드 보기](https://github.com/Yong-Taek-United/daily-record-front/blob/main/src/hooks/useForm.tsx)
    - useCategories Hook 구현
  - 컴포넌트 설계와 재활용. [코드 보기](https://github.com/Yong-Taek-United/daily-record-front/tree/main/src/components)
  - 컴포넌트 간에 데이터 전달.
- TypeScript
  - Type Narrowing으로 개발 단에서 실수를 줄이고 보다 안전하고 높은 생산성으로 개발하였습니다.
- SWR
  - 데이터 캐싱 기능으로 불필요한 서버통신을 줄였습니다.
  - 자동 갱신 기능을 활용해 최신 데이터로 즉시 동기화하는데 사용하였습니다.
    - 회원가입 시 이메일 인증 확인
    - 유저 정보 동기화
- Axios
  - Server-side Rendering에도 활용할 수 있는 인터셉터를 구현하였습니다. [코드 보기](https://github.com/Yong-Taek-United/daily-record-front/blob/main/src/api/authInterceptorWithSSR.ts)
    - 유저 인증 검증
    - 쿠키 토큰 리프래시
  - API호출을 모듈화하여 중복 코드를 줄이고 재사용할 수 있게 하였습니다.
- Tailwind CSS
  - 반응형 웹 구성과 빠른 스타일 적용으로 적극 활용하였습니다.
- Git / Github
  - 형상 관리

<br />

## [백엔드 파트 보기](https://github.com/Yong-Taek-United/daily-record-back)

<br />

## 개발 진행

(2023-11 ~ 현재)

- 로그인
- 비밀번호 찾기
- 회원가입
- 회원 정보
  - 상세
  - 간단 소개 수정
- 프로젝트
  - 프로젝트 목록 (SSR) [코드 보기](https://github.com/Yong-Taek-United/daily-record-front/blob/06183410fcf85c6568b4523444b06cfd4ac70891/src/pages/projects/dash-board.tsx#L72-L111)
  - 프로젝트 생성 / 수정
- 과제
  - 과제 목록
  - 과제 생성 / 수정 / 삭제
- 달력
  - 달력 데이터 목록 (SSR)
- 액티비티
  - 액티비티 목록

<br />

2024.04.10 업데이트
