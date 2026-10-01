class AppError extends Error {
  constructor(message) {
    super()
    this.message = message
  }

  static dependencias = 'Alguma dependência obrigatória não foi fornecida'
}

module.exports = AppError
