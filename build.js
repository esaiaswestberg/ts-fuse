const { build } = require('esbuild')

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true
}

build({
  ...shared,
  outfile: 'dist/index.js'
})

build({
  ...shared,
  outfile: 'dist/index.esm.js',
  format: 'esm'
})
