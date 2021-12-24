import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

// c.f. https://github.com/omniti-labs/jsend

// TODO: Better class hierarchy.

enum Status {
  Success = 'success',
  ClientError = 'failure',
  ServerError = 'error',
}

// TODO: Promise<object> | object
type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<object>

abstract class APIError extends Error {
  constructor(
    message: string,
    public data: object,
    public code: number,
  ) {
    super(message)

    // TODO: Is this OK?
    this.name = this.constructor.name
  }
}

export class ServerError extends APIError {
  constructor(
    message: string,
    data: object = {},
    code: number = 500,
  ) {
    super(message, data, code)

    if (this.code < 500 || this.code > 599) {
      throw new Error('Code must be between 500 and 599')
    }
  }
}

export class ClientError extends APIError {
  constructor(
    message: string,
    data: object = {},
    code: number = 400,
  ) {
    super(message, data, code)

    if (this.code < 400 || this.code > 499) {
      throw new Error('Code must be between 400 and 499')
    }
  }
}

export function json(handler: Handler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data = await handler(req, res)
      res.status(200).json({
        status: Status.Success,
        data,
      })

    } catch (err) {
      // The request contained invalid data.
      if (err instanceof ClientError) {
        res.status(err.code).json({
          ...err.data,
          status: Status.ClientError,
          message: err.message,
        })
        return
      }

      // The error is our fault, so log it.
      console.error(err)

      // The server failed to process the request.
      if (err instanceof ServerError) {
        res.status(err.code).json({
          ...err.data,
          status: Status.ServerError,
          message: err.message,
        })
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
