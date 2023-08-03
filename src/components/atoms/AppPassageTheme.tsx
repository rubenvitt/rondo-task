'use client';

import {
  PassageTheme,
  PassageThemeProps,
} from '@passageidentity/passage-react';
import { appTheme } from '@/server/appTheme';

const theme: PassageThemeProps = {
  activeColor: appTheme.colors.primary[500],
  containerBackgroundColor: 'green',
  bodyTextColor: 'red',
  buttonWidth: '500px',
  primaryColor: 'red',
};

export default function AppPassageTheme({ children }: React.PropsWithChildren) {
  return (
    <PassageTheme
      primaryColor={appTheme.colors.primary[500]}
      activeColor={appTheme.colors.primary[700]}
      bodyTextColor={appTheme.colors.gray[900]}
      buttonWidth="auto"
      errorColor={appTheme.colors.red[500]}
    >
      {children}
    </PassageTheme>
  );
}
