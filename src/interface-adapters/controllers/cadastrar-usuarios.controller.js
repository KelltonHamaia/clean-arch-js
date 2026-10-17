const { AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')

module.exports = async function cadastrarUsuariosController({
  cadastrarUsuarioUseCase,
  httpRequest,
}) {
  const checaDependencias = cadastrarUsuarioUseCase && httpRequest && httpRequest.body
  if (!checaDependencias) {
    throw new AppError(AppError.dependencias)
  }

  const { nome_completo, CPF, telefone, endereco, email } = httpRequest.body
  const output = await cadastrarUsuarioUseCase({ nome_completo, CPF, telefone, endereco, email })

  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null),
  )
}
