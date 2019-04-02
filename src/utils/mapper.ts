export type Mapper<T, S> = (t:T) => S

export const combineMappers = <A, B, C, D>(ts:Array<Mapper<A, B>>, u:Mapper<C, D>):Array<Mapper<A | C, B | D>> => {
    return [...ts, u] as Array<Mapper<A | C, B | D>>
}