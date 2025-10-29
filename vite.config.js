import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'contact-api-dev-endpoint',
      configureServer(server) {
        let handlerModulePromise

        server.middlewares.use('/api/contact', async (req, res) => {
          if (!handlerModulePromise) {
            handlerModulePromise = import('./server/contactHandler.js')
          }

          const { normalizePayload, readJsonBody, sendContactEmail } = await handlerModulePromise

          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, message: 'Method not allowed' }))
            return
          }

          try {
            const body = await readJsonBody(req)
            const payload = normalizePayload(body)
            await sendContactEmail(payload)

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (error) {
            const statusCode = error.statusCode || 500
            res.statusCode = statusCode
            res.setHeader('Content-Type', 'application/json')
            const message = statusCode === 500 ? 'Unable to send email' : error.message
            res.end(JSON.stringify({ ok: false, message }))
          }
        })
      },
    },
  ],
	base: "/eqmc-website",
})
