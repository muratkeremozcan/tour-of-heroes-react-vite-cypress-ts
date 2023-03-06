import {defineConfig} from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      villains: path.resolve(__dirname, 'src', 'villains'),
      boys: path.resolve(__dirname, 'src', 'boys'),
      heroes: path.resolve(__dirname, 'src', 'heroes'),
      hooks: path.resolve(__dirname, 'src', 'hooks'),
      models: path.resolve(__dirname, 'src', 'models'),
      About: path.resolve(__dirname, 'src', 'About'),
    },
  },
})
