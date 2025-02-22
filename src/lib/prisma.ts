import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable logging
})

export default prisma

// import { PrismaClient } from '@prisma/client'

// const PrismaClientSingleton = () => {
//     return new PrismaClient()
// }

// declare const globalThis:{
//     prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton()

// export default prisma;

// if (process.env.NODE_DEV !== 'production') globalThis.prismaGlobal = prisma
