import config from '../../config.js'

const getDao = async configDao => {
  let productsDao

  switch (config.MODO_PERSISTENCIA) {
    case 'json':
      const { default: crudDaoArchivo } = await import('./crudDaoArchivo.js')
      productsDao = new crudDaoArchivo(
        configDao.collectionName,
        config.filePath
      )
      break
    case 'firebase':
      const { default: crudDaoFirebase } = await import('./crudDaoFirebase.js')
      productsDao = new crudDaoFirebase(configDao.collectionName)
      break
    case 'mongodb':
      const { default: crudDaoMongoDb } = await import('./crudDaoMongoDb.js')
      productsDao = new crudDaoMongoDb(configDao.collectionName)
      break
    default:
      const { default: crudDaoMem } = await import('./crudDaoMem.js')
      productsDao = new crudDaoMem()
      break
  }
  return productsDao
}

export { getDao }
