import { z } from 'zod'





/*
 Body of POST and PUT methods 

name: string (required)
value: number (required)

*/

export const dataSchema = z.object({
    name:  z.string(),
    value: z.number(),
  })


/*

Path parameter: id
- id must be a positive integer.

*/

export const idParamSchema = z.object({
id: z.coerce.number().int().positive(),
})