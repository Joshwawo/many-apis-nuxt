import {connect} from 'mongoose';
import {Nitro} from 'nitropack'

export default async (_nitroApp: Nitro) => {
  try {
      const config = useRuntimeConfig()
      const db = await connect(String(config.NUXT_MONGO_URI))
    // const db = await connect(String(process.env.NUXT_MONGO_URI))
    console.log(`Conectado a la bd: ${db.connection.name}`)
    
  } catch (error) {
    console.log(error)
  }
}
