import "dotenv/config";
import axios, { AxiosResponse } from "axios";
import chalk from 'chalk';
import {connectDB} from '@/server/config/config';
import type {resVoices,bodyVoices} from '@/server/types/voices'
import VoicesModel from '@/server/models/voices'




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
