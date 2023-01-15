"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fold = exports.successOrElse = exports.isFailure = exports.isSuccess = exports.isReloading = exports.isLoading = exports.isNotAsked = exports.failure = exports.success = exports.reloading = exports.loading = exports.notAsked = void 0;
/**
 * Return NOT_ASKED state
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.notAsked();
 */
var notAsked = function () { return ({ type: 'NOT_ASKED' }); };
exports.notAsked = notAsked;
/**
 * Return LOADING state
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.loading();
 */
var loading = function () { return ({ type: 'LOADING' }); };
exports.loading = loading;
/**
 * Return RELOADING state
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.reloading();
 */
var reloading = function () { return ({ type: 'RELOADING' }); };
exports.reloading = reloading;
/**
 * Return SUCCESS state with data
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.success({ userId: 1000 });
 */
var success = function (data) { return ({
    type: 'SUCCESS',
    data: data,
}); };
exports.success = success;
/**
 * Return FAILURE state with error
 *
 * @category Constructors
 * @example
 *   import * RD from '@yac/remote-data';
 *
 *   const data = RD.failure(new Error('error'));
 */
var failure = function (error) { return ({
    type: 'FAILURE',
    error: error,
}); };
exports.failure = failure;
function isNotAsked(remoteData) {
    return Array.isArray(remoteData)
        ? remoteData.some(function (rd) { return rd.type === 'NOT_ASKED'; })
        : remoteData.type === 'NOT_ASKED';
}
exports.isNotAsked = isNotAsked;
function isLoading(remoteData) {
    return Array.isArray(remoteData)
        ? remoteData.some(function (rd) { return rd.type === 'LOADING'; })
        : remoteData.type === 'LOADING';
}
exports.isLoading = isLoading;
function isReloading(remoteData) {
    return Array.isArray(remoteData)
        ? remoteData.some(function (rd) { return rd.type === 'RELOADING'; })
        : remoteData.type === 'RELOADING';
}
exports.isReloading = isReloading;
function isSuccess(remoteData) {
    return Array.isArray(remoteData)
        ? remoteData.every(function (rd) { return rd.type === 'SUCCESS'; })
        : remoteData.type === 'SUCCESS';
}
exports.isSuccess = isSuccess;
function isFailure(remoteData) {
    return Array.isArray(remoteData)
        ? remoteData.some(function (rd) { return rd.type === 'FAILURE'; })
        : remoteData.type === 'FAILURE';
}
exports.isFailure = isFailure;
function successOrElse(remoteData, orElse) {
    if (Array.isArray(remoteData)) {
        return isSuccess(remoteData)
            ? remoteData.map(function (rd) { return rd.data; })
            : orElse(remoteData);
    }
    if (isSuccess(remoteData)) {
        return remoteData.data;
    }
    return orElse(remoteData);
}
exports.successOrElse = successOrElse;
function fold(remoteData, _a) {
    var notAsked = _a.notAsked, loading = _a.loading, failure = _a.failure, success = _a.success, reloading = _a.reloading;
    if (Array.isArray(remoteData)) {
        if (failure) {
            var failedRds = remoteData.filter(function (rd) { return isFailure(rd); });
            if (failedRds.length > 0) {
                return failure(failedRds.map(function (rd) { return rd.error; }));
            }
        }
        if (loading) {
            var loadingRds = remoteData.filter(function (rd) { return isLoading(rd); });
            if (loadingRds.length > 0) {
                return loading();
            }
        }
        if (reloading) {
            var reloadingRds = remoteData.filter(function (rd) { return isReloading(rd); });
            if (reloadingRds.length > 0) {
                return reloading();
            }
        }
        var successRds = remoteData.filter(function (rd) { return isSuccess(rd); });
        if (remoteData.length === successRds.length) {
            return success(successRds.map(function (rd) { return rd.data; }));
        }
        return notAsked();
    }
    if (remoteData.type === 'LOADING' && loading) {
        return loading();
    }
    if (remoteData.type === 'RELOADING' && reloading) {
        return reloading();
    }
    if (remoteData.type === 'FAILURE' && failure) {
        return failure(remoteData.error);
    }
    if (remoteData.type === 'SUCCESS') {
        return success(remoteData.data);
    }
    return notAsked();
}
exports.fold = fold;
//# sourceMappingURL=index.js.map