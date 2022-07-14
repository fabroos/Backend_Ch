import { Router } from 'express'
import {
  registerControler,
  loginControler,
  authController
} from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/register', registerControler)
authRouter.get('/failureRegister', authController.failureRegister)
authRouter.get('/successRegister', authController.successRegister)
//
authRouter.post('/login', loginControler)
authRouter.get('/failureLogin', authController.failureLogin)
authRouter.get('/successLogin', authController.successLogin)
//
authRouter.get('/logout', authController.logout)

export { authRouter }
