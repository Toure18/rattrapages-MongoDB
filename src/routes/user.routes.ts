import express from 'express'
import { userSchema } from '../schemas/user.schema'
import { validate } from '../middlewares/validate'
import { createUserHandler } from '../controllers/user.controller'

const router = express.Router()

router.post('/users', validate(userSchema), createUserHandler)

export default router
