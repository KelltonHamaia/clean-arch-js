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

  const existePorCPF = async (CPF) => {
    const existePorCPF = await typeormUsuariosRepository.findOne({
      where: { CPF },
    })

    return !!existePorCPF
  }

  const existePorEmail = async (email) => {
    const existePorEmail = await typeormUsuariosRepository.findOne({
      where: { email },
    })

    return !!existePorEmail
  }

  return {
    cadastrar,
    buscarPorCPF,
    existePorCPF,
    existePorEmail,
  }
}

module.exports = { usuariosRepository, typeormUsuariosRepository }
