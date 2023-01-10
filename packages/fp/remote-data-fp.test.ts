import * as RD from '../core/index';
import * as RDF from './index';

const rdNotAsked = RD.notAsked();
const rdLoading = RD.loading();
const rdReloading = RD.reloading();
const rdSuccess = RD.success(1);
const rdFailure = RD.failure(Error('err'));

describe('RemoteData FP', () => {
  test('constructors is curried', () => {
    expect(typeof RDF.notAsked()).toBe('function');
    expect(RDF.notAsked()()).toEqual(rdNotAsked);

    expect(typeof RDF.loading()).toBe('function');
    expect(RDF.loading()()).toEqual(rdLoading);

    expect(typeof RDF.reloading()).toBe('function');
    expect(RDF.reloading()()).toEqual(rdReloading);

    expect(typeof RDF.success()).toBe('function');
    expect(RDF.success()(1)).toEqual(rdSuccess);

    expect(typeof RDF.failure()).toBe('function');
    expect(RDF.failure()(Error('err'))).toEqual(rdFailure);
  });

  test('guards is curried', () => {
    expect(typeof RDF.isNotAsked()).toBe('function');
    expect(RDF.isNotAsked()(rdNotAsked)).toBeTruthy();

    expect(typeof RDF.isLoading()).toBe('function');
    expect(RDF.isLoading()(rdLoading)).toBeTruthy();

    expect(typeof RDF.isReloading()).toBe('function');
    expect(RDF.isReloading()(rdReloading)).toBeTruthy();

    expect(typeof RDF.isFailure()).toBe('function');
    expect(RDF.isFailure()(rdFailure)).toBeTruthy();

    expect(typeof RDF.isSuccess()).toBe('function');
    expect(RDF.isSuccess()(rdSuccess)).toBeTruthy();
  });

  test('successOrElse is curried and accept orElse in first function', () => {
    expect(typeof RDF.successOrElse(() => -1)).toBe('function');
    expect(RDF.successOrElse(() => -1)(rdNotAsked)).toBe(-1);
    expect(RDF.successOrElse(() => -1)(rdFailure)).toBe(-1);
    expect(RDF.successOrElse(() => -1)(rdSuccess)).toBe(1);
  });

  test('fold is curried and accept foldHandlers in first function', () => {
    const foldHandlers = {
      notAsked: () => 'no data',
      loading: () => 'loading..',
      reloading: () => 'reloading..',
      failure: (error: Error) => error.message,
      success: (n: number) => String(10 + n),
    };

    expect(typeof RDF.fold(foldHandlers)).toBe('function');
    expect(RDF.fold(foldHandlers)(rdNotAsked)).toBe('no data');
    expect(RDF.fold(foldHandlers)(rdLoading)).toBe('loading..');
    expect(RDF.fold(foldHandlers)(rdReloading)).toBe('reloading..');
    expect(RDF.fold(foldHandlers)(rdFailure)).toBe('err');
    expect(RDF.fold(foldHandlers)(rdSuccess)).toBe('11');
  });
});
