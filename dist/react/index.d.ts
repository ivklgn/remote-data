import React from 'react';
import { RemoteData, FoldHandlers, FoldHandlersA, ArrayTwoOrMore } from '../core/index';
export declare function fold<E, D, R extends React.ReactNode>(remoteData: RemoteData<E, D>, foldHandlers: FoldHandlers<E, D, R>): React.ReactElement;
/**
 * Accept array of remote data and object with handler (state as cb)
 *
 * @category Pattern matching
 */
export declare function fold<RDS, R extends React.ReactNode>(remoteData: ArrayTwoOrMore<RDS>, foldHandlers: FoldHandlersA<RDS, R>): React.ReactElement;
