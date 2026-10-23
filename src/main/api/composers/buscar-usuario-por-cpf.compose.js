const buscarUsuarioPorCpfUsecase = require('../../../application/buscar-usuario-por-cpf.usecase')
const buscarUsuarioPorCpfController = require('../../../interface-adapters/controllers/buscar-usuario-por-cpf.controller')
const { usuariosRepository } = require('../../../infra/db/typeorm/repositories/usuarios.repository')

module.exports = async function buscarUsuarioPorCPFComposer(httpRequest) {
  const usuariosRepositoryFn = usuariosRepository()
  const buscarUsuarioPorCpfUsecaseFn = buscarUsuarioPorCpfUsecase({
    usuariosRepository: usuariosRepositoryFn,
  })

  const controller = await buscarUsuarioPorCpfController({
    buscarUsuarioPorCPFUseCase: buscarUsuarioPorCpfUsecaseFn,
    httpRequest,
  })

  return controller
}
