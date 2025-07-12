import type { Context } from 'hono'


export function checkAuth(c: Context): boolean {
    const token = c.req.header('Authorization');
    return token === 'Bearer test-token'
}