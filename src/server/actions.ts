'use server';

import prisma from '@/db/prisma';
import { TaskItem } from '@/types/components';
import systemIds from '@db/tasks';
import { createPassage } from '@/server/passage';

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

  return prisma.task.findMany({
    where: parentId
      ? { parentId }
      : {
          parent: {
            systemId,
          },
        },
  });
}

export async function findSystemTasks(): Promise<TaskItem[]> {
  const tasks = await prisma.task.findMany({
    where: {
      systemId: {
        not: null,
      },
    },
    orderBy: {
      id: 'asc',
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

export async function removeRefreshToken(userId: string) {
  const { passage } = await createPassage();
  console.log('Removing refresh token for user', userId);

  await passage.user.signOut(userId);
}
