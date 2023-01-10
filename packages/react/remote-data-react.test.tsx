import React from 'react';
import { cleanup, render } from '@testing-library/react';
import * as RD from '../core/index';
import * as RDR from './index';

afterEach(cleanup);

describe('RemoteData React (RDR)', () => {
  test('pattern matching with fold', () => {
    const MyComponent = ({ data }: { data: RD.RemoteData<Error, number> }) =>
      RDR.fold(data, {
        notAsked: () => <div>no-data</div>,
        loading: () => <div>loading..</div>,
        reloading: () => <div>reloading..</div>,
        failure: (err) => <div>{err.message}</div>,
        success: (n) => <div>Count: {n}</div>,
      });

    const { getByText, rerender } = render(<MyComponent data={RD.notAsked()} />);
    expect(getByText('no-data')).toBeDefined();

    rerender(<MyComponent data={RD.loading()} />);
    expect(getByText('loading..')).toBeDefined();

    rerender(<MyComponent data={RD.reloading()} />);
    expect(getByText('reloading..')).toBeDefined();

    rerender(<MyComponent data={RD.failure(new Error('fatal error!'))} />);
    expect(getByText('fatal error!')).toBeDefined();

    rerender(<MyComponent data={RD.success(1)} />);
    expect(getByText('Count: 1')).toBeDefined();
  });

  test('pattern matching with fold and array of RemoteData', () => {
    const MyComponent = ({
      data1,
      data2,
    }: {
      data1: RD.RemoteData<Error, number>;
      data2: RD.RemoteData<Error, number>;
    }) =>
      RDR.fold([data1, data2], {
        notAsked: () => <div>no-data</div>,
        failure: (errs) => <div>{errs.map((err) => err.message).toString()}</div>,
        success: (nums) => <div>{nums.reduce((acc, n) => acc + n, 0)}</div>,
      });

    const { getByText, rerender } = render(
      <MyComponent data1={RD.notAsked()} data2={RD.notAsked()} />,
    );
    expect(getByText('no-data')).toBeDefined();

    rerender(
      <MyComponent
        data1={RD.failure(new Error('err1'))}
        data2={RD.failure(new Error('err2'))}
      />,
    );
    expect(getByText('err1,err2')).toBeDefined();

    rerender(<MyComponent data1={RD.success(1)} data2={RD.success(2)} />);
    expect(getByText('3')).toBeDefined();
  });
});
