'use client';

import { PassageAuth } from '@passageidentity/passage-react';
import React from 'react';
import AppPassageTheme from '@atoms/AppPassageTheme';

export default function SignIn() {
  return (
    <AppPassageTheme>
      <PassageAuth />
    </AppPassageTheme>
  );
}
