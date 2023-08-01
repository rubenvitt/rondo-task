'use client';

import { QueryClient } from '@tanstack/react-query';
import {
  findSystemTasks,
  findTaskItems,
  FindTaskItemsProps,
} from '@/server/actions';
import loadAppNavigation from '@/server/navigation';
import logger from '@/utils/logging';
import { NewUserProps, setupNewUser, user } from '@/server/user';

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
  user: {
    queryKey: ['user'],
    setupAccount: {
      queryFn: (newUser: NewUserProps) => setupNewUser(newUser),
      queryKey: ['user', 'register'],
    },
    info: {
      queryFn: () => user(),
      queryKey: ['user', 'info'],
    },
  },
};

export const queryClient = new QueryClient();
