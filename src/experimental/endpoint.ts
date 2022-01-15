import { IncomingMessage, OutgoingMessage } from 'http'
import { clientErrorCodes, isSuccessfulCode, serverErrorCodes, successfulCodes } from '../codes'
import { ClientError, CORSError, ServerError, Status } from '../errors'
import { lang } from '../lang'

type CORSPolicy =
  | 'all'
  | 'none'
  | string[]
  | ((domain: string) => boolean)

type Options = {
  method?: string | string[],
  cors?: CORSPolicy,
}

const defaultOptions: Required<Options> = {
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  cors: 'none',
}

type BasicRequest = IncomingMessage & {
  body: any,
}

type BasicResponse = OutgoingMessage & {
  status(code: number): BasicResponse
  json(body: any): BasicResponse
}

class Context {
  private _status: number

  constructor() {
    this._status = successfulCodes.Ok
  }

  get status(): number {
    return this._status
  }
  set status(value: number) {
    if (!isSuccessfulCode(value)) {
      throw new Error('Only successful status codes can be set on the Context')
    }
    this._status = value
  }
}

class EarlyReturnError extends Error {
  constructor() {
    super('Early return')
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default function endpoint<
  Request extends BasicRequest,
  Response extends BasicResponse
>(
  options: Options,
  handler: (req: Request, res: Response, ctx: Context) => Promise<any>,
) {
  const opts = { ...defaultOptions, ...options }

  const rawMethod = opts.method
  const rawCORS = opts.cors

  const allowedMethods =
    typeof rawMethod === 'string' ? [rawMethod.toUpperCase()] :
      rawMethod.map(m => m.toUpperCase())

  const isDomainAllowed =
    rawCORS === 'all' ? () => true :
      rawCORS === 'none' ? () => false :  // Not actually used.
        Array.isArray(rawCORS) ? (d: string) => rawCORS.includes(d) :
          rawCORS

  const allowedHeaders = ['Content-Type', 'Authorization']

  // TODO: deny: Throw if not same origin.
  function checkOrigin(res: Response, origin?: string) {
    if (origin !== undefined && opts.cors !== 'none') {
      if (opts.cors !== 'all') {
        // If only some origins are allowed, don't mix caches.
        res.setHeader('Vary', 'Origin')

        if (origin === undefined || !isDomainAllowed(origin)) {
          throw new CORSError()  // TODO: More headers?
        }
      }

      // Finally allow CORS request.
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '))
      res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '))
    }
  }

  function checkOptions(res: Response, method?: string) {
    if (method === 'OPTIONS') {
      // TODO: Use given access control headers etc. to check access?
      res.status(200).end()
      throw new EarlyReturnError()
    }
  }

  function checkMethod(res: Response, method?: string) {
    if (!allowedMethods.includes(method || '')) {
      res.setHeader('Allow', allowedMethods.join(', '))
      throw new ClientError(lang.methodNotAllowed,
        { method }, clientErrorCodes.MethodNotAllowed)
    }
  }

  return async (req: Request, res: Response) => {
    try {

      const method = req.method?.toUpperCase()
      const origin = req.headers.origin

      checkOrigin(res, origin)
      checkOptions(res, method)
      checkMethod(res, method)

      const ctx = new Context()

      const result = await handler(req, res, ctx)
      res.status(ctx.status).json({
        status: Status.Success,
        data: result || null,
      })

    } catch (error) {

      if (error instanceof EarlyReturnError) {
        return
      }
      if (error instanceof ClientError) {
        res.status(error.code).json(error.json())
        return
      }

      // The error is our fault, so log it.
      console.error(error)

      if (error instanceof ServerError) {
        res.status(error.code).json(error.json())
        return
      }

      res.status(serverErrorCodes.InternalServerError).json({
        status: Status.ServerError,
        message: lang.internalServerError,
      })

    }
  }
}
