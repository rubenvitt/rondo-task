'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'react-aria-components';
import { TaskItem } from '@/types/components';
import { queries } from '@/utils/queries';
import InlineInput from '@atoms/InlineInput';

interface Props {
  item: TaskItem;
}

export default function TaskListItem({ item }: Props) {
  const { mutate } = useMutation(
    queries.items.user.update(item).queryKey,
    queries.items.user.update(item).mutate
  );

  return (
    <li className="py-4 overflow-ellipsis">
      <div className="relative flex items-start">
        {item.resolvable && (
          <div className="flex h-6 items-center">
            <Input
              defaultChecked={item.completed}
              onChange={({ target: { checked } }) =>
                mutate({ completed: checked })
              }
              type="checkbox"
              className="h-6 w-6 rounded-full border-gray-300 text-primary-600 focus:ring-primary-600 transition"
            />
          </div>
        )}
        <div className="ml-3 text-sm leading-6">
          <InlineInput
            label="Task name"
            defaultValue={item.label}
            onBlur={({ target: { value } }) => {
              if (value !== item.label) mutate({ label: value });
            }}
          />
          <p id="comments-description" className="text-gray-500">
            {JSON.stringify(item, null, 2)}
          </p>
        </div>
      </div>
    </li>
  );
}
