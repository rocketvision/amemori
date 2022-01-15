import { Context } from './context'
import { Parser } from './types'

export function parseFields<
  T extends Record<string, Parser<any>>
>(
  fields: Record<string, string | string[]>,
  params: T,
  options: Options = defaultOptions,
): { [key in keyof T]: ReturnType<T[key]> } {
  const result: Record<string, any> = {}

  const args = new Map<string, string[]>()
  for (const [name, value] of Object.entries(fields)) {
    const tail = Array.isArray(value) ? value : [value]
    if (args.has(name)) {
      args.set(name, args.get(name)!.concat(tail))
    } else {
      args.set(name, tail)
    }
  }

  for (const [name, parse] of Object.entries(params)) {
    result[name] = parse(new Context(name, args.get(name) || [], options))
  }

  // Theoretically unsafe...
  return result as { [key in keyof T]: ReturnType<T[key]> }
}
