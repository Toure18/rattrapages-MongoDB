import { Request, Response } from 'express'
import { createUser } from '../services/user.service'

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ error: 'Erreur interne' })
  }
}
