import * as esbuild from 'esbuild';
import { stylePlugin } from 'esbuild-style-plugin';
import * as fs from 'fs';

const isProduction = process.argv.includes('--production');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

const buildOptions = {
  entryPoints: ['frontend/main.jsx'],
  bundle: true,
  outfile: 'dist/main.js',
  minify: isProduction,
  sourcemap: !isProduction,
  target: ['es2020'],
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
    '.ts': 'tsx',
    '.tsx': 'tsx',
  },
  plugins: [
    stylePlugin({
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    }),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
  },
};

const cssOptions = {
  entryPoints: ['frontend/styles/main.css'],
  bundle: true,
  outfile: 'dist/main.css',
  minify: isProduction,
  loader: {
    '.css': 'css',
  },
  plugins: [
    stylePlugin({
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    }),
  ],
};

async function build() {
  try {
    console.log('Building application...');

    // Build JavaScript
    await esbuild.build(buildOptions);
    console.log('✓ JavaScript built successfully');

    // Build CSS
    await esbuild.build(cssOptions);
    console.log('✓ CSS built successfully');

    // Copy HTML
    fs.copyFileSync('index.html', 'dist/index.html');
    console.log('✓ HTML copied successfully');

    if (!isProduction) {
      console.log('\nStarting development server...');
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();

      const { host, port } = await ctx.serve({
        servedir: 'dist',
        port: 3000,
      });

      console.log(`\n🚀 Server running at http://${host}:${port}`);
    } else {
      console.log('\n✓ Production build complete!');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
