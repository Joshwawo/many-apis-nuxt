import "dotenv/config";
import axios, { AxiosResponse } from "axios";
import chalk from 'chalk';
import {connectDB} from '@/server/config/config';
import {resVoices,bodyVoices} from '@/server/types/voices'
import VoicesModel from '@/server/models/voices'

const statusCode = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  301: "Moved Permanently",
  302: "Found",
  304: "Not Modified",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  409: "Conflict",
  410: "Gone",
  415: "Unsupported Media Type",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
}
const statusColor = {
  200: "greenBright",
  201: "greenBright",
  202: "greenBright",
  204: "greenBright",
  301: "yellowBright",
  302: "yellowBright",
  304: "yellowBright",
  400: "redBright",
  401: "redBright",
  403: "redBright",
  404: "redBright",
  405: "redBright",
  406: "redBright",
  409: "redBright",
  410: "redBright",
  415: "redBright",
  422: "redBright",
  429: "redBright",
  500: "redBright",
  502: "redBright",
  503: "redBright",
  504: "redBright",

  
}

const httpMethods = {
  GET: "blueBright",
  POST: "greenBright",
  PUT: "yellowBright",
  DELETE: "redBright",
  PATCH: "yellowBright",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  
}


const getVoiceStatus = async(urlVoiceUuid: string, uuid: string): Promise<resVoices> =>{
  const response = await axios.get<resVoices>(`${urlVoiceUuid}=${uuid}`);
  if (response.data.path === null) {
    // Si la propiedad 'path' es nula, espera 2 segundos y llama a la función recursiva de nuevo
    console.log("Bandera recursiva - getVoiceStatus ❗❗❗")
    await new Promise(resolve => setTimeout(resolve,4500));
    return await getVoiceStatus(urlVoiceUuid, uuid);
  }
  return response.data;
}

export default defineEventHandler(async (event) => {
  await connectDB();
  console.log("Bandera 1 - defineEventHandler 🔵");
  const body: bodyVoices = await readBody(event);
  console.log(body)
  if(!body.tts || !body.voice){
    throw createError({
      statusCode: 400,
      message: "tts and voice are required",
    });
  }
  let postVoice: AxiosResponse<any, any>;
  try {
    //post voice URL
    const URLPOSTOICE = "https://api.uberduck.ai/speak";
    postVoice = await axios.post(URLPOSTOICE,
      {
        speech: body.tts,
        voice: body.voice,
      },
      {
        headers: {
          accept: "application/json",
          "uberduck-id": "anonymous",
          "content-type": "application/json",
          Authorization: `Basic ${process.env.API_KEY_UBERDUCK}`,
        },
      }
      );
      console.log("Bandera 2 - postVoice 🟠");
    } catch (error:any) {
      throw createError({
        statusCode: 404,
      message: error.response.data.detail,
    });    
  }
  const urlVoiceUuid = "https://api.uberduck.ai/speak-status?uuid";
  const voiceStatus = await getVoiceStatus(urlVoiceUuid, postVoice.data.uuid);
  voiceStatus.voice_actor = body.voice;
  voiceStatus.display_voice = body.display_voice;
  voiceStatus.uuid = postVoice.data.uuid
  voiceStatus.tts = body.tts
  const voicesResponse = await VoicesModel.create(voiceStatus);
  console.log("Bandera 3 - Response API ✅✅✅");
  console.log(chalk.yellowBright(`code: ${event.node.res.statusCode}, url: ${event.node.req.url}, method: ${event.node.req.method}`))
  return voicesResponse;
});
