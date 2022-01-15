import { ClientError } from '../errors'
import { lang } from '../lang'

export abstract class ParameterError extends ClientError {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class EmptyParameterError extends ParameterError {
  constructor(
    readonly name: string,
  ) {
    super(lang.missingParameter
      .replace('{name}', name))
  }
}

export class DuplicateParameterError extends ParameterError {
  constructor(
    readonly name: string,
  ) {
    super(lang.duplicateParameter
      .replace('{name}', name))
  }
}

export class InvalidChoiceError extends ParameterError {
  constructor(
    readonly name: string,
    readonly value: string,
  ) {
    super(lang.invalidChoice
      .replace('{name}', name)
      .replace('{value}', value))
  }
}

export class InvalidParameterError extends ParameterError {
  constructor(
    readonly name: string,
    readonly value: string,
  ) {
    super(lang.invalidParameter
      .replace('{name}', name)
      .replace('{value}', value))
  }
}
