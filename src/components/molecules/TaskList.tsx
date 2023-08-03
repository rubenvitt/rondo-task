'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TaskListItem from '@atoms/TaskListItem';
import { TaskItem } from '@/types/components';
import { queries } from '@/utils/queries';
import systemIds from '@db/tasks';

interface Props {
  initialTasks: TaskItem[];
}

export default function TaskList({ initialTasks }: Props) {
  const { data: tasks } = useQuery(
    queries.items.user.list({ systemId: systemIds.inbox }).queryKey,
    queries.items.user.list({ systemId: systemIds.inbox }).queryFn,
    {
      initialData: initialTasks,
    }
  );

  return (
    <ul className="w-full divide-y divide-gray-200">
      {tasks?.map(task => <TaskListItem item={task} key={task.id} />)}
    </ul>
  );
}
