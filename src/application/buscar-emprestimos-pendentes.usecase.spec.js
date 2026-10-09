const { AppError } = require('../shared/errors')
const buscarEmprestimosPendentesUsecase = require('./buscar-emprestimos-pendentes.usecase')

describe('Buscar emprestimos pendentes useCase', () => {
  const emprestimosRepository = {
    buscarPendentesComLivroComUsuario: jest.fn(),
  }

  test('Deve ser possível buscar os empréstimos pendentes', async () => {
    emprestimosRepository.buscarPendentesComLivroComUsuario.mockResolvedValue([
      {
        usuario: {
          nome: 'qualquer_nome_valido_usuario',
          CPF: 'qualquer_cpf_valido_usuario',
        },
        livro: {
          nome: 'qualquer_nome_livro_valido_usuario',
        },
        data_saida: '2026-10-08',
        data_retorno: '2026-10-10',
      },
      {
        usuario: {
          nome: 'qualquer_nome_valido',
          CPF: 'qualquer_cpf_valido',
        },
        livro: {
          nome: 'qualquer_nome_livro_valido',
        },
        data_saida: '2026-10-05',
        dataRetorno: '2026-10-10',
      },
    ])

    const sut = buscarEmprestimosPendentesUsecase({ emprestimosRepository })
    const output = await sut()

    expect(output.right).toHaveLength(2)
    expect(output.right[0].usuario.nome).toBe('qualquer_nome_valido_usuario')
    expect(output.right[0].usuario.CPF).toBe('qualquer_cpf_valido_usuario')
    expect(output.right[0].livro.nome).toBe('qualquer_nome_livro_valido_usuario')
    expect(output.right[0].data_saida).toBe('2026-10-08')
    expect(output.right[0].data_retorno).toBe('2026-10-10')
  })

  test('Deve retornar um throw AppError caso o emprestimosRepository não seja fornecido', () => {
    expect(() => buscarEmprestimosPendentesUsecase({})).toThrow(new AppError(AppError.dependencias))
  })
})
