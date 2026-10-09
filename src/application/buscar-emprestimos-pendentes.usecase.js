const { Either, AppError } = require('../shared/errors')

module.exports = function buscarEmprestimosPendentesUseCase({ emprestimosRepository }) {
  if (!emprestimosRepository) {
    throw new AppError(AppError.dependencias)
  }

  return async () => {
    const emprestimosPendentes = await emprestimosRepository.buscarPendentesComLivroComUsuario()
    return Either.Right(emprestimosPendentes)
  }
}
