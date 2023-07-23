'use server';

import React from 'react';
import TaskList from '@/components/molecules/TaskList';
import TaskInput from '@atoms/TaskInput';
import { findTaskItems } from '@/server/actions';

export default async function InboxPage() {
  return (
    <div className="flex flex-col p-4 gap-4">
      <TaskInput />
      <div>
        <TaskList initialTasks={await findTaskItems()} />
      </div>
    </div>
  );
}
