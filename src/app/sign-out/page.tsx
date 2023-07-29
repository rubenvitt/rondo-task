'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUser from '@/hooks/user.hook';
import { removeRefreshToken } from '@/server/actions';

export default function SignOutPage() {
  const { passageUser, user } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    passageUser
      .signOut()
      .then(async () => {
        if (user?.id) await removeRefreshToken(user.id);
      })
      .then(() => push('/'));
  }, [passageUser, push, user?.id]);
}
