import React from 'react';
import {
  RemoteData,
  FoldHandlers,
  FoldHandlersA,
  ArrayTwoOrMore,
  fold as _fold,
} from '../core/index';

/*
 * Accept remote data and object with handlers (state as cb)
 *
 * @category Pattern matching
 */
export function fold<E, D, R extends React.ReactNode>(
  remoteData: RemoteData<E, D>,
  foldHandlers: FoldHandlers<E, D, R>,
): React.ReactElement;

/**
 * Accept array of remote data and object with handler (state as cb)
 *
 * @category Pattern matching
 */
export function fold<RDS, R extends React.ReactNode>(
  remoteData: ArrayTwoOrMore<RDS>,
  foldHandlers: FoldHandlersA<RDS, R>,
): React.ReactElement;

export function fold(remoteData: any, foldHandlers: any) {
  return _fold(remoteData, foldHandlers);
}
