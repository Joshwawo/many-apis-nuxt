/**
 * @description Voice model type
 */
export type resVoices = {
  failed_at: string;
  finished_at: string;
  meta:{
    duration: number;
    pace: number;
    pitch: number;
    voice: string;
    voicemodel_uuid: string;
  }
  path: string;
  started_at: string;
  voice_actor: string;
  display_voice: string;
  uuid: string;
  tts: string;
}

export type bodyVoices = {
  tts: string | undefined;
  voice: string;
  pace?: number;
  duration?: number; //TODO: cambiar a array de numeros
  pitch?: number;
  voicemodel_uuid?: string;
  display_voice: string;
};