'use client';

import React, { Fragment } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'react-aria-components';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEllipsisV } from '@fortawesome/pro-regular-svg-icons';
import { toast } from 'react-toastify';
import { TaskItem } from '@/types/components';
import { queries } from '@/utils/queries';
import InlineInput from '@atoms/InlineInput';
import { ParentItemProps } from '@/server/actions';
import { classNames } from '@/utils/styling';
import {
  defaultIconButtonClassName,
  defaultIconClassName,
  IconButton,
} from '@atoms/Button';

interface Props {
  taskItem: TaskItem;
  parent: ParentItemProps;
}

export default function TaskListItem({ taskItem, parent }: Props) {
  const { mutate } = useMutation(
    queries.items.user.update({ parent, taskItem }).queryKey,
    queries.items.user.update({ parent, taskItem }).mutate
  );

  return (
    <li className="py-4 overflow-ellipsis">
      <div className="relative flex items-start">
        {taskItem.resolvable && (
          <div className="flex h-6 items-center">
            <Input
              defaultChecked={taskItem.completed}
              onChange={({ target: { checked } }) =>
                mutate({
                  completed: checked,
                  completion_date: checked ? new Date() : null,
                })
              }
              type="checkbox"
              className="h-6 w-6 rounded-full border-gray-300 text-primary-600 focus:ring-primary-600 transition"
            />
          </div>
        )}
        <div className="ml-3 text-sm leading-6">
          <InlineInput
            label="Task name"
            defaultValue={taskItem.label}
            onBlur={({ target: { value } }) => {
              if (value !== taskItem.label) mutate({ label: value });
            }}
          />
          <p id="comments-description" className="text-gray-500">
            {JSON.stringify(taskItem, null, 2)}
          </p>
        </div>
        <div className="self-center">
          <ListItemAdditional item={taskItem} />
        </div>
      </div>
    </li>
  );
}

function ListItemAdditional({ item }: { item: TaskItem }) {
  return (
    <div className="flex gap-1">
      <IconButton
        label={`Plan ${item.label}`}
        icon={faClock}
        action={() => toast('This button needs implementation', {})}
      />
      <Menu as="div" className="relative flex-none">
        <Menu.Button className={defaultIconButtonClassName}>
          <span className="sr-only" />
          <FontAwesomeIcon
            icon={faEllipsisV}
            className={defaultIconClassName}
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                  )}
                >
                  Edit<span className="sr-only">, {item.label}</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                  )}
                >
                  Move<span className="sr-only">, {item.label}</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                  )}
                >
                  Delete<span className="sr-only">, {item.label}</span>
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
