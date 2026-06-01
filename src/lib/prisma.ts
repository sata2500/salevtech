import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Prisma ve Pool'u global scope'ta sakla — hot reload / serverless warm start'ta
// fazladan bağlantı açılmasını önler.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

const connectionString =
  process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres";

// Pool singleton
if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool({ connectionString });
}

const pool = globalForPrisma.pool;
const adapter = new PrismaPg(pool);

// Prisma Client singleton
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma;
export default prisma;
