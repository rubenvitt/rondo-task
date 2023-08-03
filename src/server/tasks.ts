import systemIds from '@db/tasks';
import { PrismaTransactionType } from '@db/prisma';

export async function createSystemTasks(
  prisma: PrismaTransactionType,
  userId: string
) {
  await prisma.task.create({
    data: {
      systemId: systemIds.inbox,
      label: 'Inbox',
      resolvable: false,
      user: {
        connect: {
          id: userId,
        },
      },
      parent: {
        create: {
          userId,
          resolvable: false,
          systemId: systemIds.root,
          label: 'Root',
        },
      },
    },
  });
}
