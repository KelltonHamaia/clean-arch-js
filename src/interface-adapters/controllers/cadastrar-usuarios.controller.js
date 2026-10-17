const { z } = require('zod')
const { AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')

const zodValidator = z.object({
  nome_completo: z.string('Campo nome_completo é obrigatório'),
  CPF: z
    .string('Campo CPF é obrigatório')
    .refine((value) => /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/.test(value)),
  telefone: z.string('Campo telefone é obrigatório'),
  endereco: z.string('Campo endereco é obrigatório'),
  email: z.email('Campo email é obrigatório'),
})

module.exports = async function cadastrarUsuariosController({
  cadastrarUsuarioUseCase,
  httpRequest,
}) {
  const checaDependencias = cadastrarUsuarioUseCase && httpRequest && httpRequest.body
  if (!checaDependencias) {
    throw new AppError(AppError.dependencias)
  }

  const { nome_completo, CPF, telefone, endereco, email } = zodValidator.parse(httpRequest.body)
  const output = await cadastrarUsuarioUseCase({ nome_completo, CPF, telefone, endereco, email })

  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null),
  )
}
