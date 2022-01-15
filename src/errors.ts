import { clientErrorCodes, isClientErrorCode, isServerErrorCode, serverErrorCodes } from './codes'
import { lang } from './lang'

export enum Status {
  Success = 'success',
  ClientError = 'fail',
  ServerError = 'error',
}

type ResponseJSON = { status: Status, [key: string]: any }

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

  abstract json(): ResponseJSON
}

/**
 * An error that indicates that the server failed to process the request.
 */
export class ServerError extends APIError {
  constructor(
    message: string,
    data: object = {},
    code: number = serverErrorCodes.InternalServerError,
  ) {
    super(message, data, code)

    if (!isServerErrorCode(code)) {
      throw new Error('Code must be between 500 and 599')
    }

    // Irritating Javascript idiosyncrasy.
    Object.setPrototypeOf(this, ServerError.prototype)
  }

  json(): ResponseJSON {
    return {
      ...this.data,
      status: Status.ServerError,
      message: this.message,
    }
  }
}

/**
 * An error that indicates that the request was malformed.
 */
export class ClientError extends APIError {
  constructor(
    message: string,
    data: object = {},
    code: number = clientErrorCodes.BadRequest,
  ) {
    super(message, data, code)

    if (!isClientErrorCode(code)) {
      throw new Error('Code must be between 400 and 499')
    }

    // Irritating Javascript idiosyncrasy.
    Object.setPrototypeOf(this, ClientError.prototype)
  }

  json(): ResponseJSON {
    return {
      ...this.data,
      status: Status.ClientError,
      message: this.message,
    }
  }
}

export class CORSError extends ClientError {
  constructor() {
    super(lang.corsError, {}, clientErrorCodes.Forbidden)  // TODO
  }
}
