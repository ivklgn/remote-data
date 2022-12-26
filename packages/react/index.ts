import React from 'react';
import {
  RemoteData,
  FoldHandlers,
  FoldHandlersA,
  ArrayTwoOrMore,
  fold as _fold,
} from '../core/index';

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
