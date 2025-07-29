import mongoose from 'mongoose'
import { InfluxDB } from '@influxdata/influxdb-client'
import dotenv from 'dotenv'

dotenv.config()

export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log('✅ Connecté à MongoDB')
  } catch (err) {
    console.error('❌ Erreur MongoDB', err)
    process.exit(1)
  }
}

export function getInfluxClient() {
  return new InfluxDB({
    url: process.env.INFLUX_URL!,
    token: process.env.INFLUX_TOKEN!,
  })
}
