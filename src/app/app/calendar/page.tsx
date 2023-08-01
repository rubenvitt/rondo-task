'use server';

import Calendar from '@components/organisms/Calendar';
import { createPassage } from '@/server/passage';
import { authCookie, userIdFromHeader } from '@/utils/client';

export default async function CalendarPage() {
  const { passage } = await createPassage();
  const userId = userIdFromHeader();

  const user = await passage.user.get(userId!!);

  return (
    <>
      <p>User is: {JSON.stringify(user)}</p>
      <p>Auth Cookie is: {JSON.stringify(authCookie())}</p>
      <Calendar />
    </>
  );
}
