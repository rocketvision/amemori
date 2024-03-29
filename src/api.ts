// c.f. https://github.com/omniti-labs/jsend

import { ClientError, ServerError, Status } from './errors'

// TODO: Promise<object> | object
type JSONHandler<T, U> = (req: T, res: U) => Promise<object | null | void>

type WrappedHandler<T, U> = (req: T, res: U) => Promise<void>

type BasicResponse = {
  status(code: number): BasicResponse
  json(body: any): BasicResponse
}

/**
 * Create a handler that simplifies JSON-based APIs.
 * 
 * If the handler returns a value, the response will be a success, the
 * `status` property will be `"success"` and the value will be
 * converted to JSON and returned in the `data` property.
 * 
 * If the handler returns `null` or doesn't return explicitly, the
 * response will be a success and the `data` property will be `null`.
 * 
 * If the handler throws an error, the response depends on the type of
 * the error:
 * 
 * For {@link ClientError}, the code will be 400 (or the error object's
 * custom code, if one was provided), the `status` property will be
 * `"failure"` and the `message` property will contain the error
 * message.
 * 
 * For {@link ServerError}, the code will be 500 (or the error object's
 * custom code, if one was provided), the `status` property will be
 * `"error"` and the `message` property will contain the error message.
 * 
 * For other errors, the code will be 500, the `status` property will
 * be `"error"` and the `message` property will contain the error's
 * message, if the error is an instance of {@link Error}, or a default
 * message otherwise.
 * 
 * Unless the error is a {@link ClientError}, it will be logged.
 * 
 * @param handler The handler to wrap.
 * @returns A Next.js API handler.
 */
export function json<
  T, U extends BasicResponse
>(
  handler: JSONHandler<T, U>,
): WrappedHandler<T, U> {
  return async (req: T, res: U) => {
    try {
      const data = await handler(req, res)
      res.status(200).json({
        status: Status.Success,
        data: data || null,
      })

    } catch (err) {
      // The request contained invalid data.
      if (err instanceof ClientError) {
        res.status(err.code).json(err.json())
        return
      }

      // The error is our fault, so log it.
      console.error(err)

      // The server failed to process the request.
      if (err instanceof ServerError) {
        res.status(err.code).json(err.json())
        return
      }

      // Any other error is assumed to be internal.
      let message = 'Erro desconhecido'
      if (err instanceof Error) {
        message = err.message
      }
      res.status(500).json({
        status: Status.ServerError,
        message,
      })
    }
  }
}
