[![unit-lint-typecheck-e2e-ct](https://github.com/muratkeremozcan/tour-of-heroes-react-vite-cypress-ts/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/muratkeremozcan/tour-of-heroes-react-vite-cypress-ts/actions/workflows/main.yml)

![react version](https://img.shields.io/badge/react-18.2.0-brightgreen)
![cypress version](https://img.shields.io/badge/cypress-13.14.1-brightgreen)
![typescript version](https://img.shields.io/badge/typescript-4.8.3-brightgreen)
![vite version](https://img.shields.io/badge/vite-4.5.3-brightgreen)
[![renovate-app badge][renovate-badge]][renovate-app]

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

Vite version of the application built in the book
[CCTDD: Cypress Component Test Driven Development](https://github.com/muratkeremozcan/cctdd).

The Webpack version of the application can be found
[here](https://github.com/muratkeremozcan/tour-of-heroes-react-cypress-ts).

```bash
# specify the registry in case you are using a proprietary registry
yarn install --registry https://registry.yarnpkg.com

# parallel unit, typecheck, lint, format
yarn validate

# no need to have server running for these:
yarn cy:open-ct # for cypress component test runner
yarn cy:run-ct # headless version

# runs the ui and api servers, then opens e2e runner
yarn cy:open-e2e
yarn cy:run-e2e  # headless version

yarn test # run unit tests with jest
```

## CI

```
build  -->  Cypress e2e test
       -->  Cypress component test
       -->  Typecheck
       -->  Lint
       -->  Unit test
```
