export type ReturnedPromiseResolvedType<T> = T extends (...args: any[]) => Promise<infer R> ? R : never;

export type RouteParams<T extends string> =
    string extends T
    ? Record<string, string>
    : T extends `${infer Start}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof RouteParams<Rest>]: string }
    : T extends `${infer Start}:${infer Param}`
    ? { [k in Param]: string }
    : {};

export type ApplyPath<P, R> = (params:RouteParams<P>) => R

export type router = <P extends string, R>(path: P, map:ApplyPath<P, R>) => void

const route = <P extends string, R>(path: P, map:ApplyPath<P, R>):void => {
    
}

route("/foo/bar/:fizz", ({fizz}) => "foo")

