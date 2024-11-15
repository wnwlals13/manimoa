# 💸 manimoa (마니모아)

텅장되기 쉬운 요즘 고물가 시대, 친구들과 오순도순 대화하며 알뜰한 소비 습관을 공유하는 SNS 서비스
![thumbnail](https://github.com/user-attachments/assets/f0c6da4f-688c-4a9a-999d-e6dc15f4e0a8)

<br/>

## 프로젝트 진행기간

2024.10.16 ~ 2024.11.16

<br/>

## 실행 방법

1. 레포지토리 복제 후 의존성 설치

```
$ git clone https://github.com/wnwlals13/manimoa.git
$ npm install
```

2. 개발 서버 가동

```
npm run dev
```

3. 브라우저에서 실행

```
http://localhost:3000
```

<br/>

## 기술 스택

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

<br/>

## 주요 기능

<details><summary> 로그인/회원가입
</summary>

_Write here!_

</details>

- 폼 유효성 검증 (이메일/비밀번호)
- 로그인 후 회원정보 전역상태 관리

<details><summary> 전체 피드 조회
</summary>

_Write here!_

</details>

- 업로드 최신 순으로 정렬되어 조회
- 무한스크롤을 활용한 페이지네이션
- Prefetch를 이용한 첫 페이지 데이터 서버 렌더링
- 이미지 캐러셀을 통해 피드 이미지 전환

<details><summary> 피드 상세보기
</summary>

_Write here!_

</details>

- 피드 선택 -> 피드 상세보기 페이지로 이동

<details><summary> 댓글 작성
</summary>

_Write here!_

</details>

- 댓글 버튼 선택 -> 피드별 댓글 최신순 조회
- 무한스크롤을 활용한 페이지네이션
- 댓글 작성, 수정, 삭제

<details><summary> 좋아요 기능
</summary>

_Write here!_

</details>

- 좋아요 버튼 선택해 피드 좋아요
- 좋아요한 버튼 다시 선택하면 피드 좋아요 해제

<details><summary> 팔로우/언팔로우
</summary>

_Write here!_

</details>

- 팔로우 버튼 선택해 해당 유저 팔로우
- 팔로잉 버튼 선택해 해당 유저 언팔로우

<details><summary> 1:1 채팅
</summary>

_Write here!_

</details>

- 다른 유저 검색 기능
- 다른 유저와 1:1 실시간 채팅
- 이전 채팅 내역 조회
- 참여중인 채팅 목록 조회
- 참여중인 채팅 타가기 기능

<details><summary> 개인 정보 관리
</summary>

_Write here!_

</details>

- 프로필, 이름 수정 기능
- 월별 소비 목표 및 소비 다짐 기록 기능
- 내 피드 모아보기 기능

</br>

## 아키텍처

![아키텍처 설계도](https://github.com/user-attachments/assets/a2cf629a-ef97-4537-9dbc-9c5854151d4d)

</br>

## 폴더구조

```
📦src
 ┣ 📂actions
 ┣ 📂app
 ┃ ┣ 📂(afterLogin)
 ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┣ 📂addChat
 ┃ ┃ ┃ ┣ 📂editRoom
 ┃ ┃ ┃ ┣ 📂room
 ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┣ 📂feed
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┗ 📂form
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📂(custom-nav)
 ┃ ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┗ 📂edit-goals
 ┃ ┃ ┃ ┗ 📂(origin-nav)
 ┃ ┃ ┃ ┃ ┣ 📂@userFeeds
 ┃ ┃ ┃ ┃ ┣ 📂@userGoals
 ┃ ┃ ┃ ┃ ┣ 📂@userInfo
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┣ 📜error.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(beforeLogin)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┗ 📂register
 ┃ ┣ 📂@modal
 ┃ ┃ ┣ 📂@comment
 ┃ ┃ ┣ 📂@setting
 ┃ ┃ ┣ 📜default.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂chat
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┣ 📂feed
 ┃ ┃ ┣ 📂feedformeta
 ┃ ┃ ┣ 📂like
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📂user
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┣ 📜provider.tsx
 ┃ ┣ 📜robots.txt
 ┃ ┗ 📜sitemap.xml
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂config
 ┣ 📂lib
 ┣ 📂store
 ┣ 📂util
 ┃┗ 📂__test__
```
