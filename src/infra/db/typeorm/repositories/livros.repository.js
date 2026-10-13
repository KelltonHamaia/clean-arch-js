const { Like } = require('typeorm')
const typeormServer = require('../setup')
const typeormLivrosRepository = typeormServer.getRepository('livro')

const livrosRepository = () => {
  const cadastrar = async ({ nome, quantidade, autor, genero, ISBN }) => {
    await typeormLivrosRepository.save({ nome, quantidade, autor, genero, ISBN })
  }

  const existePorISBN = async (ISBN) => {
    const livro = await typeormLivrosRepository.findOneBy({ ISBN })
    return !!livro
  }

  const buscarPorNomeOuISBN = async (valor) => {
    return await typeormLivrosRepository.find({
      where: [{ nome: Like(`%${valor}%`) }, { ISBN: valor }],
    })
  }

  return {
    cadastrar,
    existePorISBN,
    buscarPorNomeOuISBN,
  }
}

module.exports = { livrosRepository, typeormLivrosRepository }
