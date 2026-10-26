const { resolve } = require('path')

module.exports = {
  type: '',
  host: '',
  database: '',
  synchronize: false, //nunca habilitar em produção
  username: '',
  password: '',
  port: 5432,
  entities: [resolve(__dirname, 'entities/*.entity.typeorm.js')],
}
