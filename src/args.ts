export function pickFirst<T>(arg: T | T[] | undefined): T | undefined {
  if (Array.isArray(arg)) {
    return arg[0]
  } else {
    return arg
  }
}

export function pickLast<T>(arg: T | T[] | undefined): T | undefined {
  if (Array.isArray(arg)) {
    return arg[arg.length - 1]
  } else {
    return arg
  }
}

export function pickAll<T>(arg: T | T[] | undefined): T[] | undefined {
  if (Array.isArray(arg)) {
    return arg
  } else {
    return arg === undefined ? undefined : [arg]
  }
}
