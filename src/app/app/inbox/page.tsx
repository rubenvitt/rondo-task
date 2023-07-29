'use server';

import React from 'react';
import TaskList from '@/components/molecules/TaskList';
import TaskInput from '@atoms/TaskInput';
import { findTaskItems } from '@/server/actions';
import systemIds from '@db/tasks';
import SidebarLayout from '@templates/SidebarLayout';

export default async function InboxPage() {
  return (
    <SidebarLayout>
      <div className="flex flex-col gap-4 flex-1">
        <TaskInput />
        <div>
          <TaskList
            initialTasks={await findTaskItems({
              systemId: systemIds.inbox,
            })}
          />
        </div>
      </div>
    </SidebarLayout>
  );
}
