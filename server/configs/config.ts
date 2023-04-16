import {connect,set} from 'mongoose'

export const connectDB =async ():Promise<void> => {
  try {

    const db = await connect(String(process.env.NUXT_MONGO_URI))
    console.log(`Conectado a la bd: ${db.connect.name}`)
    
  } catch (error) {
    console.log(error)
  }
}
