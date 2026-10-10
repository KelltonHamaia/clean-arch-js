const typeormServer = require('../setup')
const typeormUsuariosRepository = typeormServer.getRepository('usuario')

const usuariosRepository = () => {
  const cadastrar = async ({ nome_completo, CPF, telefone, endereco, email }) => {
    await typeormUsuariosRepository.save({ nome_completo, CPF, telefone, endereco, email })
  }

  const buscarPorCPF = async (CPF) => {
    const usuario = typeormUsuariosRepository.findOne({
      where: { CPF },
    })
    return usuario
  }

  return {
    cadastrar,
    buscarPorCPF,
  }
}

module.exports = { usuariosRepository, typeormUsuariosRepository }
