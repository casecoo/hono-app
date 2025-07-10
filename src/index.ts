import { Hono } from 'hono'
import type { Context } from 'hono'
import { cors } from 'hono/cors'


type Variables = {
  userId : string
}


const app = new Hono<{Variables: Variables}>()



app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS','PUT'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))



function checkAuth(c: Context): boolean {
  const token = c.req.header('Authorization');
  return token === 'Bearer test-token'
}

app.use('*', async (c, next) => {
  console.log(`HTTP request : [${c.req.method}] request path: ${c.req.path}`)
  await next() 
})

app.use('/private/*', async (c, next) => {
  const userId = '120'
  c.set('userId',userId)
  const isAdmin = checkAuth(c)
  if (!isAdmin) return c.text('Unauthorized access!', 401)
  await next()
})


app.get('/', (c) => {
  return c.text('Hello World!')
})

app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`User id is: ${id}`)
})

app.get('private/data',(c) => c.text(`Private information for id: ${c.get('userId')} => -exampleprivatedata-`))

app.get('/search', (c) => {
  const q = c.req.query("q")
  return c.text(`Search: ${q}`)
})

app.post('/api/data', async (c) => {
  const body = await c.req.json()
  return c.json({
    message:'Post request received',
    data: body
  })
})


app.put('/api/data/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  return c.json({
    message:`Data with ID ${id} updated.`,
    updated: body
  })
})


// This method is not allowed to use. It won't work on browser.
app.delete('/api/data/:id', (c) => {
  const id = c.req.param('id')
  return c.json({
    message:`Data with ID ${id} deleted.`
  })
})


app.onError((err,c) => {
  console.log("Error: ",err.message)
  return c.text("An error occurred.",500)
})


export default app
