const { IsNull } = require('typeorm')
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
    const { data_retorno } = await typeormEmprestimosRepository.findOneBy({ id: emprestimo_id })
    return { data_retorno }
  }

  const buscarPendentesComLivroComUsuario = async () => {
    return await typeormEmprestimosRepository.find({
      where: {
        data_devolucao: IsNull(),
      },
      relations: ['usuario', 'livro'],
      select: {
        id: true,
        data_saida: true,
        data_retorno: true,
        usuario: {
          nome_completo: true,
          CPF: true,
        },
        livro: {
          nome: true,
        },
      },
    })
  }

  const existeLivroISBNEmprestadoPendenteUsuario = async ({ usuario_id, livro_id }) => {
    const pendentes = await typeormEmprestimosRepository.count({
      where: {
        data_devolucao: IsNull(),
        usuario_id: usuario_id,
        livro_id: livro_id,
      },
    })

    return pendentes > 0
  }

  return {
    emprestar,
    devolver,
    buscarPendentesComLivroComUsuario,
    existeLivroISBNEmprestadoPendenteUsuario,
  }
}

module.exports = { emprestimosRepository, typeormEmprestimosRepository }
