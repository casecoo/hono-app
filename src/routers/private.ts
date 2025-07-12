import { Hono } from 'hono'


const privateRouter = new Hono()

privateRouter.get('/data',(c) => c.text(`Private information => -exampleprivatedata-`))

export default privateRouter