const typeorm = require('typeorm')

const typeormServer = new typeorm.DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  dropSchema: true,
  entities: [
    require('./entities/usuario.entity.typeorm'),
    require('./entities/livro.entity.typeorm'),
    require('./entities/emprestimo.entity.typeorm'),
  ],
})

module.exports = typeormServer
