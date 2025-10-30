import 'dotenv/config'
import { Resend } from 'resend'

const requiredFields = ['name', 'email', 'message']

export const normalizePayload = (body = {}) => {
  const errors = []
  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
      errors.push(field)
    }
  }
  if (errors.length) {
    const err = new Error(`Missing required fields: ${errors.join(', ')}`)
    err.statusCode = 400
    throw err
  }

  const name = body.name.trim()
  const email = body.email.trim()
  const message = body.message.trim()
  const subject = (body.subject || `New message from ${name}`).trim()

  return { name, email, message, subject }
}

const getResend = () => {
  const { RESEND_API_KEY } = process.env
  if (!RESEND_API_KEY) {
    const err = new Error('Missing RESEND_API_KEY environment variable.')
    err.statusCode = 500
    throw err
  }
  return new Resend(RESEND_API_KEY)
}

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const resend = getResend()

  const from = process.env.CONTACT_FROM || 'EQMC Contact <onboarding@resend.dev>'
  const to = process.env.CONTACT_TO || 'estoriasquemecontaram@gmail.com'

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;line-height:1.5">
      <h2>New message from EQMC contact form</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
    </div>
  `

  const { data, error } = await resend.emails.send({
    from,
    to,
    reply_to: `${name} <${email}>`,
    subject,
    html,
  })

  if (error) {
    const err = new Error(`Resend error: ${error.message || 'unknown'}`)
    err.statusCode = 502
    throw err
  }

  console.log('Email sent via Resend:', data?.id || data)
}

export const readJsonBody = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body

  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  if (!chunks.length) return null

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    const err = new Error('Invalid JSON payload')
    err.statusCode = 400
    throw err
  }
}

const escapeHtml = (str) =>
  str.replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[c]))