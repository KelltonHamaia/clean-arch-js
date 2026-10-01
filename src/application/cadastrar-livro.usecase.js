const { Either } = require('../shared/errors')

module.exports = function cadastrarLivroUsecase({ livrosRepository }) {
  return async ({ nome, quantidade, autor, genero, ISBN }) => {
    await livrosRepository.cadastrar({ nome, quantidade, autor, genero, ISBN })

    return Either.Right(null)
  }
}
