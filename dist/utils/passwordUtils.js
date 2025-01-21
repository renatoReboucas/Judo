"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compararSenha = exports.criptografarSenha = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const criptografarSenha = async (senha) => {
    try {
        const cripto = await bcrypt_1.default.hash(senha, 10);
        return cripto;
    }
    catch (err) {
        console.info('Erro ao criptografar senha', err);
        return { error: true, msg: 'Erro ao criptografar senha' };
    }
};
exports.criptografarSenha = criptografarSenha;
const compararSenha = async (senhaOriginal, senhaBanco) => {
    try {
        const comparar = await bcrypt_1.default.compare(senhaOriginal, senhaBanco);
        if (!comparar) {
            return false;
        }
        return true;
    }
    catch (err) {
        return { error: true, err };
    }
};
exports.compararSenha = compararSenha;
