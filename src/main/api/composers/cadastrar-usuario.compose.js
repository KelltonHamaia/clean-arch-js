const cadastrarUsuarioUsecase = require('../../../application/cadastrar-usuario.usecase')
const { usuariosRepository } = require('../../../infra/db/typeorm/repositories/usuarios.repository')
const cadastrarUsuariosController = require('../../../interface-adapters/controllers/cadastrar-usuarios.controller')

module.exports = async function cadastrarUsuarioCompose(httpRequest) {
  const usuariosRepositoryFn = usuariosRepository()
  const cadastrarUsuariosUseCaseFn = cadastrarUsuarioUsecase({
    usuariosRepository: usuariosRepositoryFn,
  })

  const controller = cadastrarUsuariosController({
    cadastrarUsuarioUseCase: cadastrarUsuariosUseCaseFn,
    httpRequest,
  })
  return controller
}
