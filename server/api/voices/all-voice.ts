import {clienteAxiosUberduck} from '@/helpers/clienteAxios'
export default defineEventHandler(async(event) => {
  const {mode,lang} = getQuery(event)
  
  let url;
  url = `/voices?mode=${mode}`;
  if (lang === "undefined" || lang === undefined) {
    url = `/voices?mode=${mode}`;
  } else {
    url = `/voices?mode=${mode}&language=${lang}`;
  }
  const response = await clienteAxiosUberduck.get(url)
  return response.data

})
