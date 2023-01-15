import { RemoteData, RemoteDataSuccess, isNotAsked as _isNotAsked, isLoading as _isLoading, isReloading as _isReloading, isFailure as _isFailure, isSuccess as _isSuccess, FoldHandlers, ReturnTypesOfFunctionProps } from '../core/index';
/**
 * Return function that return NOT_ASKED state
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RDF.notAsked()();
 */
export declare const notAsked: () => () => import("../core/index").RemoteDataNotAsked;
/**
 * Return function that return LOADING state
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RDF.loading()();
 */
export declare const loading: () => () => import("../core/index").RemoteDataLoading;
/**
 * Return function that return RELOADING state
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RDF.reloading()();
 */
export declare const reloading: () => () => import("../core/index").RemoteDataReloading;
/**
 * Return function that return SUCCESS state with data
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RDF.success()({ userId: 1000 });
 */
export declare const success: () => <D>(data: D) => RemoteDataSuccess<D>;
/**
 * Return function that return FAILURE state with error
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.failure()(new Error('error'));
 */
export declare const failure: () => <E>(error: E) => import("../core/index").RemoteDataFailure<E>;
/**
 * Return function that return NOT_ASKED guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   RDF.isNotAsked()(RD.notAsked()); // true
 *   RDF.isNotAsked()(RD.loading()); // false
 *   RDF.isNotAsked()([RD.notAsked(), RD.loading()]); // true
 *   RDF.isNotAsked()([RD.reloading(), RD.loading()]); // false
 */
export declare const isNotAsked: () => typeof _isNotAsked;
/**
 * Return function that return LOADING guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   RDF.isLoading()(RD.loading()); // true
 *   RDF.isLoading()(RD.notAsked()); // false
 *   RDF.isLoading()([RD.notAsked(), RD.loading()]); // true
 *   RDF.isLoading()([RD.notAsked(), RD.reloading()]); // false
 */
export declare const isLoading: () => typeof _isLoading;
/**
 * Return function that return RELOADING guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   RDF.isReloading()(RD.reloading()); // true
 *   RDF.isReloading()(RD.notAsked()); // false
 *   RDF.isReloading()([RD.notAsked(), RD.reloading()]); // true
 *   RDF.isReloading()([RD.loading(), RD.success(1)]); // false
 */
export declare const isReloading: () => typeof _isReloading;
/**
 * Return function that return FAILURE guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   RDF.isFailure()(RD.failure(new Error('err'))); // true
 *   RDF.isFailure()(RD.notAsked()); // false
 *   RDF.isFailure()([RD.failure(new Error('err')), RD.loading()]); // true
 *   RDF.isFailure()([RD.loading(), RD.notAsked()]); // false
 */
export declare const isFailure: () => typeof _isFailure;
/**
 * Return function that return SUCCESS guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   RDF.isSuccess()(RD.success(1)); // true
 *   RDF.isSuccess()(RD.notAsked()); // false
 *   RDF.isSuccess()([RD.success(1), RD.loading()]); // false
 *   RDF.isSuccess()([RD.success(1), RD.success(2)]); // true
 *   RDF.isSuccess()([RD.success(1), RD.success(2), RD.reloading()]); // false
 */
export declare const isSuccess: () => typeof _isSuccess;
/**
 * Accept orElse and return function that accept RemoteData and if SUCCESS return data,
 * else all orElse
 *
 * @category Error handling / accessor
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   // example 1
 *   const data = RD.notAsked();
 *   const result = RDF.successOrElse(() => -1)(data); // -1
 *
 *   // example 2
 *   const data = RD.success(1);
 *   const result = RDF.successOrElse(() => -1)(data); // 1
 */
export declare function successOrElse<R>(orElse: () => R): <T extends RemoteData<unknown, unknown>>(remoteData: T) => (T extends RemoteDataSuccess<unknown> ? T['data'] : never) | R;
/**
 * Accept object with handlers and return function that accept RemoteData
 *
 * @category Pattern matching
 * @example
 *   import { RD } from '@young-aviator-club/remote-data';
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   // example 1
 *   const data = RD.notAsked();
 *   const result = RDF.fold({ notAsked: () => 'no data', loading: () => 'loading...', success: (data) => `data: ${data}`)(data);
 */
export declare function fold<E, D, R>(foldHandlers: FoldHandlers<E, D, R>): (remoteData: RemoteData<E, D>) => ReturnTypesOfFunctionProps<R>;
