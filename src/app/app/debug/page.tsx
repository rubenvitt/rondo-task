'use server';

import SidebarLayout from '@/components/templates/SidebarLayout';
import React from 'react';
import loadAppNavigation from '@/server/navigation';
import appTheme from '@/server/appTheme';

export default async function DebugPage() {
  const [navigation, theme] = await Promise.all([
    loadAppNavigation(),
    appTheme(),
  ]);

  return (
    <SidebarLayout initialNavigation={navigation}>Debug page</SidebarLayout>
  );
}
