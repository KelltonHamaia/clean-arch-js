const { Either, AppError } = require('../shared/errors')

module.exports = function devolverLivroUseCase({ emprestimosRepository }) {
  if (!emprestimosRepository) {
    throw new AppError(AppError.dependencias)
  }

  return async ({ emprestimo_id, data_devolucao }) => {
    const { data_retorno } = await emprestimosRepository.devolver({ emprestimo_id, data_devolucao })

    let verificarMulta = 'Multa por atraso: R$ 0'
    const ehDevolucaoAtrasada = data_retorno.getTime() < data_devolucao.getTime()
    if (ehDevolucaoAtrasada) {
      verificarMulta = 'Multa por atraso: R$ 10,00'
    }

    return Either.Right(verificarMulta)
  }
}
