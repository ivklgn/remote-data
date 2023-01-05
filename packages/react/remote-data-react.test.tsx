import React from 'react';
import { cleanup, render } from '@testing-library/react';
import * as RD from '../core/index';
import * as RDR from './index';

afterEach(cleanup);

describe('RemoteData React (RDR)', () => {
  test('pattern matching with fold', () => {
    const MyComponent = ({ data }: { data: RD.RemoteData<Error, number> }) => (
      <React.Fragment>
        {RDR.successOrElse(data, () => (
          <div>error</div>
        ))}
      </React.Fragment>
    );

    const { getByText, rerender } = render(<MyComponent data={RD.notAsked()} />);
    expect(getByText('error')).toBeDefined();

    rerender(<MyComponent data={RD.loading()} />);
    expect(getByText('error')).toBeDefined();

    rerender(<MyComponent data={RD.success(1)} />);
    expect(getByText('1')).toBeDefined();
  });

  test('pattern matching with fold', () => {
    const MyComponent = ({ data }: { data: RD.RemoteData<Error, number> }) =>
      RDR.fold(data, {
        notAsked: () => <div>no-data</div>,
        loading: () => <div>loading..</div>,
        success: (n) => <div>Count: {n}</div>,
      });

    const { getByText, rerender } = render(<MyComponent data={RD.notAsked()} />);
    expect(getByText('no-data')).toBeDefined();

    rerender(<MyComponent data={RD.loading()} />);
    expect(getByText('loading..')).toBeDefined();

    rerender(<MyComponent data={RD.success(1)} />);
    expect(getByText('Count: 1')).toBeDefined();
  });

  test('pattern matching with foldW', () => {
    const MyComponent = ({ data }: { data: RD.RemoteData<Error, number> }) =>
      RDR.foldW(data, {
        notAsked: () => <div>no-data</div>,
        loading: () => <div>loading..</div>,
        reloading: () => <div>reloading..</div>,
        success: (n) => <div>Count: {n}</div>,
        failure: (e) => <div>App Error: {e.message}</div>,
      });

    const { getByText, rerender } = render(<MyComponent data={RD.notAsked()} />);
    expect(getByText('no-data')).toBeDefined();

    rerender(<MyComponent data={RD.loading()} />);
    expect(getByText('loading..')).toBeDefined();

    rerender(<MyComponent data={RD.reloading()} />);
    expect(getByText('reloading..')).toBeDefined();

    rerender(<MyComponent data={RD.success(1)} />);
    expect(getByText('Count: 1')).toBeDefined();

    rerender(<MyComponent data={RD.failure(new Error('Something went wrong'))} />);
    expect(getByText('App Error: Something went wrong')).toBeDefined();
  });
});
