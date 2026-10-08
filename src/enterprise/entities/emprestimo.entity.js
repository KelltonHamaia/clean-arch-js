const emprestimoEntity = () => {
  const verificarSeEhDevolucaoAtrasada = ({ data_retorno, data_devolucao }) => {
    return data_retorno.getTime() < data_devolucao.getTime()
  }

  const calcularMulta = ({ data_retorno, data_devolucao }) => {
    const ehDevolucaoAtrasada = verificarSeEhDevolucaoAtrasada({ data_retorno, data_devolucao })
    const valorMulta = ehDevolucaoAtrasada ? '10,00' : '0'
    return `Multa por atraso: R$ ${valorMulta}`
  }

  return {
    calcularMulta,
  }
}

module.exports = emprestimoEntity()
