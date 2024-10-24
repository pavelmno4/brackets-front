export function maxBy<T>(array: Array<T>, valueTransform: (value: T) => any): T {
    return array.reduce((f, s) => valueTransform(f) > valueTransform(s) ? f : s)
}