# fp-multik 🤹🏼‍♂️

[![npm version](https://badge.fury.io/js/fp-multik.svg)](https://badge.fury.io/js/fp-multik)

Small functional utility for control flow and conditional operator for functions.
**Multik** is value-based multimethod for Javascript/Typescript programs.

It's simple:

1. import fp-multik
2. create in first argument of multik - selector from initial arguments
3. write in the rest of the arguments what you want to process in the predicates
4. enjoi!

---

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - Simple predicate as value
  - Custom predicate
  - OR predicate
  - Default predicate
  - Access to initial args and selector
  - Placeholder convection for unused params
- [Use-cases](#use-cases)
- [Alternatives](#alternatives)
- [Contributing](#contributing)

## Installation

NPM

```shell
npm install fp-multik
```

Yarn

```shell
yarn add fp-multik
```

## Features

- 🐣 **small** API and size
- 🌊 **pipable**
- 🙌🏻 **usefull** access to data/selector in predicates
- 🔗 **better types** than in analogues

## Usage

**multik** is a single function:

```sh
multik(
  selectorFunction(...initialArgs) => selector,
  [pricidateValue, actionFunction(selector, ...initialArgs) => result],
  [predicateFunction(selector, ...initialArgs), actionFunction(selector, ...initialArg) => result],
  [defaultFunction?(selector, ...initialArgs) => result]
): (initialArgs) => result;
```

- **pricidateValue** can be primitive value or Array / Object
- **predicateFunction** is a classic predicate function that return boolean
- **defaultFunction** is optional function for specify default result

### Simple predicate as value

Matching **Number** values

```ts
import multik from 'fp-multik';

const nominalDegreesOfThousand = multik(
  (n: number) => n,
  [1000, () => 'thousand'],
  [1000000, () => 'million'],
  [1000000000, () => 'billion'],
  [1000000000000, () => 'trillion'],
  [1000000000000000, () => 'quadrillion'],
);

nominalDegreesOfThousand(1000); // 'thousand'
nominalDegreesOfThousand(1000000); // 'million'
nominalDegreesOfThousand(1000000000); // 'billion'
nominalDegreesOfThousand(1000000000000); // 'trillion'
nominalDegreesOfThousand(1000000000000000); // 'quadrillion'
```

Matching **String** values

```ts
import multik from 'fp-multik';

const greet = multik(
  (data) => data.lang,
  ["english", () => "Hello"),
  ["french", () => "Bonjour")
);

greet({ id: 1, lang: "french" }); // "Bonjour"
```

Matching **Array** values

```js
import multik from 'fp-multik';

const shot = multik(
  (data) => data.coord,
  [[30, 40], () => 'hitted!'],
  [[90, 40], () => 'hitted your building!'],
);

shot({ coord: [30, 40] }); // "hitted!"
shot({ coord: [90, 40] }); // "hitted your building!"
shot({ coord: [0, 0] }); // undefined
```

Matching **Object** values

```ts
import multik from 'fp-multik';

interface Response {
  code: number;
}

const getResult = multik(
  (data: Response) => data,
  [{ code: 200 }, () => 'complete'],
  [{ code: 500 }, () => 'error'],
);

getResult({ code: 200 }); // "complete"
getResult({ code: 500 }); // "error"
```

### Custom predicate

```ts
import multik from 'fp-multik';

const fizzBuzz = multik(
  (n: number) => n,
  [(n) => n % 3 === 0 && n % 5 === 0, () => 'FizzBuzz'],
  [(n) => n % 3 === 0, () => 'Fizz'],
  [(n) => n % 5 === 0, () => 'Buzz'],
);

fizzBuzz(3); // "Fizz"
fizzBuzz(5); // "Buzz"
fizzBuzz(15); // "FizzBuzz"
```

### OR predicate

```ts
import multik from 'fp-multik';

enum UserRole {
  Admin = 'admin',
  Guest = 'guest',
  Editor = 'editor',
}
type User = { fullname: string; age: number; role: UserRole };

const adminUser: User = { fullname: 'John Smith', age: 20, role: UserRole.Admin };
const guestUser: User = { fullname: 'Evan Martinez', age: 24, role: UserRole.Guest };
const editorUser: User = { fullname: 'Tod Parker', age: 17, role: UserRole.Editor };

const getInformation = multik(
  (data: User) => data.role,
  [[UserRole.Admin, UserRole.Editor], () => 'secret information'],
  [UserRole.Guest, () => 'no access'],
);

getInformation(adminUser); // "secret information"
getInformation(editorUser); // "secret information"
getInformation(guestUser); // "no access"
```

### Default predicate

```ts
import multik from 'fp-multik';

const greet = multik(
  (data) => data.lang,
  ["english", () => "Hello"),
  ["french", () => "Bonjour"),
  [() => 'not matched'] // default method
);

greet({ id: 1, lang: "germany" }); // "not matched"
```

### Access to initial arg and selector

```ts
import multik from 'fp-multik';

const adultInformation = multik(
  (user) => user.age,
  [(age) => age >= 18, (user, age) => `hey ${user.name}, your age (`${age}`) is right, access success!`),
  [(_user, age) => `your age (${age}) less 18, access denied`]
);

adultInformation({ name: 'Greg', age: 17 }); // "your age (17) less 18, access denied"
adultInformation({ name: 'John', age: 27 }); // "hey John, your age (27) is right, access success!"
```

### Placeholder convection for unused params

If you want use only concrete arguments in predicate or action and ignore other you can name param start underscore:

```ts
import multik from 'fp-multik';

const calc = multik(
  (_n1: number, op: string, _n2: number) => op,
  ['+', (_selector, n1, _op, n2) => n1 + n2],
  ['-', (_selector, n1, _op, n2) => n1 - n2],
);

calc(1, '+', 2); // 3
calc(4, '-', 2); // 2
```

that changes show unused params in callback and exclude some conflicts with names

## Use-cases

### Control flow

```ts
import multik from 'fp-multik';
import process from 'process';

const app = multik(
  (args: string[]) => args[2],
  ['--help', () => console.log('Show help information')],
  ['--run', () => console.log('Run job')],
  [() => console.log('Command not found')],
);

app(process.argv);
```

```sh
user % ts-node app.ts --help
Show help information
user % ts-node app.ts --run
Run job
user % ts-node app.ts
Command not found
```

### Handling business scenarios

```ts
import multik from 'fp-multik';

const convertFile = multik(
  (filepath: string, format: string) => format,
  ['json', (format, filepath) => console.log(`Convert ${filepath} as JSON...`)],
  ['html', (format, filepath) => console.log(`Convert ${filepath} as HTML...`)],
  ['csv', (format, filepath) => console.log(`Convert ${filepath} as CSV...`)],
  [(format, filepath) => console.log(`Convert ${filepath} by default as TXT...`)],
);

convertFile('/Users/file1.data', 'json');
convertFile('/Users/file1.data', 'html');
convertFile('/Users/file1.data', 'csv');
convertFile('/Users/file1.data', 'unknown');
```

```sh
user % ts-node app.ts
Convert /Users/file1.data as JSON...
Convert /Users/file1.data as HTML...
Convert /Users/file1.data as CSV...
Convert /Users/file1.data by default as TXT...
```

### Handling error

```ts
import multik from 'fp-multik';

const handleFetchError = multik(
  (clientError: HttpClientError) => clientError.code,
  [
    404,
    () => {
      /* ... handle 404 code */
    },
  ],
  [
    500,
    () => {
      /* ... handle 500 code */
    },
  ],
);

try {
  const response = await fetch('http://mysite.ru', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await response.json();
} catch (e: HttpClientError) {
  handleFetchError(e);
}
```

### Handling state

```ts
import multik from 'fp-multik';

type Action = {
  type: string;
  id?: number;
  text?: string;
};

type Store = {
  add: (text: string) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
};

const store: Store = {
  add(text: string) {
    console.log(`todo with ${text} added`);
  },
  remove(id: number) {
    console.log(`${id} todo removed`);
  },
  toggle(id: number) {
    console.log(`#${id} todo toggled`);
  },
};

const handleAction = multik(
  (action: Action, store: Store) => action.type, // custom dispatch
  ['ADD_TODO', (_type_, action, store) => store.add(action.text!)],
  ['REMOVE_TODO', (_type, action, store) => store.remove(action.id!)],
  ['TOGGLE_TODO', (_type, action, store) => store.toggle(action.id!)],
);

handleAction({ type: 'ADD_TODO', text: 'Eat banana' }, store); // log "todo with Eat banana added"
handleAction({ type: 'TOGGLE_TODO', id: 1 }, store); // log "#1 todo toggled"
```

## Alternatives

Let's overview simple code with **multik**:

```ts
import multik from "fp-multik";

const greet = multik(
  (data) => data.lang,
  ["english", () => "Hello"),
  ["french", () => "Bonjour")
);

greet({ id: 1, lang: "french" }); // "Bonjour"
```

you can also consider alternatives

### Lodash (Ramda like libs)

If you love lodash and you dont want install multik - you can implement DIY multik yourself. 😉

```js
import _ from 'lodash';

const multik = (dispatcher, predicates) =>
  _.flow([
    (data) => dispatcher(data),
    _.cond([...predicates, [_.stubTrue, _.constant('no match')]]),
  ]);

const greet = multik(
  (data) => data.lang,
  [
    [(lang) => lang === 'english', () => 'Hello'],
    [(lang) => lang === 'french', () => 'Bonjour'],
  ],
);

greet({ id: 1, lang: 'french' }); // "Bonjour"
```

### @arrows/multimethod

Powerful multimethod library. You can

```ts
import { multi, method } from '@arrows/multimethod';

const greet = multi(
  (data) => action.lang,
  method('english', () => 'Hello'),
  method('french', () => 'Bonjour'),
  method(() => 'no match'),
);

greet({ id: 1, lang: 'french' }); // "Bonjour"
```

Also you can discover next libraries:

- [ts-multimethod](https://github.com/darky/ts-multimethod)
- [rubico switchCase](https://rubico.land/docs/switchCase)
- [ts-pattern](https://github.com/gvergnaud/ts-pattern)

## Contributing

Your feedback and contributions are welcome. If you have a suggestion, please raise an issue. Prior to that, please search through the issues first in case your suggestion has been made already. If you decide to work on an issue, or feel like taking initiative and contributing anything at all, feel free to create a pull request and I will get back to you shortly.
