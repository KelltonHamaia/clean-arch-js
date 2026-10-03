const { Either, AppError } = require('../shared/errors')

module.exports = function buscarLivroPorNomeOuISBNUsecase({ livrosRepository }) {
  if (!livrosRepository) {
    throw new AppError(AppError.dependencias)
  }

  return async ({ valor }) => {
    const resultado = await livrosRepository.buscarLivroPorNomeOuISBN(valor)
    return Either.Right(resultado)
  }
}
