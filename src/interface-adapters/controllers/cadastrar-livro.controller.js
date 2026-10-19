const { z } = require('zod')
const httpResponse = require('../../shared/helpers/http.response')
const { AppError } = require('../../shared/errors')

module.exports = async function cadastrarLivroController({ cadastrarLivroUseCase, httpRequest }) {
  const zodValidator = z.object({
    nome: z.string('Campo nome é obrigatório'),
    quantidade: z.number('Campo quantidade é obrigatório'),
    autor: z.string('Campo autor é obrigatório'),
    genero: z.string('Campo genero é obrigatório'),
    ISBN: z.string('Campo ISBN é obrigatório'),
  })

  const checaDependencias = cadastrarLivroUseCase && httpRequest && httpRequest.body
  if (!checaDependencias) {
    throw new AppError(AppError.dependencias)
  }

  const { nome, quantidade, autor, genero, ISBN } = zodValidator.parse(httpRequest.body)
  const output = await cadastrarLivroUseCase({ nome, quantidade, autor, genero, ISBN })
  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null),
  )
}
