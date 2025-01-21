import { prisma } from '@/lib/prisma'
import { compararSenha } from '@/utils/passwordUtils'
import { type FastifyInstance } from 'fastify'

export async function loginClienteRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', async (request) => {
  //   await request.jwtVerify()
  // })
  app.post('/', async (request, reply) => {
    try {
      const data: any = request.body
      const user: any = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      })

      if (!user)
        return reply.status(404).send({ error: 'Usuário não encontrado' })
      const compar = await compararSenha(data.senha, user.senha)
      if (!compar) return reply.status(401).send({ error: 'Senha incorreta' })
      if (!user.isActive)
        return reply.status(401).send({ error: 'Usuário inativo' })
      const token = app.jwt.sign(
        {
          email: user.email,
          faixa: user.faixa,
        },
        {
          sub: `${user.idcontrato}`,
          expiresIn: '30 days',
        }
      )
      return { token }
    } catch (err) {
      reply.status(500).send({ error: err })
    }
  })
}
