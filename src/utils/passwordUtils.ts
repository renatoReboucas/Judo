import type { Password } from '@/types/passwordUtils'
import bcrypt from 'bcrypt'

/**
 *
 * Criptografa a senha.
 *
 * @param {string} senha - senha a ser criptografada.
 * @returns {Promise<string>} Senha criptografada.
 */
export const criptografarSenha = async (senha: Password) => {
  try {
    const cripto = await bcrypt.hash(senha, 10)
    return cripto
  } catch (err) {
    console.info('Erro ao criptografar senha', err)
    return { error: true, msg: 'Erro ao criptografar senha' }
  }
}
/**
 *
 *  Compara a senha criptografa.
 *
 * @param {string} senha - senha a ser criptografada.
 * @returns {Promise<string>} Senha criptografada.
 */
export const compararSenha = async (
  senhaOriginal: Password,
  senhaBanco: Password
) => {
  try {
    const comparar = await bcrypt.compare(senhaOriginal, senhaBanco)
    if (!comparar) {
      return false
    }
    return true
  } catch (err) {
    return { error: true, err }
  }
}
