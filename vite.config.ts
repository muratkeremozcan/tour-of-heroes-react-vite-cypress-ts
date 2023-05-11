import {defineConfig} from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

import EnvironmentPlugin from 'vite-plugin-environment' // to be able to use process.env.

export default defineConfig({
  server: {port: 3000},
  build: {
    sourcemap: true,
  },
  plugins: [react(), EnvironmentPlugin(['VITE_API_URL'])],
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
    },
  },
})
