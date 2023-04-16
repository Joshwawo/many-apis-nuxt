// import {connectDB} from '~/server/configs/config'
import SusModel from '@/server/models/sus'

export default defineEventHandler(async(event) =>{
    // await connectDB()

    const susImages = await SusModel.find()

    return susImages


})