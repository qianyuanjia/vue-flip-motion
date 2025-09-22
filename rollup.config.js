import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  {
    input: 'src/components/Flip/entry.js',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
      },
    ],
    plugins: [
      {
        name: "row-loader",
        resolveId(id) {
          if (id.endsWith('.vue')) {
            console.log(111)
            // return path.resolve('./plugins', id.replace('?raw', ''));
          }
        },
        transform(code, id) {
          if (id.endsWith('.vue')) {
            console.log(222)
            return {
              code,
              map: { mappings: "" }
            };
          }
        }
      }
    ],
    watch: {
      exclude: 'node_modules/**',
    },
  },
  {
    input: 'src/components/Flip/index.d.ts',
    output: [{ file: './dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]);