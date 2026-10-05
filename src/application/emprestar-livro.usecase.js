const { AppError, Either } = require('../shared/errors')

module.exports = function emprestarLivroUsecase({ emprestimosRepository }) {
  if (!emprestimosRepository) {
    throw new AppError(AppError.dependencias)
  }

  return async ({ usuario_id, livro_id, data_saida, data_retorno }) => {
    const checaCampos = usuario_id && livro_id && data_saida && data_retorno
    if (!checaCampos) {
      throw new AppError(AppError.parametrosObrigatoriosAusentes)
    }

    if (data_saida.getTime() > data_retorno.getTime()) {
      return Either.Left(Either.dataRetornoMenorQueDataSaida)
    }

    const existeLivroISBNEmprestimoPendenteUsuario =
      await emprestimosRepository.existeLivroISBNEmprestimoPendenteUsuario({
        usuario_id,
        livro_id,
      })

    if (existeLivroISBNEmprestimoPendenteUsuario) {
      return Either.Left(Either.livroISBNEmprestimoPendenteUsuario)
    }

    await emprestimosRepository.emprestar({ usuario_id, livro_id, data_saida, data_retorno })
    return Either.Right(null)
  }
}
