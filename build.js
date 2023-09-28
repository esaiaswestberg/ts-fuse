const { build } = require('esbuild')
const { dtsPlugin } = require('esbuild-plugin-d.ts')
const { Generator } = require('npm-dts')

const shared = {
  platform: 'node',
  entryPoints: ['src/index.ts'],
  bundle: true,
  plugins: [dtsPlugin()]
}

// Build commonjs
build({
  ...shared,
  target: 'node16.6',
  outfile: 'dist/index.cjs',
  format: 'cjs'
})

// Build esm
build({
  ...shared,
  target: 'esnext',
  outfile: 'dist/index.mjs',
  format: 'esm'
})

// Generate types
new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts'
}).generate()
