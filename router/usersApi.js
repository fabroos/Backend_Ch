import express from 'express'
import Container from '../Containers/MongoDB.js'
import bcrypt from 'bcrypt'

const router = express.Router()

const users = new Container('users')
function validateMail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
function validatePassword (password) {
  return password.length >= 6
}

export { router as usersRouter }
