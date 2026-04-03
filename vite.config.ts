import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.resolve(__dirname, 'server/db.json')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-backend-middleware',
      configureServer(server) {
        server.middlewares.use((req: any, res: any, next: any) => {
          // 1. GET /api/portfolio
          if (req.url === '/api/portfolio' && req.method === 'GET') {
            const data = fs.readFileSync(DB_PATH, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
            return
          }

          // 2. POST /api/portfolio
          if (req.url === '/api/portfolio' && req.method === 'POST') {
            let body = ''
            req.on('data', (chunk: any) => { body += chunk })
            req.on('end', () => {
              fs.writeFileSync(DB_PATH, body, 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: 'Portfolio saved via Vite' }))
            })
            return
          }

          // 3. POST /api/login
          if (req.url === '/api/login' && req.method === 'POST') {
            let body = ''
            req.on('data', (chunk: any) => { body += chunk })
            req.on('end', () => {
              const { password } = JSON.parse(body)
              if (password === 'admin123') {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, token: 'vite-mock-token' }))
              } else {
                res.statusCode = 401
                res.end(JSON.stringify({ success: false, message: 'Invalid Password' }))
              }
            })
            return
          }

          next()
        })
      }
    }
  ],
})
