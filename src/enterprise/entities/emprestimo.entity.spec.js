const emprestimoEntity = require('./emprestimo.entity')

describe('Emprestimo entity', () => {
  test('Deve calcular uma multa sem atraso', () => {
    const dataRetornoEDataDevolucaoDTO = {
      data_retorno: new Date('2026-10-07'),
      data_devolucao: new Date('2026-10-07'),
    }
    const sut = emprestimoEntity
    const output = sut.calcularMulta(dataRetornoEDataDevolucaoDTO)
    expect(output).toBe(`Multa por atraso: R$ 0`)
  })

  test('Deve retornar multa com atraso no valor de 10', () => {
    const dataRetornoEDataDevolucaoDTO = {
      data_retorno: new Date('2026-10-07'),
      data_devolucao: new Date('2026-10-08'),
    }
    const sut = emprestimoEntity
    const output = sut.calcularMulta(dataRetornoEDataDevolucaoDTO)
    expect(output).toBe(`Multa por atraso: R$ 10,00`)
  })
})
