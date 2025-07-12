import { Hono } from 'hono'
import { corsMiddleware } from './middleware/cors'
import { logger } from './middleware/logger'
import publicRouter from './routers/public'
import { authMiddleWare } from './middleware/auth'
import privateRouter from './routers/private'
import apiRouter from './routers/api'


type Variables = {
  userId : string
}


const app = new Hono<{Variables: Variables}>()



app.use('*', corsMiddleware)

app.use('*', logger)

app.use('/private/*', authMiddleWare)

app.route('/', publicRouter)

app.route('/private', privateRouter)

app.route('/api', apiRouter)



app.onError((err,c) => {
  console.log("Error: ",err.message)
  return c.text("An error occurred.",500)
})


export default app
