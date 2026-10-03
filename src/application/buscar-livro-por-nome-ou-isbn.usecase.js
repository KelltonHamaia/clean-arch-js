const { Either } = require('../shared/errors')

module.exports = function buscarLivroPorNomeOuISBNUsecase({ livrosRepository }) {
  return async ({ valor }) => {
    const resultado = await livrosRepository.buscarLivroPorNomeOuISBN(valor)
    return Either.Right(resultado)
  }
}
