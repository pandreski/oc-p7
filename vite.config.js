export default {
  root: 'src',
  base: '/oc-p7/',
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
