import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Script from 'next/script';
import RequireAuth from '@atoms/RequireAuth';
import { classNames } from '@/utils/styling';
import { queryClient } from '@/utils/queries';
import { appTheme } from '@/server/appTheme';
import logger from '@/utils/logging';
import { requireEnv } from '@/utils/environment';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  themeColor: appTheme.colors.gray[900],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  logger.debug(appTheme.colors.primary[500], 'appTheme');

  return (
    <html className="h-full" lang="en">
      <Script
        src="https://kit.fontawesome.com/3ef2da1b02.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <QueryClientProvider client={queryClient}>
        <RequireAuth appId={requireEnv('PASSAGE_APP_ID')}>
          <body className={classNames(inter.className, 'h-full')}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </RequireAuth>
      </QueryClientProvider>
    </html>
  );
}
