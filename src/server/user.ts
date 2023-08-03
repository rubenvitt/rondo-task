'use server';

import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import logger from '@/utils/logging';
import { userIdFromHeader } from '@/utils/client';
import { createPassage } from '@/server/passage';
import prisma from '@db/prisma';
import { createSystemTasks } from '@/server/tasks';

export async function isUserNew(userId: string) {
  return (await prisma.user.count({ where: { id: userId } })) === 0;
}

export type NewUserProps = {
  name: string;
};

export async function user(): Promise<User> {
  const id = userIdFromHeader()!!;
  logger.info({ userId: id }, 'Getting user');
  return (await prisma.user.findUnique({ where: { id } }).then(u => {
    if (!u) {
      logger.warn(
        { userId: id },
        'Unable to find user. We may setup it`s user account'
      );
      redirect('/setup-account');
    }
    return u;
  }))!!;
}

export async function setupNewUser(props: NewUserProps) {
  const userId = userIdFromHeader()!!;
  const { passage } = await createPassage();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { webauthn, created_at } = await passage.user.get(userId);
  logger.info({ props, userId, webauthn }, `Setting up user with props`);

  await passage.user.update(userId, {
    user_metadata: props,
  });

  return prisma.$transaction(async p => {
    await p.user.create({
      data: {
        id: userId,
        created_at,
        name: props.name,
        webAuthn: webauthn,
      },
    });
    await createSystemTasks(p, userId);
  });
}
