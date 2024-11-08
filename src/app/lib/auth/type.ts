export interface LoginResponseDto {
  uid: string;
  email: string;
  name: string;
  profileImg?: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterResponseDto {
  uid: string;
  email: string;
  name: string;
  profileImg?: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  name: string;
  goal?: string;
}
