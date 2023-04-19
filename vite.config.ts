import {defineConfig} from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react' // cy code cov
import istanbul from 'vite-plugin-istanbul' // cy code cov
import EnvironmentPlugin from 'vite-plugin-environment' // to be able to use process.env.
import {CypressMocks} from '@lmiller1990/vite-plugin-proxify-esm'

export default defineConfig({
  server: {port: 3000},
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
    EnvironmentPlugin(['VITE_API_URL']),
    CypressMocks(),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      villains: path.resolve(__dirname, 'src', 'villains'),
      boys: path.resolve(__dirname, 'src', 'boys'),
      heroes: path.resolve(__dirname, 'src', 'heroes'),
      hooks: path.resolve(__dirname, 'src', 'hooks'),
      models: path.resolve(__dirname, 'src', 'models'),
    },
  },
})
