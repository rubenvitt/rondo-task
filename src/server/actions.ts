'use server';

import prisma from '@/db/prisma';
import { TaskItem } from '@/types/components';
import systemIds from '@db/tasks';

export type FindTaskItemsProps =
  | {
      parentId: string;
      systemId?: never;
    }
  | {
      parentId?: never;
      systemId: string;
    };

export async function findTaskItems({
  parentId,
  systemId,
}: FindTaskItemsProps): Promise<TaskItem[]> {
  'use server';

  const tasks = await prisma.task.findMany({
    where: parentId
      ? { parentId }
      : {
          parent: {
            systemId,
          },
        },
  });
  return tasks;
}

export async function findSystemTasks(): Promise<TaskItem[]> {
  const tasks = await prisma.task.findMany({
    where: {
      systemId: {
        not: null,
      },
    },
  });
  console.log('Got system tasks', tasks);
  return tasks;
}

export async function addItemToInbox(
  item: Pick<TaskItem, 'label' | 'completed'>
) {
  'use server';

  const newTask = await prisma.task.create({
    data: {
      ...item,
      parent: {
        connect: {
          userId_systemId: {
            systemId: systemIds.inbox,
            userId: 'no-user',
          },
        },
      },
    },
  });

  return newTask.id;
}

export async function toggleItem(item: TaskItem, state: boolean) {
  await prisma.task.update({
    data: {
      completed: state,
    },
    where: {
      id: item.id,
    },
  });
}
