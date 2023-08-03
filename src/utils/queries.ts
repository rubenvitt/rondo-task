'use client';

import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';
import { User } from '@prisma/client';
import {
  createNewTaskItem,
  findSystemTasks,
  findTaskItems,
  NewTaskItem,
  ParentItemProps,
  patchItem,
} from '@/server/actions';
import loadAppNavigation, { AppNavigation } from '@/server/navigation';
import logger from '@/utils/logging';
import { NewUserProps, setupNewUser, user } from '@/server/user';
import { TaskItem } from '@/types/components';

export const staleTimes = {
  immediately: 0,
  short: 1_000, // 1s
  medium: 10_000, // 10s
  long: 30_000, // 30s
  veryLong: 300_000, // 5min
  veryVeryLong: 6_000_000, // 1 h
};

type QueryKey = any[];

type Query<T, X = never> = (props: X) => {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
  queryConfig?: QueryObserverOptions;
};

type Mutation<T, U, V = null> = (props: V) => {
  mutate: (props: T) => Promise<U>;
  queryKey: QueryKey;
  queryConfig?: QueryObserverOptions;
};

type QueriesType = {
  items: {
    queryKey: QueryKey;
    system: {
      queryKey: QueryKey;
      list: Query<TaskItem[]>;
    };
    user: {
      queryKey: QueryKey;
      list: Query<TaskItem[], ParentItemProps>;
      create: Mutation<NewTaskItem, TaskItem, ParentItemProps>;
      update: Mutation<
        Partial<TaskItem>,
        void,
        { parent: ParentItemProps; taskItem: TaskItem }
      >;
    };
  };
  navigation: Query<AppNavigation>;
  user: {
    queryKey: QueryKey;
    setupAccount: Mutation<NewUserProps, void>;
    info: Query<User>;
  };
};

export const queries: QueriesType = {
  items: {
    queryKey: ['items'],
    system: {
      queryKey: ['items', 'systemTasks'],
      list: () => ({
        queryKey: ['items', 'systemTasks', 'list'],
        queryFn: () => {
          logger.debug('Finding system task items');
          return findSystemTasks();
        },
      }),
    },
    user: {
      queryKey: ['items', 'userTasks'],
      list: (parent?: ParentItemProps) => ({
        queryKey: ['items', 'userTasks', 'list', parent!!],
        queryFn: () => {
          logger.debug('Finding task items');
          return findTaskItems(parent!!);
        },
      }),
      create: (parent: ParentItemProps) => ({
        queryKey: ['items', 'userTasks'],
        mutate: (item: NewTaskItem) => {
          logger.debug('Creating new task');
          return createNewTaskItem({ item, parent });
        },
      }),
      update: ({ parent, taskItem }) => ({
        queryKey: ['items', 'userTasks', 'list', parent],
        mutate: ({ completed, label, completion_date }) =>
          patchItem(taskItem, { completed, label, completion_date }),
      }),
    },
  },
  navigation: () => ({
    queryKey: ['navigation'],
    queryFn: () => loadAppNavigation(),
  }),
  user: {
    queryKey: ['user'],
    setupAccount: () => ({
      mutate: async (newUser: NewUserProps) => setupNewUser(newUser),
      queryKey: ['user', 'register'],
      queryConfig: {
        staleTime: staleTimes.veryLong,
      },
    }),
    info: () => ({
      queryFn: () => user(),
      queryKey: ['user', 'info'],
      queryConfig: {
        staleTime: staleTimes.long,
      },
    }),
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      async onSuccess() {
        await queryClient.invalidateQueries(this.mutationKey);
      },
    },
    queries: {
      staleTime: staleTimes.medium,
      refetchOnWindowFocus: 'always',
      refetchOnMount: 'always',
      refetchOnReconnect: 'always',
    },
  },
});
