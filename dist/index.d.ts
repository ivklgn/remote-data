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
export type RemoteDataReloading = {
    type: 'RELOADING';
};
export type RemoteDataFailure<E> = {
    type: 'FAILURE';
    error: E;
};
export type RemoteDataSuccess<D = unknown> = {
    type: 'SUCCESS';
    data: D;
};
export type RemoteData<E, D> = RemoteDataNotAsked | RemoteDataLoading | RemoteDataReloading | RemoteDataFailure<E> | RemoteDataSuccess<D>;
export type FoldHandlers<E, D, R> = {
    notAsked: () => R;
    success: (data: D) => R;
    loading?: () => R;
    reloading?: () => R;
    failure?: (error: E) => R;
};
export type FolderHandlersRequired<E, D, R> = Required<Omit<FoldHandlers<E, D, R>, 'reloading'>> & {
    reloading?: () => R;
};
export type FoldHandlersA<RDS, R> = {
    notAsked: () => R;
    success: (data: Extract<RDS, {
        type: 'SUCCESS';
        data: unknown;
    }>['data'][]) => R;
    loading?: () => R;
    reloading?: () => R;
    failure?: (error: Extract<RDS, {
        type: 'FAILURE';
        error: unknown;
    }>['error'][]) => R;
};
export type FolderHandlersARequired<RDS, R> = Required<Omit<FoldHandlersA<RDS, R>, 'reloading'>> & {
    reloading?: () => R;
};
/**
 * Return NOT_ASKED state
 *
 * @category Constructors
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.notAsked();
 */
export declare const notAsked: () => RemoteDataNotAsked;
/**
 * Return LOADING state
 *
 * @category Constructors
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.loading();
 */
export declare const loading: () => RemoteDataLoading;
/**
 * Return RELOADING state
 *
 * @category Constructors
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.reloading();
 */
export declare const reloading: () => RemoteDataReloading;
/**
 * Return SUCCESS state with data
 *
 * @category Constructors
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.success({ userId: 1000 });
 */
export declare const success: <D>(data: D) => RemoteDataSuccess<D>;
/**
 * Return FAILURE state with error
 *
 * @category Constructors
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.failure(new Error('error'));
 */
export declare const failure: <E>(error: E) => RemoteDataFailure<E>;
/**
 * Return true if remoteData is notAsked, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.notAsked();
 *   if (RD.isNotAsked(data)) {
 *     // ...your code
 *   }
 */
export declare function isNotAsked<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;
/**
 * Return true if one of remoteData is notAsked, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data1 = RD.notAsked();
 *   const data2 = RD.loading();
 *
 *   if (RD.isNotAsked([data1, data2])) {
 *     // ...your code
 *   }
 */
export declare function isNotAsked<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(remoteData: R): boolean;
/**
 * Return true if remoteData is loading, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.loading();
 *   if (RD.isLoading(data)) {
 *     // ...your code
 *   }
 */
export declare function isLoading<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;
/**
 * Return true if one of remoteData is loading, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data1 = RD.notAsked();
 *   const data2 = RD.loading();
 *
 *   if (RD.isNotAsked([data1, data2])) {
 *     // ...your code
 *   }
 */
export declare function isLoading<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(remoteData: R): boolean;
/**
 * Return true if remoteData is reloading, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.reloading();
 *   if (RD.isReloading(data)) {
 *     // ...your code
 *   }
 */
export declare function isReloading<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;
/**
 * Return true if one of remoteData is reloading, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data1 = RD.notAsked();
 *   const data2 = RD.reloading();
 *
 *   if (RD.reloading([data1, data2])) {
 *     // ...your code
 *   }
 */
export declare function isReloading<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(remoteData: R): boolean;
/**
 * Return true if remoteData is success, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.success(1);
 *   if (RD.isSuccess(data)) {
 *     console.log(data.data); // typesave
 *   }
 */
export declare function isSuccess<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;
/**
 * Return true if ALL of remoteData is success, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data1 = RD.success(1);
 *   const data2 = RD.success(2);
 *
 *   if (RD.isSuccess([data1, data2])) {
 *     console.log(data1.data, data2.data); // typesave
 *   }
 */
export declare function isSuccess<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(remoteData: R): boolean;
/**
 * Return true if remoteData is failure, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.failure(new Error('some error'));
 *   if (RD.isFailure(data)) {
 *     // ...your code
 *   }
 */
export declare function isFailure<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;
/**
 * Return true if one of remoteData is failure, else false
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   const data1 = RD.failure(new Error('some error'));
 *   const data2 = RD.failure(new Error('some another error'));
 *
 *   if (RD.isFailure([data1, data2])) {
 *     // ...your code
 *   }
 */
export declare function isFailure<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(remoteData: R): boolean;
/**
 * Accept remote data and orElse function and if SUCCESS return data, else all orElse
 *
 * @category Error handling / accessor
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   // example 1
 *   const data = RD.notAsked();
 *   const result = RD.successOrElse(data, () => -1); // -1
 *
 *   // example 2
 *   const data = RD.success(1);
 *   const result = RD.successOrElse(data, () => -1); // 1
 */
export declare function successOrElse<T extends RemoteData<unknown, unknown>, R>(remoteData: T, orElse: () => R): (T extends RemoteDataSuccess<unknown> ? T['data'] : never) | R;
/**
 * Accept array of remote data and orElse function and if ALL SUCCESS return array of
 * data, else all orElse
 *
 * @category Error handling / accessor
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   // example 1
 *   const data1 = RD.notAsked();
 *   const data2 = RD.notAsked();
 *   const result = RD.successOrElse([data1, data2], () => [0, 0]); // [0, 0]
 *
 *   // example 2
 *   const data1 = RD.success(1);
 *   const data2 = RD.success(2);
 *   const [first, second] = RD.successOrElse(data, () => [0, 0]); // [1, 2]
 */
export declare function successOrElse<T extends ArrayTwoOrMore<RemoteData<unknown, unknown>>, R>(remoteData: T, orElse: () => R): (T extends ArrayTwoOrMore<RemoteDataSuccess<unknown>> ? T[number]['data'][] : never) | R;
/**
 * Accept remote data and object with handlers (state as cb)
 *
 * @category Pattern matching
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   // example 1
 *   const data = RD.notAsked();
 *   const result = RD.fold(data, { notAsked: () => 'no data', loading: () => 'loading...', success: (data) => `data: ${data}`);
 */
export declare function fold<E, D, R>(remoteData: RemoteData<E, D>, foldHandlers: FoldHandlers<E, D, R>): ReturnTypesOfFunctionProps<R>;
/**
 * Accept array of remote data and object with handler (state as cb)
 *
 * @category Pattern matching
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *
 *   // example 1
 *   const data1 = RD.notAsked();
 *   const data2 = RD.notAsked();
 *
 *   // return 'no data':
 *   const result = RD.fold([data1, data2], { notAsked: () => 'no data', loading: () => 'loading...', success: (data) => `data: ${data}`);
 *
 *   // example 2
 *   const data1 = RD.success(1);
 *   const data2 = RD.success(2);
 *
 *   // return 3:
 *   const result = RD.fold([data1, data2], { notAsked: () => 'no data', loading: () => 'loading...', success: ([a, b]) => a + b);
 */
export declare function fold<RDS, R>(remoteData: ArrayTwoOrMore<RDS>, foldHandlers: FoldHandlersA<RDS, R>): ReturnTypesOfFunctionProps<R>;
