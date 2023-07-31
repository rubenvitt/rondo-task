'use client';

import {
  findSystemTasks,
  findTaskItems,
  FindTaskItemsProps,
} from '@/server/actions';
import { QueryClient } from '@tanstack/react-query';
import loadAppNavigation from '@/server/navigation';

// https://tanstack.com/query/v4/docs/react/community/lukemorales-query-key-factory

export const queries = {
  items: {
    queryKey: ['items'],
    systemTasks: {
      queryKey: ['items', 'systemTasks'],
      list: () => ({
        queryKey: ['items', 'systemTasks', 'list'],
        queryFn: () => {
          console.log('Finding system task items');
          return findSystemTasks();
        },
      }),
    },
    userTasks: {
      queryKey: ['items', 'userTasks'],
      list: (parent: FindTaskItemsProps) => ({
        queryKey: ['items', 'userTasks', 'list', parent],
        queryFn: () => {
          console.log('Finding task items');
          return findTaskItems(parent);
        },
      }),
    },
  },
  navigation: () => ({
    queryKey: ['navigation'],
    queryFn: () => loadAppNavigation(),
  }),
};

export const queryClient = new QueryClient();
