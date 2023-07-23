'use client';

import TaskListItem from '@atoms/TaskListItem';
import { TaskItem } from '@/types/components';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@/utils/queries';
import systemIds from '@db/tasks';
import React from 'react';

interface Props {
  initialTasks: TaskItem[];
}

export default function TaskList({ initialTasks }: Props) {
  const { data: tasks } = useQuery(
    queries.taskItems.list({ systemId: systemIds.inbox }),
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
