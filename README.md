# Manimoa(마니모아) 🐭

![thumbnail](https://github.com/user-attachments/assets/f0c6da4f-688c-4a9a-999d-e6dc15f4e0a8)

<div align="center"> 텅장되기 쉬운 요즘 고물가 시대, 친구들과 오순도순 대화하며<br/> <b>알뜰한 소비 습관</b>을 공유하는 SNS 서비스 <br/><br/> 🔗 사이트 링크 : https://dev-manimoa.vercel.app/</div>

<br/>

## 프로젝트 진행기간

2024.10.16 ~ 2024.11.16

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

![login](https://github.com/user-attachments/assets/ed7a13f2-9276-4310-bf33-3c02fdc619ff)
![register](https://github.com/user-attachments/assets/9bc54386-4a5d-4c21-9a70-3848fcc59f33)

</details>

- 폼 유효성 검증 (이메일/비밀번호)
- 로그인 후 회원정보 전역상태 관리

<details><summary> 전체 피드 조회
</summary>

![main](https://github.com/user-attachments/assets/1aff78a3-c788-4908-a5a3-c8016f560b46)

</details>

- 업로드 최신 순으로 정렬되어 조회
- 무한스크롤을 활용한 페이지네이션
- Prefetch를 이용한 첫 페이지 데이터 서버 렌더링
- 이미지 캐러셀을 통해 피드 이미지 전환

<details><summary> 피드 상세보기
</summary>

![feed-detail](https://github.com/user-attachments/assets/eaf0d967-d807-4ee3-a284-db66180b513c)

</details>

- 피드 선택 -> 피드 상세보기 페이지로 이동

<details><summary> 댓글 작성
</summary>

![comment-1](https://github.com/user-attachments/assets/1ca28a04-a7f5-43e7-b301-aa7e6eae9d2f)
![comment-2](https://github.com/user-attachments/assets/03842531-609a-41f8-8730-6c78e958ad67)

</details>

- 댓글 버튼 선택 -> 피드별 댓글 최신순 조회
- 무한스크롤을 활용한 페이지네이션
- 댓글 작성, 수정, 삭제

<details><summary> 좋아요 기능
</summary>

![likes](https://github.com/user-attachments/assets/051ed9a2-72b1-4030-90d3-db401209d35f)

</details>

- 좋아요 버튼 선택해 피드 좋아요
- 좋아요한 버튼 다시 선택하면 피드 좋아요 해제

<details><summary> 팔로우/언팔로우
</summary>

![follow](https://github.com/user-attachments/assets/b731783d-b03c-4dfe-af90-aa1ce5dedf03)

</details>

- 팔로우 버튼 선택해 해당 유저 팔로우
- 팔로잉 버튼 선택해 해당 유저 언팔로우

<details><summary> 1:1 채팅
</summary>

![chat](https://github.com/user-attachments/assets/b76cc37b-71c6-49b5-9f36-0bbd731b6670)
![chat-new](https://github.com/user-attachments/assets/f7f0b716-a483-4834-bc58-c87447b20b33)
![chat-delete](https://github.com/user-attachments/assets/75d7f535-9963-4591-b87d-473f4f51478f)

</details>

- 다른 유저 검색 기능
- 다른 유저와 1:1 실시간 채팅
- 이전 채팅 내역 조회
- 참여중인 채팅 목록 조회
- 참여중인 채팅 나가기 기능

<details><summary> 개인 정보 관리
</summary>

![mypage-edit-profile](https://github.com/user-attachments/assets/5190182b-00c7-4404-adcd-f8690e3859d2)
![mypage-edit-goal](https://github.com/user-attachments/assets/6c1cfcdd-21cd-447c-a8d6-0c0f8f9cfee3)

</details>

- 프로필, 이름 수정 기능
- 월별 소비 목표 및 소비 다짐 기록 기능
- 내 피드 모아보기 기능

</br>

## 아키텍처

![아키텍처 설계도](https://github.com/user-attachments/assets/a63e66b8-5038-408c-909c-34caea796229)

</br>

## ERD

<details><summary> ERD 설계도
</summary>

![drawSQL-image-export-2024-11-27](https://github.com/user-attachments/assets/a48c5ab7-abd2-458d-9f2a-de63b44b9aca)

</details>

</br>

## 폴더구조

```
📦src
 ┣ 📂actions
 ┣ 📂app
 ┃ ┣ 📂(afterLogin)
 ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┣ 📂feed
 ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂user
 ┃ ┣ 📂(beforeLogin)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┗ 📂register
 ┃ ┣ 📂@modal
 ┃ ┣ 📂api
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂config
 ┣ 📂lib
 ┣ 📂store
 ┣ 📂stories
 ┣ 📂util
```

<ul>
 <li>app : 라우트 폴더 디렉토리</li>
 <ul>
  <li>(afterLogin) : 로그인 시, 접근 가능한 라우트 폴더</li>
  <li>(beforeLogin) : 로그인 전, 접근 가능한 라우트 폴더</li>
 </ul>
 <li>assets : 이미지 파일 저장소</li>
 <li>components : 공용 컴포넌트</li>
 <li>config : Database 및 기타 설정 파일</li>
 <li>lib : 공용 훅 파일</li>
 <li>store : Zustand 전역 상태 관리 파일</li>
 <li>stories : Storybook 파일</li>
 <li>util : 공용 유틸 함수 파일</li>
</ul>
