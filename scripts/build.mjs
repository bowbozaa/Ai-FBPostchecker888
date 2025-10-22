import * as esbuild from 'esbuild';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { promises as fs } from 'fs';
import path from 'path';

const isProduction = process.argv.includes('--production');

// CSS Plugin for Tailwind
const cssPlugin = {
  name: 'css',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await fs.readFile(args.path, 'utf8');
      const result = await postcss([tailwindcss, autoprefixer]).process(css, {
        from: args.path,
      });
      return {
        contents: result.css,
        loader: 'css',
      };
    });
  },
};

const buildOptions = {
  entryPoints: ['src/main.tsx'],
  bundle: true,
  minify: isProduction,
  sourcemap: !isProduction,
  target: ['es2020'],
  outfile: 'main.js',
  define: {
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
  },
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.jsx': 'jsx',
    '.js': 'jsx',
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
  },
  plugins: [cssPlugin],
};

async function build() {
  try {
    console.log(`🏗️  Building ${isProduction ? 'production' : 'development'} bundle...`);

    if (isProduction) {
      // Production build
      await esbuild.build(buildOptions);
      console.log('✅ Production build complete!');
    } else {
      // Development build with watch mode
      const ctx = await esbuild.context({
        ...buildOptions,
        banner: {
          js: '(() => new EventSource("/esbuild").addEventListener("change", () => location.reload()))();',
        },
      });

      await ctx.watch();

      const { host, port } = await ctx.serve({
        servedir: '.',
        port: 3000,
      });

      console.log(`✅ Development server running at http://${host}:${port}`);
      console.log('👀 Watching for changes...');
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
