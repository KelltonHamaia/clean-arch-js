const { AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')

module.exports = async function buscarEmprestimosPendentesController({
  buscarEmprestimosPendentesUseCase,
}) {
  const checaCampos = !!buscarEmprestimosPendentesUseCase
  if (!checaCampos) {
    throw new AppError(AppError.dependencias)
  }

  const output = await buscarEmprestimosPendentesUseCase()
  return output.fold(
    (error) => httpResponse(400, error.message),
    (pendentes) => httpResponse(200, pendentes),
  )
}
