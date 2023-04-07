export default defineEventHandler((event) => {
  return {
    api: 'works',
    data: {
      message: 'Hello World',
      // metaData: {
      //   url: event.node.req.url,
      //   method: event.node.req.method,
      //   headers: event.node.req.headers,
      //   params: event.node.req.params,
      //   query: event.node.req.query,

        
      // }
    }
  }
} )