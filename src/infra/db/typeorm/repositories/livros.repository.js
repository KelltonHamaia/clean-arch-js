const typeormServer = require('../setup')
const typeormLivrosRepository = typeormServer.getRepository('livro')

const livrosRepository = () => {
  const cadastrar = async ({ nome, quantidade, autor, genero, ISBN }) => {
    await typeormLivrosRepository.save({ nome, quantidade, autor, genero, ISBN })
  }

  return {
    cadastrar,
  }
}

module.exports = { livrosRepository, typeormLivrosRepository }
