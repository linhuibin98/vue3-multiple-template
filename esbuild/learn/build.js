const { build } = require('esbuild');

async function dev() {
    await build({
        entryPoints: ['index.js'],
        bundle: true,
        outfile: 'bundle.js',
        watch: true
    });
}

async function prod() {

}

dev();
 