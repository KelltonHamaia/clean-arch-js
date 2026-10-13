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

  return {
    cadastrar,
    existePorISBN,
  }
}

module.exports = { livrosRepository, typeormLivrosRepository }
