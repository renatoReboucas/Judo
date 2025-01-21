import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'judo-app',
})

app.get('/ping', async () => {
  return { ping: 'pong' }
})

app
  .listen({
    port: !process.env.PORT ? 3333 : parseInt(process.env.PORT),
    host: '0.0.0.0',
  })
  .then(() => {
    console.info(`🚀 Server is running on port ${process.env.PORT || 3333}`)
  })
