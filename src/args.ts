import { File } from 'formidable'

// TODO: pickFirstOrDefault
// TODO: pickLastOrDefault

/**
 * Return a single value from an argument that might be an array.
 * If the argument is in fact an array, its FIRST element is returned.
 * If the argument is undefined, return undefined.
 * 
 * @param arg The argument to pick.
 * @returns A single value or undefined.
 * 
 * @see {@link pickLast} for picking the LAST element instead.
 */
export function pickFirst<T>(arg: T | T[] | undefined): T | undefined {
  if (Array.isArray(arg)) {
    return arg[0]
  } else {
    return arg
  }
}

/**
 * Return a single value from an argument that might be an array.
 * If the argument is in fact an array, its LAST element is returned.
 * If the argument is undefined, return undefined.
 * 
 * @param arg The argument to pick.
 * @returns A single value or undefined.
 * 
 * @see {@link pickFirst} for picking the FIRST element instead.
 */
export function pickLast<T>(arg: T | T[] | undefined): T | undefined {
  if (Array.isArray(arg)) {
    return arg[arg.length - 1]
  } else {
    return arg
  }
}

/**
 * Return an array from an argument that might be a single element.
 * If the argument is in fact a single element (i.e. NOT an array), it
 * is returned wrapped in an array.
 * If the argument is undefined, return undefined.
 * 
 * @param arg The argument to pick.
 * @returns An array or undefined.
 * 
 * @see {@link pickFiles} for picking an array of files from {@link parseForm}.
 */
// TODO: The file-external link above doesn't work.
export function pickAll<T>(arg: T | T[] | undefined): T[] | undefined {
  if (Array.isArray(arg)) {
    return arg
  } else {
    return arg === undefined ? undefined : [arg]
  }
}

/**
 * Like {@link pickAll}, but return an empty array if undefined.
 * @param arg The argument to pick.
 * @returns An array.
 */
export function pickAllOrEmpty<T>(arg: T | T[] | undefined): T[] {
  return pickAll(arg) ?? []
}

/**
 * Return an array of {@link File} from an argument that might be a
 * single element.
 * If the argument is in fact a single element (i.e. NOT an array), it
 * is returned wrapped in an array.
 * However, if the single element is a {@link File} with an empty
 * filename, an empty array is returned instead.
 * If the argument is undefined, return undefined.
 * 
 * @param arg The argument to pick.
 * @returns An array of {@link File} or undefined.
 * 
 * @see {@link pickAll} for picking a generic array.
 */
export function pickFiles(arg: File | File[] | undefined): File[] | undefined {
  if (Array.isArray(arg)) {
    return arg
  } else {
    if (arg === undefined) {
      return undefined
    }
    if (isEmptyFile(arg)) {
      return []
    }
    return [arg]
  }
}

/**
 * Like {@link pickFiles}, but return an empty array if undefined.
 * @param arg The argument to pick.
 * @returns An array.
 */
export function pickFilesOrEmpty(arg: File | File[] | undefined): File[] {
  return pickFiles(arg) ?? []
}

function isEmptyFile(arg: File) {
  return arg.originalFilename === ''
}
