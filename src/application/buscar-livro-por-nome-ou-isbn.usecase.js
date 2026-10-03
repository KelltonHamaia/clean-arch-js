const { Either, AppError } = require('../shared/errors')

module.exports = function buscarLivroPorNomeOuISBNUsecase({ livrosRepository }) {
  if (!livrosRepository) {
    throw new AppError(AppError.dependencias)
  }

  return async ({ valor }) => {
    if (!valor) {
      throw new AppError(AppError.parametrosObrigatoriosAusentes)
    }

    const resultado = await livrosRepository.buscarLivroPorNomeOuISBN(valor)
    return Either.Right(resultado)
  }
}
