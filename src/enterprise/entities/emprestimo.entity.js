const { AppError } = require('../../shared/errors')

const emprestimoEntity = () => {
  const verificarSeEhDevolucaoAtrasada = ({ data_retorno, data_devolucao }) => {
    return new Date(data_retorno).getTime() < new Date(data_devolucao).getTime()
  }

  const calcularMulta = ({ data_retorno, data_devolucao }) => {
    if (!data_retorno || !data_devolucao) {
      throw new AppError(AppError.parametrosObrigatoriosAusentes)
    }

    const ehDevolucaoAtrasada = verificarSeEhDevolucaoAtrasada({ data_retorno, data_devolucao })
    const valorMulta = ehDevolucaoAtrasada ? '10,00' : '0'
    return `Multa por atraso: R$ ${valorMulta}`
  }

  return {
    calcularMulta,
  }
}

module.exports = emprestimoEntity()
