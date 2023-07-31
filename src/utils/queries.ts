'use client';

import { QueryClient } from '@tanstack/react-query';
import {
  findSystemTasks,
  findTaskItems,
  FindTaskItemsProps,
} from '@/server/actions';
import loadAppNavigation from '@/server/navigation';
import logger from '@/utils/logging';

// https://tanstack.com/query/v4/docs/react/community/lukemorales-query-key-factory

export const queries = {
  items: {
    queryKey: ['items'],
    systemTasks: {
      queryKey: ['items', 'systemTasks'],
      list: () => ({
        queryKey: ['items', 'systemTasks', 'list'],
        queryFn: () => {
          logger.debug('Finding system task items');
          return findSystemTasks();
        },
      }),
    },
    userTasks: {
      queryKey: ['items', 'userTasks'],
      list: (parent: FindTaskItemsProps) => ({
        queryKey: ['items', 'userTasks', 'list', parent],
        queryFn: () => {
          logger.debug('Finding task items');
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
