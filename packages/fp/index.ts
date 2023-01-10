import {
  ArrayTwoOrMore,
  RemoteData,
  RemoteDataSuccess,
  notAsked as _notAsked,
  loading as _loading,
  reloading as _reloading,
  failure as _failure,
  success as _success,
  isNotAsked as _isNotAsked,
  isLoading as _isLoading,
  isReloading as _isReloading,
  isFailure as _isFailure,
  isSuccess as _isSuccess,
  successOrElse as _successOrElse,
  fold as _fold,
  FoldHandlers,
  ReturnTypesOfFunctionProps,
} from '../core/index';

/**
 * Return function that return NOT_ASKED state
 *
 * @category Constructors
 * @example
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   const data = RDF.notAsked()();
 */
export const notAsked = () => _notAsked;

/**
 * Return function that return LOADING state
 *
 * @category Constructors
 * @example
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   const data = RDF.loading()();
 */
export const loading = () => _loading;

/**
 * Return function that return RELOADING state
 *
 * @category Constructors
 * @example
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   const data = RDF.reloading()();
 */
export const reloading = () => _reloading;

/**
 * Return function that return SUCCESS state with data
 *
 * @category Constructors
 * @example
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   const data = RDF.success()({ userId: 1000 });
 */
export const success = () => _success;

/**
 * Return function that return FAILURE state with error
 *
 * @category Constructors
 * @example
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   const data = RD.failure()(new Error('error'));
 */
export const failure = () => _failure;

/**
 * Return function that return NOT_ASKED guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   RDF.isNotAsked()(RD.notAsked()); // true
 *   RDF.isNotAsked()(RD.loading()); // false
 *   RDF.isNotAsked()([RD.notAsked(), RD.loading()]); // true
 *   RDF.isNotAsked()([RD.reloading(), RD.loading()]); // false
 */
export const isNotAsked = () => _isNotAsked;

/**
 * Return function that return LOADING guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   RDF.isLoading()(RD.loading()); // true
 *   RDF.isLoading()(RD.notAsked()); // false
 *   RDF.isLoading()([RD.notAsked(), RD.loading()]); // true
 *   RDF.isLoading()([RD.notAsked(), RD.reloading()]); // false
 */
export const isLoading = () => _isLoading;

/**
 * Return function that return RELOADING guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   RDF.isReloading()(RD.reloading()); // true
 *   RDF.isReloading()(RD.notAsked()); // false
 *   RDF.isReloading()([RD.notAsked(), RD.reloading()]); // true
 *   RDF.isReloading()([RD.loading(), RD.success(1)]); // false
 */
export const isReloading = () => _isReloading;

/**
 * Return function that return FAILURE guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   RDF.isFailure()(RD.failure(new Error('err'))); // true
 *   RDF.isFailure()(RD.notAsked()); // false
 *   RDF.isFailure()([RD.failure(new Error('err')), RD.loading()]); // true
 *   RDF.isFailure()([RD.loading(), RD.notAsked()]); // false
 */
export const isFailure = () => _isFailure;

/**
 * Return function that return SUCCESS guard for one(or)array RemoteData
 *
 * @category Guards
 * @example
 *   import * RD from '@yac/remote-data';
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   RDF.isSuccess()(RD.success(1)); // true
 *   RDF.isSuccess()(RD.notAsked()); // false
 *   RDF.isSuccess()([RD.success(1), RD.loading()]); // false
 *   RDF.isSuccess()([RD.success(1), RD.success(2)]); // true
 *   RDF.isSuccess()([RD.success(1), RD.success(2), RD.reloading()]); // false
 */
export const isSuccess = () => _isSuccess;

/**
 * Accept orElse and return function that accept RemoteData and if SUCCESS return data,
 * else all orElse
 *
 * @category Error handling / accessor
 * @example
 *   import * RD from '@yac/remote-data';
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   // example 1
 *   const data = RD.notAsked();
 *   const result = RDF.successOrElse(() => -1)(data); // -1
 *
 *   // example 2
 *   const data = RD.success(1);
 *   const result = RDF.successOrElse(() => -1)(data); // 1
 */
export function successOrElse<R>(
  orElse: () => R,
): <T extends RemoteData<unknown, unknown>>(
  remoteData: T,
) => (T extends RemoteDataSuccess<unknown> ? T['data'] : never) | R;

// TODO:
// export function successOrElse<R>(
//   orElse: () => R,
// ): <T extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
//   remoteData: T,
// ) =>
//   | (T extends ArrayTwoOrMore<RemoteDataSuccess<unknown>> ? T[number]['data'][] : never)
//   | R;

export function successOrElse(orElse: any) {
  return (remoteData: any) => _successOrElse(remoteData, orElse);
}

/**
 * Accept object with handlers and return function that accept RemoteData
 *
 * @category Pattern matching
 * @example
 *   import * RD from '@yac/remote-data';
 *   import * RDF from '@yac/remote-data/fp';
 *
 *   // example 1
 *   const data = RD.notAsked();
 *   const result = RDF.fold({ notAsked: () => 'no data', loading: () => 'loading...', success: (data) => `data: ${data}`)(data);
 */
export function fold<E, D, R>(
  foldHandlers: FoldHandlers<E, D, R>,
): (remoteData: RemoteData<E, D>) => ReturnTypesOfFunctionProps<R>;

// TODO:
// export function fold<RDS, R>(
//   foldHandlers: FoldHandlersA<RDS, R>,
// ): (remoteData: ArrayTwoOrMore<RDS>) => ReturnTypesOfFunctionProps<R>;

export function fold(foldHandlers: any) {
  return (remoteData: any) => _fold(remoteData, foldHandlers);
}
