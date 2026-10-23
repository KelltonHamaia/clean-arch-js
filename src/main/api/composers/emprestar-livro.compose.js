const nodemailerService = require('../../../infra/email/nodemailer')
const emprestarLivroUsecase = require('../../../application/emprestar-livro.usecase')
const {
  emprestimosRepository,
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository')
const emprestarLivroController = require('../../../interface-adapters/controllers/emprestar-livro.controller')

module.exports = async function emprestarLivroCompose(httpRequest) {
  const emprestimosRepositoryFn = emprestimosRepository()
  const emailServiceFn = nodemailerService()
  const emprestarLivroUsecaseFn = emprestarLivroUsecase({
    emprestimosRepository: emprestimosRepositoryFn,
    emailService: emailServiceFn,
  })

  const controller = emprestarLivroController({
    emprestarLivroUseCase: emprestarLivroUsecaseFn,
    httpRequest,
  })

  return controller
}
