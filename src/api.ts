import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

// c.f. https://github.com/omniti-labs/jsend

enum Status {
  Success = 'success',
  BadRequest = 'failure',
  InternalError = 'error',
}

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<object>

export class BadRequestError extends Error {
  constructor(
    public data: { [field: string]: string },
    public code: number = 400,
  ) {
    super('Bad request')

    if (code < 400 || code > 499) {
      throw new Error('Code must be between 400 and 499')
    }

    // TODO: Is this OK?
    this.name = this.constructor.name
  }
}

export class InternalError extends Error {
  constructor(
    message: string,
    public code: number = 500,
  ) {
    super(message)

    if (code < 500 || code > 599) {
      throw new Error('Code must be between 500 and 599')
    }

    // TODO: Is this OK?
    this.name = this.constructor.name
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
      if (err instanceof BadRequestError) {
        res.status(err.code).json({
          status: Status.BadRequest,
          data: err.data,
        })
        return
      }

      // The server failed to process the request.
      if (err instanceof InternalError) {
        res.status(err.code).json({
          status: Status.InternalError,
          message: err.message,
        })
        return
      }

      let message = 'Unknown error'
      if (err instanceof Error) {
        message = err.message
      }
      res.status(500).json({
        status: 'error',
        message,
      })
    }
  }
}
