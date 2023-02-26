"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fold = exports.successOrElse = exports.isSuccess = exports.isFailure = exports.isReloading = exports.isLoading = exports.isNotAsked = exports.failure = exports.success = exports.reloading = exports.loading = exports.notAsked = void 0;
var index_1 = require("../index");
/**
 * Return function that return NOT_ASKED state
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RDF.notAsked()();
 */
var notAsked = function () { return index_1.notAsked; };
exports.notAsked = notAsked;
/**
 * Return function that return LOADING state
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RDF.loading()();
 */
var loading = function () { return index_1.loading; };
exports.loading = loading;
/**
 * Return function that return RELOADING state
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RDF.reloading()();
 */
var reloading = function () { return index_1.reloading; };
exports.reloading = reloading;
/**
 * Return function that return SUCCESS state with data
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RDF.success()({ userId: 1000 });
 */
var success = function () { return index_1.success; };
exports.success = success;
/**
 * Return function that return FAILURE state with error
 *
 * @category Constructors
 * @example
 *   import { RDF } from '@young-aviator-club/remote-data';
 *
 *   const data = RD.failure()(new Error('error'));
 */
var failure = function () { return index_1.failure; };
exports.failure = failure;
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
var isNotAsked = function () { return index_1.isNotAsked; };
exports.isNotAsked = isNotAsked;
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
var isLoading = function () { return index_1.isLoading; };
exports.isLoading = isLoading;
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
var isReloading = function () { return index_1.isReloading; };
exports.isReloading = isReloading;
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
var isFailure = function () { return index_1.isFailure; };
exports.isFailure = isFailure;
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
var isSuccess = function () { return index_1.isSuccess; };
exports.isSuccess = isSuccess;
// TODO:
// export function successOrElse<R>(
//   orElse: () => R,
// ): <T extends ArrayTwoOrMore<RemoteData<unknown, unknown>>>(
//   remoteData: T,
// ) =>
//   | (T extends ArrayTwoOrMore<RemoteDataSuccess<unknown>> ? T[number]['data'][] : never)
//   | R;
function successOrElse(orElse) {
    return function (remoteData) { return (0, index_1.successOrElse)(remoteData, orElse); };
}
exports.successOrElse = successOrElse;
// TODO:
// export function fold<RDS, R>(
//   foldHandlers: FoldHandlersA<RDS, R>,
// ): (remoteData: ArrayTwoOrMore<RDS>) => ReturnTypesOfFunctionProps<R>;
function fold(foldHandlers) {
    return function (remoteData) { return (0, index_1.fold)(remoteData, foldHandlers); };
}
exports.fold = fold;
