import { apiGatewayFunction, albFunction } from '../src/lambda';
import { ReturnedPromiseResolvedType } from '../../core/src/typescript';

describe('lambda', () => {
    describe('API Gateway', () => {
        it('returns with statusCode 200', async () => {
            const fun = async (input: { foo: number }): Promise<{ bar: number }> => ({ bar: input.foo })

            const wrapped = apiGatewayFunction(fun)

            const result = await wrapped({ body: JSON.stringify({ foo: 1 }) } as any, {} as any)

            expect(result.body).toBe(JSON.stringify({ bar: 1 }))
            expect(result.statusCode).toBe(200)
        })
        it('returns with statusCode 500', async () => {
            const fun = async (input: { foo: number }): Promise<{ bar: number }> => { throw "error" }

            const wrapped = apiGatewayFunction(fun)

            const result = await wrapped({ body: JSON.stringify({ foo: 1 }) } as any, {} as any)

            expect(result.body).toBe(JSON.stringify("error"))
            expect(result.statusCode).toBe(500)
        })
        it('can route', async () => {            
            const fun = async (input: { foo: number }): Promise<{ bar: number }> => { throw "error" }

            



        })
    })
    describe('ALB/ELB', () => {
        it('returns with statusCode 200', async () => {
            const fun = async (input: { foo: number }): Promise<{ bar: number }> => ({ bar: input.foo })

            const wrapped = albFunction(fun)

            const result = await wrapped({ body: JSON.stringify({ foo: 1 }) } as any, {} as any)

            expect(result.body).toBe(JSON.stringify({ bar: 1 }))
            expect(result.statusCode).toBe(200)
        })
        it('returns with statusCode 500', async () => {
            const fun = async (input: { foo: number }): Promise<{ bar: number }> => { throw "error" }

            const wrapped = albFunction(fun)
            

            const result = await wrapped({ body: JSON.stringify({ foo: 1 }) } as any, {} as any)

            expect(result.body).toBe(JSON.stringify("error"))
            expect(result.statusCode).toBe(500)
        }) 
    })
})