export type ArrayTwoOrMore<T> = {
    0: T;
    1: T;
} & Array<T>;
export type ReturnTypesOfFunctionProps<T> = {
    [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never;
}[keyof T];
export type RemoteDataNotAsked = {
    type: 'NOT_ASKED';
};
export type RemoteDataLoading = {
    type: 'LOADING';
};
export type RemoteDataFailure<E> = {
    type: 'FAILURE';
    error: E;
};
export type RemoteDataSuccess<D = unknown> = {
    type: 'SUCCESS';
    data: D;
};
export type RemoteData<E, D> = RemoteDataNotAsked | RemoteDataLoading | RemoteDataFailure<E> | RemoteDataSuccess<D>;
export type FoldHandlers<E, D, R> = {
    notAsked: () => R;
    success: (data: D) => R;
    loading?: () => R;
    failure?: (error: E) => R;
};
export type FoldHandlersA<RDS, R> = {
    notAsked: () => R;
    success: (data: Extract<RDS, {
        type: 'SUCCESS';
        data: unknown;
    }>['data'][]) => R;
    loading?: () => R;
    failure?: (error: Extract<RDS, {
        type: 'FAILURE';
        error: unknown;
    }>['error'][]) => R;
};
export declare const notAsked: () => RemoteDataNotAsked;
export declare const loading: () => RemoteDataLoading;
export declare const success: <D>(data: D) => RemoteDataSuccess<D>;
export declare const failure: <E>(error: E) => RemoteDataFailure<E>;
export declare function isLoading<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;
export declare function isLoading<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(remoteData: R): boolean;
export declare function isSuccess<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;
export declare function isSuccess<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(remoteData: R): boolean;
export declare function isFailure<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;
export declare function isFailure<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(remoteData: R): boolean;
export declare function successOrElse<T extends RemoteData<unknown, unknown>, R>(remoteData: T, orElse: () => R): (T extends RemoteDataSuccess<unknown> ? T['data'] : never) | R;
export declare function successOrElse<T extends ArrayTwoOrMore<RemoteData<unknown, unknown>>, R>(remoteData: T, orElse: () => R): (T extends ArrayTwoOrMore<RemoteDataSuccess<unknown>> ? T[number]['data'][] : never) | R;
export declare function fold<E, D, R>(remoteData: RemoteData<E, D>, foldHandlers: FoldHandlers<E, D, R>): ReturnTypesOfFunctionProps<R>;
export declare function fold<RDS, R>(remoteData: ArrayTwoOrMore<RDS>, foldHandlers: FoldHandlersA<RDS, R>): ReturnTypesOfFunctionProps<R>;
