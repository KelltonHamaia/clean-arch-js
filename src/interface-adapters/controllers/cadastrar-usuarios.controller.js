module.exports = async function cadastrarUsuariosController({
  cadastrarUsuarioUseCase,
  httpRequest,
}) {
  const { nome_completo, CPF, telefone, endereco, email } = httpRequest.body
  const output = await cadastrarUsuarioUseCase({ nome_completo, CPF, telefone, endereco, email })

  return output.fold(
    (error) => httpRequest(400, error.message),
    () => httpRequest(201, null),
  )
}
