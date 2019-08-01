export const toString = (data: any) => data.toString()

type PipeFn = (data: any) => any
export const pipe = (...fn: PipeFn[]) => (data: any) => fn.reduce((acc, f) => f(acc), data)
