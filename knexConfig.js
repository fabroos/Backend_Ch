/*


const userConfig = {
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: 'mysqlpassword',
  database: 'coderHouse'
}

const getConfig = modo =>
  modo === 'admin'
    ? { client: 'sqlite3', connection: adminConfig }
    : { connection: userConfig }
export { getConfig }
*/

const adminConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mysqlpassword',
  database: 'coderHouse'
}

export function getConfig (mode) {
  return mode === 'mysql'
    ? { client: 'sqlite3', connection: adminConfig }
    : {
        client: 'sqlite3',
        connection: {
          filename: './DB/coderHouse.sqlite',
          useNullAsDefault: true
        }
      }
}
