export default defineEventHandler( async(event) => {
  const body = await readBody(event)
  const query = getQuery(event)
  const age = query.age
  
  if(!Number.isInteger(Number(age))){
    throw createError({
      statusCode: 400,
      message: 'Age must be an integer'
    })
  }

  return {
    api: 'works',
    data: {
      message: 'Hello World',
      metaData: {
        body: body,
        query: query,
        url: event.node.req.url,
        method: event.node.req.method,
        // headers: event.node.req.headers,
        params: event.context.params,


        
      }
    }
  }
} )