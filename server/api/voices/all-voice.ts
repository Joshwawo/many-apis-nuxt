import axios from 'axios'
export default defineEventHandler(async(event) => {
  const {mode,lang} = getQuery(event)
  
  let url;
  url = `https://api.uberduck.ai/voices?mode=${mode}`;
  if (lang === "undefined" || lang === undefined) {
    url = `https://api.uberduck.ai/voices?mode=${mode}`;
  } else {
    url = `https://api.uberduck.ai/voices?mode=${mode}&language=${lang}`;
  }
  const response = await axios.get(url)
  return response.data

})
