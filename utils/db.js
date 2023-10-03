const {PrismaClient} = require('@prisma/client')

const db = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

module.exports = {db};