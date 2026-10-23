const buscarLivroPorNomeOuIsbnUsecase = require('../../../application/buscar-livro-por-nome-ou-isbn.usecase')
const { livrosRepository } = require('../../../infra/db/typeorm/repositories/livros.repository')
const buscarLivroPorNomeOuIsbnController = require('../../../interface-adapters/controllers/buscar-livro-por-nome-ou-isbn.controller')

module.exports = async function buscarLivroPorNomeOuISBNCompose(httpRequest) {
  const livrosRepositoryFn = livrosRepository()
  const buscarLivroPorNomeOuIsbnUsecaseFn = buscarLivroPorNomeOuIsbnUsecase({
    livrosRepository: livrosRepositoryFn,
  })

  const controller = await buscarLivroPorNomeOuIsbnController({
    buscarLivroPorNomeOuISBNUseCase: buscarLivroPorNomeOuIsbnUsecaseFn,
    httpRequest,
  })
  return controller
}
