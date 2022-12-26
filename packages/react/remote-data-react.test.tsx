import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import * as RD from '../core/index';
import * as RDR from './index';

afterEach(cleanup);

const MyComponent = ({ data }: { data: RD.RemoteData<Error, number> }) =>
  RDR.fold(data, {
    notAsked: () => <div>no-data</div>,
    loading: () => <div>loading..</div>,
    success: (n) => <div>Count: {n}</div>,
    failure: (e) => <div>App Error: {e.message}</div>,
  });

describe('RemoteData react', () => {
  test('...', () => {
    const { getByText, rerender } = render(<MyComponent data={RD.notAsked()} />);
    expect(getByText('no-data')).toBeDefined();

    rerender(<MyComponent data={RD.loading()} />);
    expect(getByText('loading..')).toBeDefined();

    rerender(<MyComponent data={RD.success(1)} />);
    expect(getByText('Count: 1')).toBeDefined();

    rerender(<MyComponent data={RD.failure(new Error('Something went wrong'))} />);
    expect(getByText('App Error: Something went wrong')).toBeDefined();
  });
});
