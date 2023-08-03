'use server';

import prisma from '@/db/prisma';
import { TaskItem } from '@/types/components';
import systemIds from '@db/tasks';
import { createPassage } from '@/server/passage';
import logger from '@/utils/logging';
import { userIdFromHeader } from '@/utils/client';
import { Without, XOR } from '@/types/utils';

export type ParentItemProps = XOR<
  {
    parentId: string;
  },
  {
    systemId: string;
  }
>;

export async function findTaskItems({
  parentId,
  systemId,
}: ParentItemProps): Promise<TaskItem[]> {
  'use server';

  const userId = userIdFromHeader();

  return prisma.task.findMany({
    where: {
      ...(parentId ? { parentId } : { parent: { systemId } }),
      userId,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
}

export async function findSystemTasks(): Promise<TaskItem[]> {
  const userId = userIdFromHeader();

  const tasks = await prisma.task.findMany({
    where: {
      systemId: {
        not: null,
      },
      userId,
    },
    orderBy: {
      id: 'asc',
    },
  });
  return tasks;
}

export type NewTaskItem = Pick<TaskItem, 'label' | 'completed'>;

export async function createNewTaskItem({
  item,
  parent,
}: {
  item: NewTaskItem;
  parent: ParentItemProps;
}): Promise<TaskItem> {
  'use server';

  const userId = userIdFromHeader();

  return prisma.task.create({
    data: {
      ...item,
      user: {
        connect: {
          id: userId,
        },
      },
      parent: {
        connect: {
          userId_systemId: {
            systemId: systemIds.inbox,
            userId,
          },
        },
      },
    },
  });
}

export async function patchItem(
  item: TaskItem,
  patch: Partial<Without<TaskItem, 'userId' | 'systemId'>>
) {
  const userId = userIdFromHeader();

  await prisma.task.update({
    data: patch,
    where: {
      id: item.id,
      userId,
    },
  });
}

export async function toggleItem(item: TaskItem, state: boolean) {
  const userId = userIdFromHeader();

  await prisma.task.update({
    data: {
      completed: state,
      completion_date: state ? new Date() : null,
    },
    where: {
      id: item.id,
      userId,
    },
  });
}

export async function removeRefreshToken(userId: string) {
  const { passage } = await createPassage();
  logger.info('Removing refresh token for user', userId);

  await passage.user.signOut(userId);
}
