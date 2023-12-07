
import { PrismaClient } from "@prisma/client";
import "server-only"


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}


// const prisma = global.prisma || new PrismaClient();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// if (process.env.NODE_ENV === "development") global.prisma = prisma;

// Check for connection errors
prisma.$connect()
  .catch((error) =>  {
    console.error(error)
     return
  });


export default prisma;










