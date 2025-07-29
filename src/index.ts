import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes'
import { connectMongo } from './config/db'

dotenv.config()
const app = express()
app.use(express.json())

app.use('/api', userRoutes)

const PORT = process.env.PORT || 3000

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API en écoute sur http://localhost:${PORT}`)
  })
})
