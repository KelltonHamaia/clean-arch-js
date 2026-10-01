const { AppError } = require('../shared/errors')
const buscarUsuarioPorCpfUsecase = require('./buscar-usuario-por-cpf.usecase')

describe('Buscar usuário por CPF useCase', () => {
  const usuariosRepository = {
    buscarPorCPF: jest.fn(),
  }

  test('Deve retornar um usuário caso o CPF esteja cadastrado', async () => {
    const cpfDTO = {
      CPF: 'CPF_CADASTRADO_NA_BASE',
    }

    const outputDTO = {
      id: '1234-1233-4342-4311',
      nome_completo: 'nome_completo_qualquer',
      CPF: 'CPF_CADASTRADO_NA_BASE',
      telefone: 'telefone_qualquer',
      endereco: 'endereco_qualquer',
      email: 'email_qualquer',
    }

    usuariosRepository.buscarPorCPF.mockResolvedValue(outputDTO)

    const sut = buscarUsuarioPorCpfUsecase({ usuariosRepository })
    const output = await sut({ CPF: cpfDTO.CPF })

    expect(output.left).toBeNull()
    expect(output.right).toEqual(outputDTO)
    expect(usuariosRepository.buscarPorCPF).toHaveBeenCalledWith(cpfDTO.CPF)
    expect(usuariosRepository.buscarPorCPF).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar null se não existir nenhum usuário cadastrado com o CPF informado', async () => {
    usuariosRepository.buscarPorCPF.mockResolvedValue(null)
    const cpfDTO = {
      CPF: 'CPF_nao_cadastrado_na_base',
    }

    const sut = buscarUsuarioPorCpfUsecase({ usuariosRepository })
    const output = await sut({ CPF: cpfDTO.CPF })

    expect(output.right).toBeNull()
    expect(usuariosRepository.buscarPorCPF).toHaveBeenCalledWith(cpfDTO.CPF)
    expect(usuariosRepository.buscarPorCPF).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar um throw AppError caso o usuarioRepository não seja fornecido', () => {
    expect(() => buscarUsuarioPorCpfUsecase({})).toThrow(new AppError(AppError.dependencias))
  })
})
