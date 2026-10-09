const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'usuario',
  tableName: 'usuarios',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    nome_completo: {
      type: 'varchar',
    },
    CPF: {
      type: 'varchar',
      unique: true,
    },
    telefone: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
  },
})
