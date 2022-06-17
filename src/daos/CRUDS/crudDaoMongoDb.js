import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js'

class crudDaoMongoDb extends ContenedorMongoDb {
  constructor (collectionName) {
    super(collectionName)
  }
}

export default crudDaoMongoDb
