import type {UserConfigExport} from 'vite'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'
import {ViteEjsPlugin} from 'vite-plugin-ejs'
import path from 'path'
import Csv from 'vite-plugin-csv'
import tsconfigPaths from 'vite-tsconfig-paths'
import {viteCommonjs} from '@originjs/vite-plugin-commonjs'
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import EnvironmentPlugin from 'vite-plugin-environment' // to be able to use process.env.
import {defineConfig} from 'vite'

/* eslint-disable no-process-env */
const envName = 'local'
const rootDir = path.resolve(__dirname, './')
const isLocal = envName === 'local'

export default defineConfig(
  viteConfigFactory({
    packageName: 'portal',
  }),
)

// just making it as similar to real world as possible
function viteConfigFactory({
  packageName,
  siteTitle = 'Extend',
}: {
  packageName: string
  siteTitle?: string
}): UserConfigExport {
  return {
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
    server: {
      port: 3000,
      strictPort: true,
    },
    build: {
      sourcemap: true,
      commonjsOptions: {
        include: [/linked-dep/, /node_modules/],
      },
      rollupOptions: {
        plugins: [
          // @ts-expect-error Enable rollup polyfills plugin, used during production bundling
          rollupNodePolyFill(),
        ],
      },
    },
    plugins: [
      react(),
      istanbul({
        cypress: true,
        requireEnv: false,
      }),
      ViteEjsPlugin({
        title: siteTitle,
        favicon: `${__dirname}/favicon.ico`,
        template: `${__dirname}/index.ejs`,
        packageName,
      }),
      tsconfigPaths(),
      Csv(),
      viteCommonjs(),
      EnvironmentPlugin(['VITE_API_URL']),
    ],
    define: {
      'process.env': {},
      'process.env.version': JSON.stringify('12.22.6'),
      module: {},
      __DEV__: isLocal,
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src', 'components'),
        villains: path.resolve(__dirname, 'src', 'villains'),
        boys: path.resolve(__dirname, 'src', 'boys'),
        heroes: path.resolve(__dirname, 'src', 'heroes'),
        hooks: path.resolve(__dirname, 'src', 'hooks'),
        models: path.resolve(__dirname, 'src', 'models'),
        '@support': path.resolve(__dirname, 'cypress', 'support'),
        '@fixtures': path.resolve(__dirname, 'cypress', 'fixtures'),
        '@cypress': path.resolve(__dirname, 'cypress'),
        '@helloextend/zen': path.resolve(rootDir, 'packages/zen'),
        '@helloextend/agents-portal': path.resolve(rootDir, 'apps/agents'),
        '@helloextend/api-reference': path.resolve(
          rootDir,
          'apps/api-reference',
        ),
        '@helloextend/client-analytics': path.resolve(
          rootDir,
          'packages/client-analytics',
        ),
        '@helloextend/client-branding': path.resolve(
          rootDir,
          'packages/branding',
        ),
        '@helloextend/client-cdk': path.resolve(rootDir, 'packages/client-cdk'),
        '@helloextend/client-constants': path.resolve(
          rootDir,
          'packages/constants',
        ),
        '@helloextend/client-hocs': path.resolve(
          rootDir,
          'packages/client-hocs',
        ),
        '@helloextend/client-hooks': path.resolve(
          rootDir,
          'packages/client-hooks',
        ),
        '@helloextend/client-jest-config': path.resolve(
          rootDir,
          'packages/jest-config',
        ),
        '@helloextend/client-logger': path.resolve(
          rootDir,
          'packages/client-logger',
        ),
        '@helloextend/client-monitoring': path.resolve(
          rootDir,
          'packages/client-monitoring',
        ),
        '@helloextend/client-security-utils': path.resolve(
          rootDir,
          'packages/security-utils',
        ),
        '@helloextend/client-test-utils': path.resolve(
          rootDir,
          'packages/client-test-utils',
        ),
        '@helloextend/client-utils': path.resolve(rootDir, 'packages/utils'),
        '@helloextend/component-commons': path.resolve(
          rootDir,
          'packages/component-commons',
        ),
        '@helloextend/core-api-redux': path.resolve(
          rootDir,
          'packages/core-api-redux',
        ),
        '@helloextend/customers-portal': path.resolve(
          rootDir,
          'apps/customers',
        ),
        '@helloextend/customers-ui': path.resolve(
          rootDir,
          'packages/customers-ui',
        ),
        '@helloextend/deployments-ui': path.resolve(
          rootDir,
          'apps/deployments-ui',
        ),
        '@helloextend/extend-api-client': path.resolve(
          rootDir,
          'packages/extend-api-client',
        ),
        '@helloextend/extend-api-fetch': path.resolve(
          rootDir,
          'packages/extend-api-fetch',
        ),
        '@helloextend/extend-api-rtk-query': path.resolve(
          rootDir,
          'packages/extend-api-rtk-query',
        ),
        '@helloextend/extend-config': path.resolve(
          rootDir,
          'packages/extend-config',
        ),
        '@helloextend/merchants': path.resolve(rootDir, 'apps/merchants'),
        '@helloextend/merchants-ui': path.resolve(
          rootDir,
          'packages/merchants-ui',
        ),
        '@helloextend/portal': path.resolve(rootDir, 'apps/portal'),
        // These Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
        // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
        // process and buffer are excluded because already managed by node-globals-polyfill
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        sys: 'util',
        events: 'rollup-plugin-node-polyfills/polyfills/events',
        stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        path: 'rollup-plugin-node-polyfills/polyfills/path',
        querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
        punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
        url: 'rollup-plugin-node-polyfills/polyfills/url',
        string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
        http: 'rollup-plugin-node-polyfills/polyfills/http',
        https: 'rollup-plugin-node-polyfills/polyfills/http',
        os: 'rollup-plugin-node-polyfills/polyfills/os',
        assert: 'rollup-plugin-node-polyfills/polyfills/assert',
        constants: 'rollup-plugin-node-polyfills/polyfills/constants',
        _stream_duplex:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
        _stream_passthrough:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
        _stream_readable:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
        _stream_writable:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
        _stream_transform:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
        timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        console: 'rollup-plugin-node-polyfills/polyfills/console',
        vm: 'rollup-plugin-node-polyfills/polyfills/vm',
        zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
        tty: 'rollup-plugin-node-polyfills/polyfills/tty',
        domain: 'rollup-plugin-node-polyfills/polyfills/domain',
      },
    },
    assetsInclude: [
      '**/*.png',
      '**/*.png',
      '**/*.jpe?g',
      '**/*.gif',
      '**/*.svg',
      '**/*.ico',
      '**/*.webp',
      '**/*.avif',
    ],
  }
}
