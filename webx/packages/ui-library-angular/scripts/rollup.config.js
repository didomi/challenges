import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'build/es2015/core.js',
  output: {
    file: 'dist/fesm2015.js',
    format: 'es',
  },
  external: id => {
    return !(id.startsWith('.') || id.startsWith('/') || id.charAt(1) === ':');
  },
  plugins: [
    resolve({
      module: true,
    }),
  ],
};
