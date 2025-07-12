import type { Context, Next } from 'hono'


export async function logger (c: Context, next: Next) {

    console.log(`HTTP request : [${c.req.method}] request path: ${c.req.path}`)
    await next() 

}