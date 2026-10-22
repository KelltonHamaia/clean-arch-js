const { z } = require('zod')
const httpResponse = require('../../shared/helpers/http.response')
const { AppError } = require('../../shared/errors')

const zodValidator = z.object({
  usuario_id: z.number('Campo usuario_id é obrigatório'),
  livro_id: z.number('Campo livro_id é obrigatório'),
  data_saida: z.string('Campo data_saida é obrigatório'),
  data_retorno: z.string('Campo data_retorno é obrigatório'),
})

module.exports = async function emprestarLivroController({ emprestarLivroUseCase, httpRequest }) {
  const checaDependencias = emprestarLivroUseCase && httpRequest.body
  if (!checaDependencias) {
    throw new AppError(AppError.dependencias)
  }

  const { usuario_id, livro_id, data_saida, data_retorno } = zodValidator.parse(httpRequest.body)
  const output = await emprestarLivroUseCase({
    usuario_id,
    livro_id,
    data_saida: new Date(data_saida),
    data_retorno: new Date(data_retorno),
  })

  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null),
  )
}
