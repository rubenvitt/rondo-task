'use client';

import {
  createQueryKeyStore,
  inferQueryKeyStore,
} from '@lukemorales/query-key-factory';
import { findTaskItems } from '@/server/actions';
import { QueryClient } from '@tanstack/react-query';

// https://tanstack.com/query/v4/docs/react/community/lukemorales-query-key-factory

export const queries = createQueryKeyStore<QueryKeys>({
  taskItems: {
    list: (list: string) => ({
      queryKey: [list],
      queryFn: () => {
        console.log('Finding task items');
        return findTaskItems(list);
      },
    }),
  },
});

export type QueryKeys = inferQueryKeyStore<typeof queries>;

export const queryClient = new QueryClient();
