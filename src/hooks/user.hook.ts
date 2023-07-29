import { useEffect, useMemo, useState } from 'react';
import {
  PassageUser,
  PassageUserInfo,
} from '@passageidentity/passage-elements/passage-user';
import { redirect } from 'next/navigation';

export default function useUser() {
  const [user, setUser] = useState<PassageUserInfo>();
  // eslint-disable-next-line consistent-return
  const passageUser = useMemo(() => {
    try {
      return new PassageUser();
    } catch (e) {
      redirect('/sign-in');
    }
  }, []);

  useEffect(() => {
    passageUser.userInfo().then(setUser);
  }, [passageUser]);

  return {
    user,
    passageUser,
  };
}
