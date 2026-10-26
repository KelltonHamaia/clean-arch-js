const { resolve } = require('path')
const typeorm = require('typeorm')
const typormProductionConfig = require('./typeorm.prod')

let typeormServer

if (process.env.NODE_ENV === 'test') {
  typeormServer = new typeorm.DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    dropSchema: true,
    entities: [resolve(__dirname, 'entities/*.entity.typeorm.js')],
  })
} else if (process.env.NODE_ENV === 'integration') {
  typeormServer = new typeorm.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    port: process.env.POSTGRES_PORT,
    entities: [resolve(__dirname, 'entities/*.entity.typeorm.js')],
  })
} else {
  typeormServer = new typeorm.DataSource(typormProductionConfig)
}

module.exports = typeormServer
