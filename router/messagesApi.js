import express from 'express'
import { messageController } from '../controllers/messagesController.js'
const router = express.Router('/api/messages')

router.get('/', messageController.getAllmessages)
router.get('/:id', messageController.getmessageById)
router.post('/', messageController.createmessage)
router.put('/:id', messageController.updatemessage)
router.delete('/:id', messageController.deletemessage)

export { router as messageRouter }
