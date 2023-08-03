'use server';

import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';
import SetupAccountForm from '@molecules/SetupAccountForm';
import { isUserNew } from '@/server/user';
import { userIdFromHeader } from '@/utils/client';
import AppLogo from '@atoms/AppLogo';

export default async function SetupAccountPage() {
  if (!(await isUserNew(userIdFromHeader()!!))) {
    redirect('/app', RedirectType.replace);
  }
  return (
    <div className="bg-gray-100 h-full flex items-center flex-col gap-4">
      <div className="bg-gray-900 p-6 text-white w-full">
        <AppLogo variation="light" />
      </div>
      <div className="p-12 bg-white rounded-md">
        <SetupAccountForm />
      </div>
    </div>
  );
}
