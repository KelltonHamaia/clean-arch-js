// usuario_id, livro_id, data_saida, data_retorno
const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'emprestimo',
  tableName: 'emprestimos',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    usuario_id: {
      type: 'int',
    },
    livro_id: {
      type: 'int',
    },
    data_saida: {
      type: 'date',
    },
    data_retorno: {
      type: 'date',
    },
    data_devolucao: {
      type: 'date',
      nullable: true,
    },
  },
  relations: {
    usuario: {
      target: 'usuario',
      type: 'many-to-one',
      joinColumn: {
        name: 'usuario_id',
        referencedColumnName: 'id',
      },
    },
    livro: {
      target: 'livro',
      type: 'many-to-one',
      joinColumn: {
        name: 'livro_id',
        referencedColumnName: 'id',
      },
    },
  },
})
