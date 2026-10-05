class AppError extends Error {
  constructor(message) {
    super()
    this.message = message
  }

  static dependencias = 'Alguma dependência obrigatória não foi fornecida'
  static parametrosObrigatoriosAusentes = 'Algum parâmetro obrigatório não foi fornecido'
}

module.exports = AppError
