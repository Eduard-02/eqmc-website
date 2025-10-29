import { normalizePayload, readJsonBody, sendContactEmail } from '../server/contactHandler.js'

const sendJson = (res, statusCode, data) => {
  if (res.headersSent) return
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, message: 'Method not allowed' })
    return
  }

  try {
    const body = await readJsonBody(req)
    const payload = normalizePayload(body)
    await sendContactEmail(payload)
    sendJson(res, 200, { ok: true })
  } catch (error) {
    const statusCode = error.statusCode || 500
    const message = statusCode === 500 ? 'Unable to send email' : error.message
    console.error('Contact form error:', error)
    sendJson(res, statusCode, { ok: false, message })
  }
}
