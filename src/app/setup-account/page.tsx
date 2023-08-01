'use server';

import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';
import SetupAccountForm from '@molecules/SetupAccountForm';
import { isUserNew } from '@/server/user';
import { userIdFromHeader } from '@/utils/client';

export default async function SetupAccountPage() {
  if (!(await isUserNew(userIdFromHeader()!!))) {
    redirect('/app', RedirectType.replace);
  }
  return <SetupAccountForm />;
}
