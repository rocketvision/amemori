import { Context } from './context'
import { EmptyParameterError, InvalidChoiceError, InvalidParameterError } from './errors'

export type Parser<T> = (ctx: Context) => T

export function boolean(ctx: Context): boolean {
  ctx.rejectEmptyOrDuplicate()
  if (['true', '1'].includes(ctx.lastValue)) {
    return true
  }
  if (['false', '0'].includes(ctx.lastValue)) {
    return false
  }
  throw new InvalidChoiceError(ctx.name, ctx.lastValue)
}

export function string({
  minLength,
  maxLength,
}: {
  minLength?: number,
  maxLength?: number,
}): Parser<string> {
  return (ctx: Context) => {
    ctx.rejectEmptyOrDuplicate()

    const value = ctx.lastValue
    if (minLength !== undefined && value.length < minLength) {
      throw new InvalidParameterError(ctx.name, ctx.lastValue)  // TODO
    }
    if (maxLength !== undefined && value.length > maxLength) {
      throw new InvalidParameterError(ctx.name, ctx.lastValue)  // TODO
    }

    return value
  }
}

export const anyString = string({})

export const nonEmptyString = string({ minLength: 1 })

export function number({
  min,
  max,
}: {
  min?: number,
  max?: number,
}): Parser<number> {
  return (ctx: Context) => {
    ctx.rejectEmptyOrDuplicate()

    const value = Number(ctx.lastValue)
    if (min !== undefined && value < min) {
      throw new InvalidParameterError(ctx.name, ctx.lastValue)  // TODO
    }
    if (max !== undefined && value > max) {
      throw new InvalidParameterError(ctx.name, ctx.lastValue)  // TODO
    }

    return value
  }
}

export const anyNumber = number({})

export const nonNegativeNumber = number({ min: 0 })

export function decimal({
  min,
  max,
}: {
  min?: number,
  max?: number,
}): Parser<number> {
  return (ctx: Context) => {
    ctx.rejectEmptyOrDuplicate()

    const value = parseInt(ctx.lastValue, 10)
    if (min !== undefined && value < min) {
      throw new InvalidParameterError(ctx.name, ctx.lastValue)  // TODO
    }
    if (max !== undefined && value > max) {
      throw new InvalidParameterError(ctx.name, ctx.lastValue)  // TODO
    }

    return value
  }
}

export const anyDecimal = decimal({})

export const nonNegativeDecimal = decimal({ min: 0 })

export function optional<T>(inner: Parser<T>): Parser<T | undefined> {
  return (ctx) => {
    if (ctx.values.length === 0) {
      return undefined
    }
    return inner(ctx)
  }
}

export function choice(...choices: string[]): Parser<string> {
  return (ctx: Context) => {
    ctx.rejectEmptyOrDuplicate()
    if (!choices.includes(ctx.lastValue)) {
      throw new InvalidChoiceError(ctx.name, ctx.lastValue)
    }
    return ctx.lastValue
  }
}

export function choiceFrom(choices: string[]): Parser<string> {
  return choice(...choices)
}

export function array<T>(inner: Parser<T>, {
  minLength,
  maxLength,
}: {
  minLength?: number,
  maxLength?: number,
}): Parser<T[]> {
  return function (ctx: Context) {
    if (minLength !== undefined && ctx.values.length < minLength) {
      throw new InvalidParameterError(ctx.name, ctx.lastValue)  // TODO
    }
    if (maxLength !== undefined && ctx.values.length > maxLength) {
      throw new InvalidParameterError(ctx.name, ctx.lastValue)  // TODO
    }
    return ctx.values.map(v => inner(ctx.withValue(v)))
  }
}

export default {
  boolean,
  string,
  anyString,
  nonEmptyString,
  number,
  anyNumber,
  nonNegativeNumber,
  decimal,
  anyDecimal,
  nonNegativeDecimal,
  optional,
  choice,
  choiceFrom,
  array,
}
