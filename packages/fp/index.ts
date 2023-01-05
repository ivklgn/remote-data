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
  foldW as _foldW,
  FoldHandlers,
  ReturnTypesOfFunctionProps,
  FolderHandlersRequired,
} from '../core/index';

export const notAsked = () => _notAsked;

export const loading = () => _loading;

export const reloading = () => _reloading;

export const failure = () => _failure;

export const success = () => _success;

export const isNotAsked = () => _isNotAsked;

export const isLoading = () => _isLoading;

export const isReloading = () => _isReloading;

export const isFailure = () => _isFailure;

export const isSuccess = () => _isSuccess;

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

export function foldW<E, D, R>(
  foldHandlers: FolderHandlersRequired<E, D, R>,
): (remoteData: RemoteData<E, D>) => ReturnTypesOfFunctionProps<R>;

// TODO:
// export function foldW<RDS, R>(
//   foldHandlers: FolderHandlersRequired<RDS, R>,
// ): (remoteData: ArrayTwoOrMore<RDS>) => ReturnTypesOfFunctionProps<R>;

export function foldW(foldHandlers: any) {
  return (remoteData: any) => _foldW(remoteData, foldHandlers);
}
