import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'

class crudDaoArchivo extends ContenedorArchivo {
  constructor (fileName, rutaDir) {
    super(`${rutaDir}/${fileName}.json`)
  }
}

export default crudDaoArchivo
