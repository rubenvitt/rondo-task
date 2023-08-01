'use server';

import { redirect } from 'next/navigation';
import { userIdFromHeader } from '@/utils/client';
import { isUserNew } from '@/server/user';

export default async function App() {
  const userId = userIdFromHeader();
  if (!userId) {
    redirect('/sign-in');
  }
  if (await isUserNew(userId)) {
    redirect('/setup-account');
  }
  redirect('/app/inbox');
}
