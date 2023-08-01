'use server';

import React from 'react';
import SidebarLayout from '@/components/templates/SidebarLayout';
import loadAppNavigation from '@/server/navigation';
import appTheme from '@/server/appTheme';
import { user } from '@/server/user';

export default async function DebugPage() {
  const [navigation, theme, userInfo] = await Promise.all([
    loadAppNavigation(),
    appTheme(),
    user(),
  ]);

  return (
    <SidebarLayout initialNavigation={navigation} initialUser={userInfo!!}>
      Debug page
    </SidebarLayout>
  );
}
