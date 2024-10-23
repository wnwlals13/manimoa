'use server';

import { cookies } from 'next/headers';
import { ProfileFormInputs } from '../(with-nav)/user/edit/page';

export async function updateUserProfile(data: ProfileFormInputs) {
  try {
    console.log(data);
    const token = cookies().get('accessToken');
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile/edit`,
    //   {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   },
    // );
    const uploads = await fetch(`/api/imgupload`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return uploads;
    // if (!response.ok) {
    //   console.error('failed to update profile', response.statusText);
    //   throw new Error();
    // }
    // const result = await response.json();
    // console.log('server actions : ', result);
    // return result;
  } catch (err) {
    console.error(err);
  }
}
