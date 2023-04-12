import {connectDB} from '@/server/config/config'
import SusModel from '@/server/models/sus'

export default defineEventHandler(async(event) =>{
    await connectDB()
    const {nsfw} = getQuery(event)
    const nsfwQ = nsfw === "true" ? true : false
    const susImages = await SusModel.find()

    const resSusImg = susImages.map((image) => {
        return {
            susImg: image.susImage.url,
            nsfw: image.nsfw
        }
    })
    const filter = resSusImg.filter((img) => img.nsfw === nsfwQ)

    const random = Math.floor(Math.random() * filter.length)

    return filter[random]


})