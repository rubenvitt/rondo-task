'use client';

import {
  createQueryKeyStore,
  inferQueryKeyStore,
} from '@lukemorales/query-key-factory';
import {
  findSystemTasks,
  findTaskItems,
  FindTaskItemsProps,
} from '@/server/actions';
import { QueryClient } from '@tanstack/react-query';

// https://tanstack.com/query/v4/docs/react/community/lukemorales-query-key-factory

export const queries = createQueryKeyStore<QueryKeys>({
  systemTaskItems: {
    list: () => ({
      queryFn: () => {
        console.log('Finding system task items');
        return findSystemTasks();
      },
    }),
  },
  taskItems: {
    list: (parent: FindTaskItemsProps) => ({
      queryKey: [parent],
      queryFn: () => {
        console.log('Finding task items');
        return findTaskItems(parent);
      },
    }),
  },
});

export type QueryKeys = inferQueryKeyStore<typeof queries>;

export const queryClient = new QueryClient();
