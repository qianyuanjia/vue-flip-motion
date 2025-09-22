import { defineConfig } from 'rollup';
import vue from 'rollup-plugin-vue'
import vue2Compiler from 'vue-template-compiler';

export default defineConfig([
  {
    input: 'src/components/Flip/vue2.vue',
    output: [
      {
        file: 'dist/vue2/index.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/vue2/index.mjs',
        format: 'esm',
      },
    ],
    external: ['vue'],
    plugins: [
      vue({
        compiler: vue2Compiler,
      }),
    ],
    watch: {
      exclude: 'node_modules/**',
    },
  }
]);