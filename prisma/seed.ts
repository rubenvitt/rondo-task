const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  const task = await prisma.task.create({
    data: {
      label: 'Root',
      systemId: 'root',
      resolvable: false,
    },
  });

  await prisma.task.create({
    data: {
      label: 'Inbox',
      systemId: 'inbox',
      resolvable: false,
      parentId: task.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
