"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const Login_1 = require("../routes/Login");
const app = (0, fastify_1.default)({ logger: true }).withTypeProvider();
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(cors_1.default, {
    origin: true,
});
app.register(jwt_1.default, {
    secret: 'judo-app',
});
app.get('/ping', async () => {
    return { ping: 'pong' };
});
app.register(Login_1.loginRoutes, { prefix: 'v1/login' });
app
    .listen({
    port: !process.env.PORT ? 3333 : parseInt(process.env.PORT),
    host: '0.0.0.0',
})
    .then(() => {
    console.info(`🚀 Server is running on port ${process.env.PORT || 3333}`);
});
