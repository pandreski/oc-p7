export default {
  root: 'src',
  resolve: {
    alias: {
      '~bootstrap': 'node_modules/bootstrap',
    },
  },
  server: {
    port: 4200,
    hot: true,
  },
  build: {
    outDir: '../docs',
  },
};
