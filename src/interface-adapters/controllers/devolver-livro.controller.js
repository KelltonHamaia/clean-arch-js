const { z } = require('zod')
const { AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')

const zodValidatorBody = z.object({
  data_devolucao: z.string('Campo data_devolucao é obrigatório'),
})

const zodValidatorParams = z.object({
  emprestimo_id: z.coerce.number('Campo emprestimo_id é obrigatório'),
})

module.exports = async function devolverLivroController({ devolverLivroUseCase, httpRequest }) {
  const checaDependencias =
    devolverLivroUseCase && httpRequest && httpRequest.body && httpRequest.params
  if (!checaDependencias) {
    throw new AppError(AppError.dependencias)
  }

  const { data_devolucao } = zodValidatorBody.parse(httpRequest.body)
  const { emprestimo_id } = zodValidatorParams.parse(httpRequest.params)

  const output = await devolverLivroUseCase({
    emprestimo_id,
    data_devolucao,
  })

  return output.fold(
    (error) => httpResponse(400, error.message),
    (multa) => httpResponse(200, multa),
  )
}
