import chalk, {ChalkInstance} from 'chalk'

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


export default defineEventHandler((event) => {
 
  // console.log(
  //   chalk.cyanBright(event.node.req.url),
  //   chalk[statusColor[event.node.res.statusCode]](event.node.res.statusCode),
  //   chalk[httpMethods[event.node.req.method]](event.node.req.method),
  //   chalk.blueBright(event.node.req.headers.host)

  // )
  // console.log(`Path: ${event.node.req.url} Method: ${event.node.req.method} host: ${event.node.req.headers.host} statusCode: ${event.node.res.statusCode}`)
})


