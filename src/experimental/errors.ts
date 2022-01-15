import { ClientError } from '../errors'
import { lang } from '../lang'

export abstract class ParameterError extends ClientError {
  constructor(
    message: string,
    data: object = {},
  ) {
    super(message, data)

    // Irritating Javascript idiosyncrasy.
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class EmptyParameterError extends ParameterError {
  constructor(
    readonly name: string,
  ) {
    super(lang.missingParameter, {
      parameter: name,
    })

    // Irritating Javascript idiosyncrasy.
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class DuplicateParameterError extends ParameterError {
  constructor(
    readonly name: string,
  ) {
    super(lang.duplicateParameter, {
      parameter: name,
    })

    // Irritating Javascript idiosyncrasy.
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class InvalidChoiceError extends ParameterError {
  constructor(
    readonly name: string,
    readonly value: string,
    readonly choices: string[],
  ) {
    super(lang.invalidChoice, {
      parameter: name,
      choices,
      value,
    })

    // Irritating Javascript idiosyncrasy.
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class InvalidParameterError extends ParameterError {
  constructor(
    readonly name: string,
    readonly value: string,
  ) {
    super(lang.invalidParameter, {
      parameter: name,
      value,
    })

    // Irritating Javascript idiosyncrasy.
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
