import knex from 'knex'

export class Container {
  constructor (sql, table, schem) {
    this.table = table
    this.sql = knex(sql)
    this.schem = schem
  }
  async init () {
    try {
      const hasTable = await this.sql.schema.hasTable(this.table)
      if (hasTable) {
        console.log('DB IS INITIALIZED')
      } else {
        await this.sql.schema.createTable(this.table, this.schem)
      }
    } catch (e) {
      console.log('DB IS NOT INITIALIZED, A PROBLEM OCCURRED')
      throw e
    }
  }
  async getAll () {
    try {
      const list = await this.sql(this.table)
      return list
    } catch (e) {
      throw e
    }
  }

  async save (obj) {
    try {
      const item = this.sql
        .insert({ ...obj, timestamp: Date.now() })
        .into(this.table)
      return item
    } catch (e) {
      throw new Error('No se pudo guardar el objeto')
    }
  }
  async getById (id) {
    try {
      const list = await this.getAll()
      const item = list.find(obj => obj.id === parseInt(id))
      if (!item) {
        const err = new Error('No se encontro el objeto')
        err.status = 404
        throw err
      }
      return item
    } catch (e) {
      throw e
    }
  }

  async getRandom () {
    try {
      const list = await this.getAll()
      const item = list[Math.floor(Math.random() * list.length)]
      return item
    } catch (e) {
      throw e
    }
  }
  async deleteById (id) {
    try {
      let data = await this.getById(id)
      if (!data) {
        let err = new Error('No se encontró el objeto')
        err.status = 404
        throw err
      }
      await this.sql(this.table)
        .del()
        .where('id', id)
    } catch (e) {
      throw e
    }
  }
  async update (id, newInfo) {
    try {
      const data = await this.getById(id)
      console.log(data)
      if (data)
        this.sql(this.table)
          .update(newInfo)
          .where('id', id)
      else {
        let err = new Error('No se encontró el objeto')
        err.status = 404
        throw err
      }
      return { ...data, ...newInfo }
    } catch (e) {
      throw e
    }
  }
  async deleteAll () {
    try {
      await this.sql(this.table).del()
    } catch (e) {
      throw e
    }
  }
}
