import axios from 'axios'
import chalk from 'chalk'
import type {LexicaTypes} from '@/server/types/images'
export default defineEventHandler(async(event) => {
  //gridQ = grid query
  //nsfwQ = nsfw query
  const {q,nsfw:nsfwQ,limit} = getQuery(event)
  let lexicaResponse 

  if(!q) throw createError({
    statusCode: 400,
    message: 'query is required',
    stack: 'query is required',

  })
  try {
    const lexicaUrl = `https://lexica.art/api/v1/search?q=${q}`;
    lexicaResponse = await axios.get<LexicaTypes>(lexicaUrl);
  
  console.log(chalk.yellowBright(`Res API Lexica: ${lexicaResponse.data.images.length}`))
  } catch (error:any) {
    console.log("API error", error.response.statusText)
    if(error.response.statusText === "Too Many Requests"){
      throw createError({
        statusCode: 429,
        message: 'Too Many Requests',
        stack: 'Too Many Requests',
      })

    }
  }

  if(nsfwQ == 0 ){
    console.log("Bandera 1")
    lexicaResponse?.data.images.filter(image => image.nsfw !== false )
    console.log(chalk.greenBright(`Res bandera 1: ${lexicaResponse?.data.images.length}`))
   return lexicaResponse?.data .images.slice(0,Number(limit))
  }
 
  return lexicaResponse?.data.images.slice(0,Number(limit))

})
