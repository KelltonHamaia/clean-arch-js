const nodemailer = require('nodemailer')

module.exports = function nodemailerService() {
  const enviarEmail = async function ({
    data_saida,
    data_retorno,
    nome_usuario,
    CPF,
    email,
    nome_livro,
  }) {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'c79e22761a5e88',
        pass: 'b2f02e3841f8d4',
      },
    })

    const data_saida_BR = data_saida.toLocaleDateString('pt-BR')
    const data_retorno_BR = data_retorno.toLocaleDateString('pt-BR')

    await transporter.sendMail({
      from: '"Biblioteca JP" <contato@libjp.com>',
      to: email,
      subject: 'Novo livro emprestado',
      text: `Olá ${nome_usuario} (${CPF}), você pegou o livro "${nome_livro}" emprestado no dia ${data_saida_BR} e deverá devolver dia ${data_retorno_BR}. Boa leitura!`,
    })
  }

  return { enviarEmail }
}
