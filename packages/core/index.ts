export type ArrayTwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

export type ReturnTypesOfFunctionProps<T> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never;
}[keyof T];

export type RemoteDataNotAsked = { type: 'NOT_ASKED' };
export type RemoteDataLoading = { type: 'LOADING' };
export type RemoteDataFailure<E> = { type: 'FAILURE'; error: E };
export type RemoteDataSuccess<D = unknown> = { type: 'SUCCESS'; data: D };
export type RemoteData<E, D> =
  | RemoteDataNotAsked
  | RemoteDataLoading
  | RemoteDataFailure<E>
  | RemoteDataSuccess<D>;

export type FoldHandlers<E, D, R> = {
  notAsked: () => R;
  success: (data: D) => R;
  loading?: () => R;
  failure?: (error: E) => R;
};

export type FoldHandlersA<RDS, R> = {
  notAsked: () => R;
  success: (data: Extract<RDS, { type: 'SUCCESS'; data: unknown }>['data'][]) => R;
  loading?: () => R;
  failure?: (error: Extract<RDS, { type: 'FAILURE'; error: unknown }>['error'][]) => R;
};

export const notAsked = (): RemoteDataNotAsked => ({ type: 'NOT_ASKED' });

export const loading = (): RemoteDataLoading => ({ type: 'LOADING' });

export const success = <D>(data: D): RemoteDataSuccess<D> => ({
  type: 'SUCCESS',
  data,
});

export const failure = <E>(error: E): RemoteDataFailure<E> => ({
  type: 'FAILURE',
  error,
});

export function isLoading<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;

export function isLoading<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
  remoteData: R,
): boolean;

export function isLoading(remoteData: any): remoteData is RemoteDataLoading {
  return Array.isArray(remoteData)
    ? remoteData.some((rd) => rd.type === 'LOADING')
    : remoteData.type === 'LOADING';
}

export function isSuccess<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;

export function isSuccess<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
  remoteData: R,
): boolean;

export function isSuccess(remoteData: any): remoteData is RemoteDataSuccess<unknown> {
  return Array.isArray(remoteData)
    ? remoteData.every((rd) => rd.type === 'SUCCESS')
    : remoteData.type === 'SUCCESS';
}

export function isFailure<R extends RemoteData<unknown, unknown>>(remoteData: R): boolean;

export function isFailure<R extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
  remoteData: R,
): boolean;

export function isFailure(remoteData: any): remoteData is RemoteDataFailure<unknown> {
  return Array.isArray(remoteData)
    ? remoteData.some((rd) => rd.type === 'FAILURE')
    : remoteData.type === 'FAILURE';
}

export function successOrElse<T extends RemoteData<unknown, unknown>, R>(
  remoteData: T,
  orElse: () => R,
): (T extends RemoteDataSuccess<unknown> ? T['data'] : never) | R;

export function successOrElse<T extends ArrayTwoOrMore<RemoteData<unknown, unknown>>, R>(
  remoteData: T,
  orElse: () => R,
):
  | (T extends ArrayTwoOrMore<RemoteDataSuccess<unknown>> ? T[number]['data'][] : never)
  | R;

export function successOrElse(remoteData: any, orElse: any) {
  if (Array.isArray(remoteData)) {
    return isSuccess(remoteData as ArrayTwoOrMore<RemoteData<unknown, unknown>>)
      ? remoteData.map((rd) => rd.data)
      : orElse(remoteData);
  }

  if (isSuccess(remoteData)) {
    return remoteData.data;
  }

  return orElse(remoteData);
}

export function fold<E, D, R>(
  remoteData: RemoteData<E, D>,
  foldHandlers: FoldHandlers<E, D, R>,
): ReturnTypesOfFunctionProps<R>;

export function fold<RDS, R>(
  remoteData: ArrayTwoOrMore<RDS>,
  foldHandlers: FoldHandlersA<RDS, R>,
): ReturnTypesOfFunctionProps<R>;

export function fold(remoteData: any, { notAsked, loading, failure, success }: any) {
  if (Array.isArray(remoteData)) {
    const successRds = remoteData.filter((rd) => isSuccess(rd));

    const failedRds = remoteData.filter((rd) => isFailure(rd));

    const loadingRds = remoteData.filter((rd) => isLoading(rd));

    if (failedRds.length > 0 && failure) {
      return failure(failedRds.map((rd) => rd.error));
    }

    if (loadingRds.length > 0 && loading) {
      return loading();
    }

    if (remoteData.length === successRds.length) {
      return success(successRds.map((rd) => rd.data));
    }

    return notAsked();
  }

  if (remoteData.type === 'LOADING' && loading) {
    return loading();
  }

  if (remoteData.type === 'FAILURE' && failure) {
    return failure(remoteData.error);
  }

  if (remoteData.type === 'SUCCESS') {
    return success(remoteData.data);
  }

  return notAsked();
}
