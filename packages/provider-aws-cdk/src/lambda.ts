import { APIGatewayProxyEvent, Context, APIGatewayProxyResult, ALBEvent, ALBResult, ALBEventRequestContext } from "aws-lambda";

type AsyncRequestResponseHandler<TRequest, TResponse> = (request: TRequest) => Promise<TResponse>

/**
 * With statusCode mixin
 */
type withStatusCode = { statusCode: number }
/**
 * With body mixin
 */
type withBody = { body?: string | null }

const awsAsyncHttpFunction = <TEvent extends withBody, TContext, TResult extends withStatusCode & withBody>(
    ) => <TRequest, TResponse>(fun: AsyncRequestResponseHandler<TRequest, TResponse>)
        : (event: TEvent, context: TContext) => Promise<TResult> => {
        return (_event: TEvent, _context: TContext): Promise<TResult> => {
            return new Promise<TResult>(async (resolve, reject) => {
                try {
                    const response = await fun(JSON.parse(_event.body || "undefined") as TRequest)
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(response)
                    } as TResult)
                } catch (e) {
                    resolve({
                        statusCode: 500,
                        body: JSON.stringify(e)
                    } as TResult)
                }
            })
        }
    }

/**
 * Wraps a function of type (request:TRequest) => TResponse for AWS API Gateway invocation.
 */
export const apiGatewayFunction = awsAsyncHttpFunction<APIGatewayProxyEvent, Context, APIGatewayProxyResult>()

/**
 * Wraps a function of type (request:TRequest) => TResponse for AWS Application Load Balancer invocation.
 */
export const albFunction = awsAsyncHttpFunction<ALBEvent, ALBEventRequestContext, ALBResult>()