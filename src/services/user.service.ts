import { UserModel } from '../models/user.model'
import { getInfluxClient } from '../config/db'
import { UserInput } from '../schemas/user.schema'
import { Point } from '@influxdata/influxdb-client'

export const createUser = async (data: UserInput) => {
  const user = await UserModel.create(data)
 
  const influx = getInfluxClient()
  const writeApi = influx.getWriteApi(process.env.INFLUX_ORG!, process.env.INFLUX_BUCKET!)
  writeApi.writePoint(
    new Point('user_created').tag('name', data.name).intField('age', data.age)
  )
  writeApi.close()

  return user
}
