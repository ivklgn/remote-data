"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fold = exports.successOrElse = exports.isFailure = exports.isSuccess = exports.isLoading = exports.failure = exports.success = exports.loading = exports.notAsked = void 0;
var notAsked = function () { return ({ type: 'NOT_ASKED' }); };
exports.notAsked = notAsked;
var loading = function () { return ({ type: 'LOADING' }); };
exports.loading = loading;
var success = function (data) { return ({
    type: 'SUCCESS',
    data: data,
}); };
exports.success = success;
var failure = function (error) { return ({
    type: 'FAILURE',
    error: error,
}); };
exports.failure = failure;
function isLoading(remoteData) {
    return Array.isArray(remoteData)
        ? remoteData.some(function (rd) { return rd.type === 'LOADING'; })
        : remoteData.type === 'LOADING';
}
exports.isLoading = isLoading;
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
    var notAsked = _a.notAsked, loading = _a.loading, failure = _a.failure, success = _a.success;
    if (Array.isArray(remoteData)) {
        var successRds = remoteData.filter(function (rd) { return isSuccess(rd); });
        var failedRds = remoteData.filter(function (rd) { return isFailure(rd); });
        var loadingRds = remoteData.filter(function (rd) { return isLoading(rd); });
        if (failedRds.length > 0 && failure) {
            return failure(failedRds.map(function (rd) { return rd.error; }));
        }
        if (loadingRds.length > 0 && loading) {
            return loading();
        }
        if (remoteData.length === successRds.length) {
            return success(successRds.map(function (rd) { return rd.data; }));
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
exports.fold = fold;
//# sourceMappingURL=index.js.map