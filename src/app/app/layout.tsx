'use server';

import React from 'react';
import loadAppNavigation from '@/server/navigation';
import SidebarLayout from '@templates/SidebarLayout';
import { user } from '@/server/user';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navigation, userInfo] = await Promise.all([
    loadAppNavigation(),
    user(),
  ]);

  return (
    <SidebarLayout initialNavigation={navigation} initialUser={userInfo!!}>
      {children}
    </SidebarLayout>
  );
}
