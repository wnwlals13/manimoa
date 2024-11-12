import { ResponseError } from '../../types';
import { LoginRequestDto, RegisterRequestDto } from './type';

export const userLogin = async (userInfo: LoginRequestDto) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      {
        method: 'post',
        body: JSON.stringify(userInfo),
      },
    );
    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.error) as ResponseError;
      err.status = response.status;
      throw err;
    }

    return responseData.user;
  } catch (error) {
    const err = error as ResponseError;
    console.error(`ERROR ${err.message}`);
    throw err;
  }
};

export const userRegister = async (userInfo: RegisterRequestDto) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      {
        method: 'post',
        body: JSON.stringify(userInfo),
      },
    );
    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.error) as ResponseError;
      err.status = response.status;
      throw err;
    }

    return responseData.user;
  } catch (error) {
    const err = error as ResponseError;
    console.error(`ERROR ${err.message}`);
    throw err;
  }
};
