import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library';

function createPrisma() {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
}

export type PrismaTransactionType = Omit<
  PrismaClient,
  runtime.ITXClientDenyList
>;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = createPrisma();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = createPrisma();
  }
  prisma = globalThis.prisma;
}

export default prisma;
