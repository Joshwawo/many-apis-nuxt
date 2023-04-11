import {clienteAxiosLol,clienteAxiosLolAmericas} from '@/helpers/clienteAxios'
import type {summoner, MatchIDTypes} from '@/server/types/Lol'

export default defineEventHandler(async (event) => {

  const {nickname} = getQuery(event)
  console.log("Nombre",nickname)
  if(!nickname) {
    throw createError({
      statusCode: 400,
      message: 'nickname is required',
      stack: 'nickname is required',
    })
  }



  try {
    const response = await clienteAxiosLol.get<summoner>(`/summoner/v4/summoners/by-name/${nickname}`)
    const matchs = await clienteAxiosLolAmericas.get<string[]>(`/match/v5/matches/by-puuid/${response.data.puuid}/ids?start=0&count=1`)
    const matchId = await clienteAxiosLolAmericas.get<MatchIDTypes>(`/match/v5/matches/${matchs.data[0]}`)
    return matchId.data
  } catch (error : any) {
    console.log(error.response.data)
  }
});