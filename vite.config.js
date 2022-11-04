export default {
  publicDir: 'docs',
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
};
