# Les petits plats

Openclassrooms - Project 7

Requirements:
- NodeJS 16+
- Yarn 1.22+

## Branches

### main
Contains the most powerful algorithm code regarding to the performance benchmark. Actually, it's a merged version of `algo-1` branch.

### algo-1
Contains algorithm based on JS [Array functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

### algo-2
Contains algorithm based on JS native loops functions like `for`, `while`.

### benchmark
Dedicated branch for testing concurrent algorithms for the main search. Here, we'll test the best option between Array Functions and loops.
This branch has a specific README file which describes how to run the benchmark test.

> 🚨 Don't forget to make a fresh install of your dependencies before running your benchmark.
> Run `yarn install` or `npm install` to get the correct dependencies related to this branch.

## Development

This project is based on [Vite.js](https://vitejs.dev/) v3 for local development.

### Local development

__Using Yarn :__

1. Install dev dependencies with `yarn install`
2. Run local server with `yarn dev`.

__Using npm :__

1. Install dev dependencies with `npm install`
2. Run local server with `npm run dev`.

Then, visit [http://127.0.0.1:4200/oc-p7/](http://127.0.0.1:4200/oc-p7/)

### Build sources

To build sources for production, run `yarn build` (or `npm run build`) command.

All assets and code will be optimized and compiled in `/docs` folder regarding to the github pages recommendations.

When pushed/merged to the `main` branch, the project is available on [https://pandreski.github.io/oc-p7/](https://pandreski.github.io/oc-p7/).
