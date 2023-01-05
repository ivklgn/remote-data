import React from 'react';
import {
  RemoteDataSuccess,
  RemoteData,
  FoldHandlers,
  FoldHandlersA,
  FolderHandlersRequired,
  FolderHandlersARequired,
  ArrayTwoOrMore,
  successOrElse as _successOrElse,
  fold as _fold,
  foldW as _foldW,
} from '../core/index';

export function successOrElse<
  T extends RemoteData<unknown, unknown>,
  R extends React.ReactNode,
>(
  remoteData: T,
  orElse: () => R,
): (T extends RemoteDataSuccess<unknown> ? T['data'] : never) | R;

export function successOrElse<
  T extends ArrayTwoOrMore<RemoteData<unknown, unknown>>,
  R extends React.ReactNode,
>(
  remoteData: T,
  orElse: () => R,
):
  | (T extends ArrayTwoOrMore<RemoteDataSuccess<unknown>> ? T[number]['data'][] : never)
  | R;

export function successOrElse(remoteData: any, orElse: any) {
  return _successOrElse(remoteData, orElse);
}

export function fold<E, D, R extends React.ReactNode>(
  remoteData: RemoteData<E, D>,
  foldHandlers: FoldHandlers<E, D, R>,
): React.ReactElement;

export function fold<RDS, R extends React.ReactNode>(
  remoteData: ArrayTwoOrMore<RDS>,
  foldHandlers: FoldHandlersA<RDS, R>,
): React.ReactElement;

export function fold(remoteData: any, foldHandlers: any) {
  return _fold(remoteData, foldHandlers);
}

export function foldW<E, D, R extends React.ReactNode>(
  remoteData: RemoteData<E, D>,
  foldHandlers: FolderHandlersRequired<E, D, R>,
): React.ReactElement;

export function foldW<RDS, R extends React.ReactNode>(
  remoteData: ArrayTwoOrMore<RDS>,
  foldHandlers: FolderHandlersARequired<RDS, R>,
): React.ReactElement;

export function foldW(remoteData: any, foldHandlers: any) {
  return _foldW(remoteData, foldHandlers);
}
