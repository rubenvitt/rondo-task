'use server';

import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/utils/queries';
import loadAppNavigation from '@/server/navigation';
import SidebarLayout from '@templates/SidebarLayout';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navigation] = await Promise.all([loadAppNavigation()]);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarLayout initialNavigation={navigation}>{children}</SidebarLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
