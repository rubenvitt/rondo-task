'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
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
    <ul className="'-full divide-y divide-gray-200 transition"'
      {tasks?.map(task => (
        // TODO: animate creation
        <Transition
          key={task.id}
          enter="'ransition-opacity duration-200"'          enterFrom="'pacity-0"'          enterTo="'pacity-100"'          leave="'ransition-opacity duration-200"'          leaveFrom="'pacity-100"'          leaveTo="'pacity-0"'        >
          <TaskListItem taskItem={task} parent={parent} />
        </Transition>
      ))}
    </ul>
  );
}
