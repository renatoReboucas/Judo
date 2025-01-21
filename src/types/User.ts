export interface User {
  id?: number
  email?: string
  senha?: string
  nome?: string
  sobrenome?: string
  telefone?: string
  dataNascimento?: string
  nomeResponsavel?: string
  telefoneResponsavel?: string
  sensei?: boolean
  atleta?: boolean
  faixa?: string
  ativo?: boolean
  createdAt?: Date
  updatedAt?: Date
}
