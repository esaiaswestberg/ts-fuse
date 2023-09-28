const { build } = require('esbuild')
const { dtsPlugin } = require('esbuild-plugin-d.ts')

const shared = {
  platform: 'node',
  entryPoints: ['src/index.ts'],
  bundle: true,
  plugins: [dtsPlugin()]
}

// Build esm
build({
  ...shared,
  target: 'esnext',
  outfile: 'dist/index.mjs',
  format: 'esm'
})
