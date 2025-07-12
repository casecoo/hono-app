import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { dataSchema, idParamSchema } from '../validation/schemas'



const apiRouter = new Hono()

apiRouter.post(
    '/data',
    zValidator('json', dataSchema),
    (c) => {
      const body = c.req.valid('json')
      return c.json({ message: 'Post request received', data: body })
    }
  )
  


  apiRouter.put(
    '/data/:id',
    zValidator('param', idParamSchema),
    zValidator('json', dataSchema.partial()),
    (c) => {
      const { id } = c.req.valid('param')
      const body   = c.req.valid('json')
      return c.json({ message: `Data with ID ${id} updated.`, updated: body })
    }
  )





//This method is not allowed to use. It won't work on browser.
apiRouter.delete(
    '/data/:id',
    zValidator('param', idParamSchema),
    (c) => {
      const { id } = c.req.valid('param')
      return c.json({ message: `Data with ID ${id} deleted.` })
    }
  )

export default apiRouter
