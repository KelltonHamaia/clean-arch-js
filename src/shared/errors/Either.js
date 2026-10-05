/**
 * @description Atenção! Essa classe não deve ser instanciada diretamente. Ao utilizar, use os métodos estáticos.
 */
class Either {
  constructor(left, right) {
    this.left = left
    this.right = right
  }

  static Left(left) {
    return new Either(left, null)
  }

  static Right(right) {
    return new Either(null, right)
  }

  static valorJaCadastrado(valor) {
    return {
      message: `${valor} já cadastrado.`,
    }
  }

  static dataRetornoMenorQueDataSaida() {
    return {
      message:
        'A data de retorno do empréstimo não pode ser maior que a data de saída do empréstimo',
    }
  }

  static livroISBNEmprestimoPendenteUsuario() {
    return {
      message: 'Livro com ISBN já emprestado ao usuário e ainda não devolvido',
    }
  }
}

module.exports = Either
