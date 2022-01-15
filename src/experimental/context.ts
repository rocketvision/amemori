import { DuplicateParameterError, EmptyParameterError } from './errors'

export class Context {
  constructor(
    readonly name: string,
    readonly values: string[],
    readonly options: Options,
  ) { }

  rejectEmpty() {
    if (this.values.length === 0) {
      throw new EmptyParameterError(this.name)
    }
  }

  rejectDuplicate() {
    if (this.options.ignoreDuplicates) {
      return
    }
    if (this.values.length > 1) {
      throw new DuplicateParameterError(this.name)
    }
  }

  rejectEmptyOrDuplicate() {
    this.rejectEmpty()
    this.rejectDuplicate()
  }

  withValues(values: string[]) {
    return new Context(this.name, values, this.options)
  }

  withValue(value: string) {
    return this.withValues([value])
  }

  get lastValue(): string {
    return this.values[this.values.length - 1]
  }
}
