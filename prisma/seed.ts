import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
 
async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'jhon.doe@gmail.com',
            avatarUrl: 'https://github.com/leomatholiveira.png',
        } 
    })
    
    const pool = await prisma.pool.create({
        data: {
            tittle:'Example Pool',
            code: 'BOL123',
            ownerId: user.id, 
            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create ({
        data: {
            date: '2022-11-03T14:46:34.828Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })
    await prisma.game.create ({
        data: {
            date: '2022-11-03T14:46:34.828Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
        
        guesses: {
            create:{
                firstTeamPoints: 2,
                secondTeamPoints: 1,
                participant: {
                    connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id,
                        }
                    }
                }
            }
        }
        }
    })
}


main()