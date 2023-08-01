'use server';

import logger from '@/utils/logging';
import { userIdFromHeader } from '@/utils/client';
import { createPassage } from '@/server/passage';
import prisma from '@db/prisma';

export async function isUserNew(userId: string) {
  return (await prisma.user.count({ where: { id: userId } })) === 0;
}

export type NewUserProps = {
  name: string;
};

export async function user() {
  const id = userIdFromHeader()!!;
  return prisma.user.findUnique({ where: { id } });
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

  await prisma.user.create({
    data: {
      id: userId,
      created_at,
      name: props.name,
      webAuthn: webauthn,
    },
  });

  return Promise.resolve();
}
