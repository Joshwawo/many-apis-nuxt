import cohere from "cohere-ai";
import { generateRequest } from "cohere-ai/dist/models/index";

export default defineEventHandler(async (event) => {
  cohere.init(String(process.env.NUXT_API_COHERE));

  const body = await readBody(event) as generateRequest;

  if(!body?.prompt) {
     throw createError({
        statusCode: 400,
        message: "Missing prompt"
        
    })
    
  }

  const response = await cohere.generate({
    prompt: body.prompt,
    model: "xlarge",
    max_tokens: body.max_tokens,
    temperature: body.temperature,
    k: body.k,
    p: body.p,
    presence_penalty: body.presence_penalty,
    frequency_penalty: body.frequency_penalty,
    return_likelihoods: body.return_likelihoods,
    truncate: body.truncate,
  } as generateRequest);

  return response.body;
});
