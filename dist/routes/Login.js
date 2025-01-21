"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = loginRoutes;
const prisma_1 = require("../lib/prisma");
const passwordUtils_1 = require("../utils/passwordUtils");
async function loginRoutes(app) {
    app.post('/', async (request, reply) => {
        try {
            const data = request.body;
            const user = await prisma_1.prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (!user)
                return reply.status(404).send({ error: 'Usuário não encontrado' });
            const compar = await (0, passwordUtils_1.compararSenha)(data.senha, user.senha);
            if (!compar)
                return reply.status(401).send({ error: 'Senha incorreta' });
            if (!user.isActive)
                return reply.status(401).send({ error: 'Usuário inativo' });
            const token = app.jwt.sign({
                email: user.email,
                faixa: user.faixa,
            }, {
                sub: `${user.idcontrato}`,
                expiresIn: '30 days',
            });
            return { token };
        }
        catch (err) {
            reply.status(500).send({ error: err });
        }
    });
}
