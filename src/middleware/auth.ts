import type { Context, Next } from 'hono'
import { checkAuth } from '../utils/auth-utils'




export async function authMiddleWare(c: Context, next: Next) {
    
    const userId = '120'
    c.set('userId',userId)
    const isAuthorized = checkAuth(c)
    if (!isAuthorized) return c.text('Unauthorized access!', 401)
    await next()
      
}