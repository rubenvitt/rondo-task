'use client';

import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { TaskItem } from '@/types/components';
import { toggleItem } from '@/server/actions';
import { classNames } from '@/utils/styling';
import { queries, queryClient } from '@/utils/queries';
import logger from '@/utils/logging';

interface Props {
  item: TaskItem;
}

export default function TaskListItem({ item }: Props) {
  const [checked, setChecked] = useState(item.completed);
  const { mutate } = useMutation(
    async (state: boolean) => toggleItem(item, state),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queries.items.queryKey);
      },
    }
  );

  useEffect(() => {
    logger.debug('update checked');
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
            {JSON.stringify(item)}
          </p>
        </div>
      </div>
    </li>
  );
}
