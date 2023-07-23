'use server';

import { prisma } from '@/db/prisma';
import { TaskItem } from '@/types/components';

export async function findTaskItems(list: string): Promise<TaskItem[]> {
  'use server';

  const tasks = await prisma.task.findMany();
  console.log('Got task items', tasks);

  return tasks;
}

export async function addItemToInbox(
  item: Pick<TaskItem, 'label' | 'completed'>
) {
  'use server';

  const newTask = await prisma.task.create({
    data: {
      ...item,
      list: 'Inbox',
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
