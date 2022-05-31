import knex from 'knex'
import { getConfig } from './knexConfig.js'
export const sqlClient = knex(getConfig())
