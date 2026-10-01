const { Either, AppError } = require('../shared/errors')

module.exports = function cadastrarLivroUsecase({ livrosRepository }) {
  if (!livrosRepository) {
    throw new AppError(AppError.dependencias)
  }

  return async ({ nome, quantidade, autor, genero, ISBN }) => {
    await livrosRepository.cadastrar({ nome, quantidade, autor, genero, ISBN })
    return Either.Right(null)
  }
}
