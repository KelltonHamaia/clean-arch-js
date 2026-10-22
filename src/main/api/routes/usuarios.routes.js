const { Router } = require('express')
const { usuariosRepository } = require('../../../infra/db/typeorm/repositories/usuarios.repository')
const cadastrarUsuarioUsecase = require('../../../application/cadastrar-usuario.usecase')
const cadastrarUsuariosController = require('../../../interface-adapters/controllers/cadastrar-usuarios.controller')

const usuariosRoutes = Router()

usuariosRoutes.post('/', (req, res) => {
  const httpRequest = {
    body: req.body,
  }

  const usuariosRepositoryFn = usuariosRepository()
  const cadastrarUsuariosUseCaseFn = cadastrarUsuarioUsecase({
    usuariosRepository: usuariosRepositoryFn,
  })

  const { statusCode, body } = cadastrarUsuariosController({
    cadastrarUsuarioUseCase: cadastrarUsuariosUseCaseFn,
    httpRequest,
  })

  return res.status(statusCode).json(body)
})

module.exports = { usuariosRoutes }
