const typeormServer = require('../setup')
const typeormEmprestimosRepository = typeormServer.getRepository('emprestimo')

const emprestimosRepository = () => {
  const emprestar = async ({ usuario_id, livro_id, data_saida, data_retorno }) => {
    await typeormEmprestimosRepository.save({ usuario_id, livro_id, data_saida, data_retorno })
  }

  return {
    emprestar,
  }
}

module.exports = { emprestimosRepository, typeormEmprestimosRepository }
