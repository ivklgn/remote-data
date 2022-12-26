import React from 'react';
import { RemoteData, FoldHandlers, FoldHandlersA, ArrayTwoOrMore } from '../core/index';
export declare function fold<E, D, R extends React.ReactNode>(remoteData: RemoteData<E, D>, foldHandlers: FoldHandlers<E, D, R>): React.ReactElement;
export declare function fold<RDS, R extends React.ReactNode>(remoteData: ArrayTwoOrMore<RDS>, foldHandlers: FoldHandlersA<RDS, R>): React.ReactElement;
