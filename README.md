# RemoteData

Typesafe library for representation loadable state.

_In web development from project to project, we constantly encounter asynchronous data. The implementation of the loadable falls on the shoulders of the developer and is sometimes redundant: we come up with additional state fields and duplicate the code. RemoteData helps to describe a type-safe data source with the necessary states and provides the minimum required set of functions for processing_

```ts
type RemoteData<E, D> = NotAsked | Loading | Reloading | Success<D> | Failure<E>;
```

## Installation

```
npm i @young-aviator-club/remote-data
```

### Examples

| Example                          | Link                                                                                         |
| -------------------------------- | -------------------------------------------------------------------------------------------- |
| **JS + React**                   | [Codesandbox](https://codesandbox.io/s/young-aviator-club-remote-data-react-usestate-72sie5) |
| **TS + React**                   | [Codesandbox](https://codesandbox.io/s/young-aviator-club-remote-data-react-ts-0tki2w)       |
| **TS + React + Mobx**            | [Codesandbox](https://codesandbox.io/s/young-aviator-club-remote-data-react-ts-mobx-kwhp57)  |
| **TS + React + Mobx (extended)** | [Codesandbox](https://codesandbox.io/s/young-aviator-club-remote-data-react-ts-mobx-kwhp57)  |

More examples coming soon!

### Basic usage

```ts
import * as RD from '@young-aviator-club/remote-data';

let loadableResource: RD.RemoteData<Error, number> = RD.notAsked();

const loadResource = () => {
  console.log((loadableResource = RD.loading()));
  setTimeout(() => {
    console.log((loadableResource = RD.success(10)));
  }, 2000);
};

console.log(loadableResource);
```

## API

**Guards**

- RD.isNotAsked(rd)
- RD.isLoading(rd)
- RD.isReloading(rd)
- RD.isSuccess(rd)
- RD.isFailure(rd)

```ts
import * as RD from '@young-aviator-club/remote-data';

let loadableResource: RemoteData<Error, number> = RD.notAsked(); // or another

if (RD.isNotAsked(loadableResource)) {
  console.log('No state is NOT_ASKED');
}

loadableResource = RD.loading();

if (RD.isLoading(loadableResource)) {
  console.log('No state is LOADING');
}

loadableResource = RD.failure(new Error('error'));

if (RD.isFailure(loadableResource)) {
  // typesafe access to error
  console.log('Failure!', loadableResource.error.message); // "error"
}

loadableResource = RD.success(100);

if (RD.isSuccess(loadableResource)) {
  // typesafe access to data
  console.log('Success', loadableResource.data); // 100
}
```

Working with array of RemoteData

```ts
import * as RD from '@young-aviator-club/remote-data';

let loadableResource1: RemoteData<Error, number> = RD.notAsked();
let loadableResource2: RemoteData<Error, number> = RD.notAsked();

if (RD.isNotAsked([loadableResource1, loadableResource2])) {
  console.log('Now states is NOT_ASKED');
}

loadableResource1 = RD.loading(); // only one resouce in loading state

if (RD.isLoading([loadableResource1, loadableResource2])) {
  // loadableResource1 = LOADING, loadableResource2 = NOT_ASKED
  // in this case array of RemoteData is LOADING
  console.log('Now states is LOADING');
}

loadableResource2 = RD.failure(new Error('error'));

if (RD.isFailure([loadableResource1, loadableResource2])) {
  // if some resource is failed - array of RemoteData is failed
  console.log('Failure!');
}

loadableResource1 = RD.success(1);
loadableResource2 = RD.success(2);

if (RD.isSuccess([loadableResource1, loadableResource2])) {
  // if each RemoteData in array is SUCCESS - true
  console.log('Success', loadableResource1.data + loadableResource2.data); // 3
}
```

**Error handling / accessor**

- RD.successOrElse(rd, orElse)

```ts
import * as RD from '@young-aviator-club/remote-data';

let loadableResource: RemoteData<Error, number> = RD.notAsked(); // or another

console.log(RD.successOrElse(loadableResource, () => -1)); // -1

loadableResource = RD.success(100);

console.log(RD.successOrElse(loadableResource, () => -1)); // 100

// for array of RemoteData

let loadableResource1: RemoteData<Error, number> = RD.notAsked();
let loadableResource2: RemoteData<Error, number> = RD.notAsked();

console.log(RD.successOrElse([loadableResource1, loadableResource2], () => -1)); // -1

loadableResource1 = RD.success(1);

// -1 because second RemoteData is NOT_ASKED
console.log(RD.successOrElse([loadableResource1, loadableResource2], () => -1)); // -1

loadableResource2 = RD.success(2);

console.log(RD.successOrElse([loadableResource1, loadableResource2], () => -1)); // [1, 2]
```

**Pattern matching**

- RD.fold(rd, handlers)

```ts
import * as RD from '@young-aviator-club/remote-data';

let loadableResource: RemoteData<Error, number> = RD.notAsked();

const handleState = (rd: RemoteData<Error, number>) => {
  return RD.fold(rd, {
    notAsked: () => 'no data',
    loading: () => 'loading...',
    reloading: () => 'reloading...',
    success: (num) => `result: ${num}`,
    failure: (err) => `error: ${err.message}`,
  });
};

handleState(loadableResource); // "no data"

loadableResource = RD.loading();
handleState(loadableResource); // "loading..."

loadableResource = RD.reloading();
handleState(loadableResource); // "reloading..."

loadableResource = RD.failure(new Error('error'));
handleState(loadableResource); // "error: error"

loadableResource = RD.success(2);
handleState(loadableResource); // "result: 2"
```

with array of RemoteData:

```ts
import * as RD from '@young-aviator-club/remote-data';

let loadableResource1: RemoteData<Error, number> = RD.notAsked();
let loadableResource2: RemoteData<Error, number> = RD.notAsked();

const handleState = (rds: RemoteData<Error, number>[]) => {
  return RD.fold(rds, {
    notAsked: () => 'no data',
    loading: () => 'loading...',
    reloading: () => 'reloading...',
    success: ([num1, num2]) => `result: ${num1 + num2}`,
    failure: ([err1, err2]) => `errors: ${err1.message}, ${err2.message}`,
  });
};

handleState(loadableResource); // "no data"

loadableResource1 = RD.loading();
loadableResource2 = RD.loading();
handleState(loadableResource); // "loading..."

loadableResource1 = RD.failure(new Error('error1'));
loadableResource2 = RD.failure(new Error('error2'));
handleState(loadableResource); // "errors: error1, error2"

loadableResource1 = RD.success(1);
loadableResource2 = RD.success(2);
handleState(loadableResource); // "result: 3"
```
