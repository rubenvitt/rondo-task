'use client';

import { TaskItem } from '@/types/components';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queries, queryClient } from '@/utils/queries';
import { toggleItem } from '@/server/actions';
import { classNames } from '@/utils/styling';

interface Props {
  item: TaskItem;
}

export default function TaskListItem({ item }: Props) {
  const [checked, setChecked] = useState(item.completed);
  const { mutate } = useMutation(
    async (state: boolean) => toggleItem(item, state),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queries.taskItems);
      },
    }
  );

  useEffect(() => {
    console.log('update checked');
    mutate(checked);
  }, [checked]);

  return (
    <li className="py-4">
      <div className="relative flex items-start">
        {item.resolvable && (
          <div className="flex h-6 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              checked={checked}
              onChange={event => setChecked(event.target.checked)}
              className="h-6 w-6 rounded-full border-gray-300 text-primary-600 focus:ring-primary-600 transition"
            />
          </div>
        )}
        <div className="ml-3 text-sm leading-6">
          <label
            htmlFor="comments"
            className={classNames(
              checked ? 'text-gray-500' : 'font-medium text-gray-900',
              'transition'
            )}
          >
            {item.label}
          </label>
          <p id="comments-description" className="text-gray-500">
            Hier könnte noch was kommen
          </p>
        </div>
      </div>
    </li>
  );
}
