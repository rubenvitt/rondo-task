'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Transition } from '@headlessui/react';
import TaskListItem from '@atoms/TaskListItem';
import { TaskItem } from '@/types/components';
import { queries } from '@/utils/queries';
import systemIds from '@db/tasks';
import { ParentItemProps } from '@/server/actions';

interface Props {
  initialTasks: TaskItem[];
  parent: ParentItemProps;
}

export default function TaskList({ initialTasks, parent }: Props) {
  const { data: tasks } = useQuery(
    queries.items.user.list({ systemId: systemIds.inbox }).queryKey,
    queries.items.user.list({ systemId: systemIds.inbox }).queryFn
  );

  return (
    <ul className="w-full divide-y divide-gray-200 transition">
      {/* todo: animation for new elements */}
      {tasks?.map(task => (
        <Transition
          key={task.id}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          show
        >
          <TaskListItem taskItem={task} parent={parent} />
        </Transition>
      ))}
    </ul>
  );
}
