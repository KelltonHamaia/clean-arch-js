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
    return `${valor} já cadastrado.`
  }
}

module.exports = Either
