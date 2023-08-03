'use client';

import { toast } from 'react-toastify';
import React from 'react';

export function DebugComponent() {
  return <button onClick={() => toast('Test', {})}>Zeige Toast</button>;
}
