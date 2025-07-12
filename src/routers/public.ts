import { Hono } from 'hono'


const publicRouter = new Hono()

publicRouter.get('/', (c) => c.text('Hello World!'))

publicRouter.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`User id is: ${id}`)
})

publicRouter.get('/search', (c) => {
  const q = c.req.query('q')
  return c.text(`Search: ${q}`)
})

export default publicRouter