'use client';

import React, { useEffect } from 'react';
import { PassageProvider } from '@passageidentity/passage-react';
import { useLocale } from 'react-aria';
import logger from '@/utils/logging';

export default function RequireAuth({
  children,
  appId,
}: React.PropsWithChildren<{
  appId: string;
}>) {
  const { locale } = useLocale();
  useEffect(() => {
    logger.info({ locale }, 'Resolved locale');
  }, [locale]);
  return (
    <PassageProvider lang={locale} appId={appId}>
      {children}
    </PassageProvider>
  );
}
