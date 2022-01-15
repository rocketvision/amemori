export const successfulCodes = {
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
}

export const unusualSuccessCodes = {
  NonAuthoritativeInformation: 203,
  MultiStatus: 207,
  AlreadyReported: 208,
  IMUsed: 226,
}

export const clientErrorCodes = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  URITooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
}

export const unusualClientErrorCodes = {
  PaymentRequired: 402,
  TooEarly: 425,
}

export const serverErrorCodes = {
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
}

export function isInformationalCode(code: number): boolean {
  return code >= 100 && code < 200
}

export function isSuccessfulCode(code: number): boolean {
  return code >= 200 && code < 300
}

export function isRedirectionCode(code: number): boolean {
  return code >= 300 && code < 400
}

export function isClientErrorCode(code: number): boolean {
  return code >= 400 && code < 500
}

export function isServerErrorCode(code: number): boolean {
  return code >= 500 && code < 600
}

export function getCodeCategory(code: number) {
  if (isInformationalCode(code)) {
    return 'informational'
  }
  if (isSuccessfulCode(code)) {
    return 'successful'
  }
  if (isRedirectionCode(code)) {
    return 'redirection'
  }
  if (isClientErrorCode(code)) {
    return 'client error'
  }
  if (isServerErrorCode(code)) {
    return 'server error'
  }
  return 'unknown'
}
