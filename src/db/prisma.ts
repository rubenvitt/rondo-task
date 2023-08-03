import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library';

export type PrismaTransactionType = Omit<
  PrismaClient,
  runtime.ITXClientDenyList
>;

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
export default prisma;
