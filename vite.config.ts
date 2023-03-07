import {defineConfig} from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react' // cy code cov
import istanbul from 'vite-plugin-istanbul' // cy code cov
import EnvironmentPlugin from 'vite-plugin-environment' // to be able to use process.env.

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
    EnvironmentPlugin('all'),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@villains': path.resolve(__dirname, 'src', 'villains'),
      '@boys': path.resolve(__dirname, 'src', 'boys'),
      '@heroes': path.resolve(__dirname, 'src', 'heroes'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@models': path.resolve(__dirname, 'src', 'models'),
      '@cypress': path.resolve(__dirname, 'cypress'),
      '@support': path.resolve(__dirname, 'cypress', 'support'),
      '@fixtures': path.resolve(__dirname, 'cypress', 'fixtures'),
    },
  },
})
