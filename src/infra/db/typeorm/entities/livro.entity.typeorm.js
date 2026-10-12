const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'livro',
  tableName: 'livros',
  columns: {
    id: {
      type: 'int',
      generated: true,
      primary: true,
    },
    nome: {
      type: 'varchar',
    },
    quantidade: {
      type: 'int',
    },
    autor: {
      type: 'varchar',
    },
    genero: {
      type: 'varchar',
    },
    ISBN: {
      type: 'varchar',
      unique: true,
    },
  },
})
