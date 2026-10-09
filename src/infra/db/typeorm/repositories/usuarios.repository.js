const typeormServer = require('../setup')
const typeormUsuariosRepository = typeormServer.getRepository('usuario')

const usuariosRepository = () => {
  const cadastrar = async ({ nome_completo, CPF, telefone, endereco, email }) => {
    await typeormUsuariosRepository.save({ nome_completo, CPF, telefone, endereco, email })
  }

  return {
    cadastrar,
  }
}

module.exports = { usuariosRepository, typeormUsuariosRepository }
