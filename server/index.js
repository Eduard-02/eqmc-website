import http from 'http'
import handler from '../api/contact.js'

const PORT = process.env.PORT || 3000
const allowedOrigins = (process.env.ALLOWED_ORIGIN || '*')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

const resolveOrigin = (req) => {
  if (allowedOrigins.includes('*')) return '*'
  const requestOrigin = req.headers.origin
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) return requestOrigin
  return allowedOrigins[0] || '*'
}

const setCorsHeaders = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', resolveOrigin(req))
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(req, res)

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.url === '/api/contact' && req.method === 'POST') {
    await handler(req, res)
    return
  }

  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: false, message: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`Contact API listening on port ${PORT}`)
})
