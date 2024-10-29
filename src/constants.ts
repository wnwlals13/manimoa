export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PASSWORD_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}/i;
export const CUSTOM_NAV_PATHS: Record<string, string> = {
  '/mypage/edit': '프로필 수정',
  '/mypage/edit-goals': '목표 설정',
  '/feed/form': '글 작성',
} as const;
