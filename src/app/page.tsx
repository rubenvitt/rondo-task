import React from 'react';
import Button from '@atoms/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button href="/app">Go to app</Button>
    </main>
  );
}
