import * as RD from './index';

const rdNotAsked = RD.notAsked();
const rdLoading = RD.loading();
const rdReloading = RD.reloading();
const rdSuccess = RD.success(1);
const rdFailure = RD.failure(Error('err'));

describe('RemoteData', () => {
  test('notAsked constructor should return notAsked RD', () => {
    expect(RD.notAsked()).toEqual(rdNotAsked);
  });

  test('loading constructor should return loading RD', () => {
    expect(RD.loading()).toEqual(rdLoading);
  });

  test('reloading constructor should return reloading RD', () => {
    expect(RD.reloading()).toEqual(rdReloading);
  });

  test('success constructor should return success RD', () => {
    expect(RD.success(1)).toEqual(rdSuccess);
  });

  test('failure constructor should return failure RD', () => {
    expect(RD.failure(new Error('err'))).toEqual(rdFailure);
  });

  test('isNotAsked should truthy if notAsked state', () => {
    expect(RD.isNotAsked(rdSuccess)).toBeFalsy();
    expect(RD.isNotAsked(rdFailure)).toBeFalsy();
    expect(RD.isNotAsked(rdReloading)).toBeFalsy();
    expect(RD.isNotAsked(rdLoading)).toBeFalsy();
    expect(RD.isNotAsked(rdNotAsked)).toBeTruthy();
  });

  test('isNotAsked should truthy if some remotedata notAsked', () => {
    expect(RD.isNotAsked([rdFailure, rdSuccess])).toBeFalsy();
    expect(RD.isNotAsked([rdReloading, rdFailure])).toBeFalsy();
    expect(RD.isNotAsked([rdLoading, rdLoading])).toBeFalsy();
    expect(RD.isNotAsked([rdNotAsked, rdLoading])).toBeTruthy();
    expect(RD.isNotAsked([rdNotAsked, rdNotAsked])).toBeTruthy();
  });

  test('isLoading should truthy if loading state', () => {
    expect(RD.isLoading(rdNotAsked)).toBeFalsy();
    expect(RD.isLoading(rdSuccess)).toBeFalsy();
    expect(RD.isLoading(rdFailure)).toBeFalsy();
    expect(RD.isLoading(rdReloading)).toBeFalsy();
    expect(RD.isLoading(rdLoading)).toBeTruthy();
  });

  test('isLoading should truthy if some remotedata loading', () => {
    expect(RD.isLoading([rdFailure, rdSuccess])).toBeFalsy();
    expect(RD.isLoading([rdReloading, rdNotAsked])).toBeFalsy();
    expect(RD.isLoading([rdNotAsked, rdLoading])).toBeTruthy();
    expect(RD.isLoading([rdLoading, rdLoading])).toBeTruthy();
  });

  test('isReloading should truthy if loading state', () => {
    expect(RD.isReloading(rdNotAsked)).toBeFalsy();
    expect(RD.isReloading(rdSuccess)).toBeFalsy();
    expect(RD.isReloading(rdFailure)).toBeFalsy();
    expect(RD.isReloading(rdLoading)).toBeFalsy();
    expect(RD.isReloading(rdReloading)).toBeTruthy();
  });

  test('isReloading should truthy if some remotedata loading', () => {
    expect(RD.isReloading([rdNotAsked, rdReloading])).toBeTruthy();
    expect(RD.isReloading([rdFailure, rdLoading])).toBeFalsy();
    expect(RD.isReloading([rdLoading, rdLoading])).toBeFalsy();
    expect(RD.isReloading([rdReloading, rdReloading])).toBeTruthy();
  });

  test('isSuccess should truthy if success', () => {
    expect(RD.isSuccess(rdNotAsked)).toBeFalsy();
    expect(RD.isSuccess(rdLoading)).toBeFalsy();
    expect(RD.isSuccess(rdFailure)).toBeFalsy();
    expect(RD.isSuccess(rdReloading)).toBeFalsy();
    expect(RD.isSuccess(rdSuccess)).toBeTruthy();
  });

  test('isSuccess should truthy if every remotedata success', () => {
    expect(RD.isSuccess([rdLoading, rdNotAsked])).toBeFalsy();
    expect(RD.isSuccess([rdNotAsked, rdSuccess])).toBeFalsy();
    expect(RD.isSuccess([rdFailure, rdSuccess])).toBeFalsy();
    expect(RD.isSuccess([rdSuccess, rdSuccess])).toBeTruthy();
  });

  test('isFailure should truthy if error', () => {
    expect(RD.isFailure(rdNotAsked)).toBeFalsy();
    expect(RD.isFailure(rdLoading)).toBeFalsy();
    expect(RD.isFailure(rdReloading)).toBeFalsy();
    expect(RD.isFailure(rdSuccess)).toBeFalsy();
    expect(RD.isFailure(rdFailure)).toBeTruthy();
  });

  test('isFailure should truthy if some remotedata failure', () => {
    expect(RD.isFailure([rdNotAsked, rdLoading])).toBeFalsy();
    expect(RD.isFailure([rdLoading, rdReloading])).toBeFalsy();
    expect(RD.isFailure([rdSuccess, rdSuccess])).toBeFalsy();
    expect(RD.isFailure([rdFailure, rdLoading])).toBeTruthy();
    expect(RD.isFailure([rdFailure, rdFailure])).toBeTruthy();
  });

  test('should successOrElse apply handlers to one RemoteData', () => {
    expect(RD.successOrElse(rdNotAsked, () => -1)).toBe(-1);
    expect(RD.successOrElse(rdLoading, () => -1)).toBe(-1);
    expect(RD.successOrElse(rdReloading, () => -1)).toBe(-1);
    expect(RD.successOrElse(rdFailure, () => -1)).toBe(-1);
    expect(RD.successOrElse(rdSuccess, () => -1)).toBe(1);
  });

  test('should successOrElse apply handler to array of RemoteData', () => {
    expect(RD.successOrElse([rdNotAsked, rdSuccess], () => -1)).toBe(-1);
    expect(RD.successOrElse([rdReloading, rdReloading], () => -1)).toBe(-1);
    expect(RD.successOrElse([rdSuccess, rdSuccess], () => -1)).toEqual([1, 1]);
    expect(RD.successOrElse([rdNotAsked, rdFailure, rdSuccess], () => -1)).toEqual(-1);
    expect(RD.successOrElse([rdSuccess, rdSuccess, rdSuccess], () => -1)).toEqual([
      1, 1, 1,
    ]);
  });

  test('should fold apply handlers to each state', () => {
    const foldHandlers = {
      notAsked: () => 'no data',
      loading: () => 'loading..',
      reloading: () => 'reloading..',
      failure: (error: Error) => error.message,
      success: (n: number) => String(10 + n),
    };

    expect(RD.fold(rdSuccess, foldHandlers)).toBe('11');
    expect(RD.fold(rdFailure, foldHandlers)).toBe('err');
    expect(RD.fold(rdLoading, foldHandlers)).toBe('loading..');
    expect(RD.fold(rdReloading, foldHandlers)).toBe('reloading..');
    expect(RD.fold(rdNotAsked, foldHandlers)).toBe('no data');
  });

  test('should fold apply handlers to each state if accept array of RemoteData', () => {
    const foldHandlers = {
      notAsked: () => 'no data',
      loading: () => 'loading..',
      reloading: () => 'reloading..',
      failure: (errors: Error[]) => String(errors.map((err) => err.message)),
      success: (nums: number[]) => String(10 + nums.reduce((acc, n) => acc + n, 0)),
    };

    // base
    expect(RD.fold([rdSuccess, rdSuccess], foldHandlers)).toBe('12');
    expect(RD.fold([rdFailure, rdFailure], foldHandlers)).toBe('err,err');
    expect(RD.fold([rdLoading, rdLoading], foldHandlers)).toBe('loading..');
    expect(RD.fold([rdReloading, rdReloading], foldHandlers)).toBe('reloading..');
    expect(RD.fold([rdNotAsked, rdNotAsked], foldHandlers)).toBe('no data');

    // priority

    expect(RD.fold([rdNotAsked, rdLoading], foldHandlers)).toBe('loading..');
    expect(RD.fold([rdSuccess, rdLoading], foldHandlers)).toBe('loading..');

    expect(RD.fold([rdNotAsked, rdFailure], foldHandlers)).toBe('err');
    expect(RD.fold([rdLoading, rdFailure], foldHandlers)).toBe('err');
    expect(RD.fold([rdSuccess, rdFailure], foldHandlers)).toBe('err');

    expect(RD.fold([rdSuccess, rdNotAsked], foldHandlers)).toBe('no data');

    expect(RD.fold([rdNotAsked, rdReloading], foldHandlers)).toBe('reloading..');
  });

  test('should fold apply notAsked if loading/reloading/failure handler not specified', () => {
    const foldHandlers = {
      notAsked: () => 'no data',
      success: (nums: number[]) => String(10 + nums.reduce((acc, n) => acc + n, 0)),
    };

    expect(RD.fold([rdSuccess, rdSuccess], foldHandlers)).toBe('12');

    expect(RD.fold([rdNotAsked, rdSuccess], foldHandlers)).toBe('no data');
    expect(RD.fold([rdFailure, rdFailure], foldHandlers)).toBe('no data');
    expect(RD.fold([rdLoading, rdFailure], foldHandlers)).toBe('no data');
    expect(RD.fold([rdFailure, rdReloading], foldHandlers)).toBe('no data');
  });
});
