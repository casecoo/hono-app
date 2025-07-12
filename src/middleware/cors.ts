import { cors } from 'hono/cors'



export const corsMiddleware = cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS','PUT'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })