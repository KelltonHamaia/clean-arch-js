const typeormServer = require('../setup')
const typeormEmprestimosRepository = typeormServer.getRepository('emprestimo')

const emprestimosRepository = () => {
  const emprestar = async ({ usuario_id, livro_id, data_saida, data_retorno }) => {
    await typeormEmprestimosRepository.save({ usuario_id, livro_id, data_saida, data_retorno })
  }

  const devolver = async ({ emprestimo_id, data_devolucao }) => {
    await typeormEmprestimosRepository.update(
      { id: emprestimo_id },
      {
        data_devolucao: data_devolucao,
      },
    )
    return await typeormEmprestimosRepository.findOneBy({ id: emprestimo_id })
  }

  return {
    emprestar,
    devolver,
  }
}

module.exports = { emprestimosRepository, typeormEmprestimosRepository }
