'use server';

import { ProfileFormInputs } from '../(with-nav)/user/edit/page';

export async function updateUserProfile(data: ProfileFormInputs) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile/edit`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    // const uploads = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/imgupload`,
    //   {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   },
    // );

    if (!response.ok) {
      console.error('failed to update profile', response.statusText);
      throw new Error();
    }
    const result = await response.json();
    console.log('server actions : ', result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
