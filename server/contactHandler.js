import 'dotenv/config'
import nodemailer from 'nodemailer'

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
  const subject = (body.subject || name).trim()

  return { name, email, message, subject }
}

const createTransporter = () => {
  const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, SMTP_SECURE } = process.env

  if (!SMTP_USER || !SMTP_PASS) {
    const err = new Error('Missing SMTP credentials. Set SMTP_USER and SMTP_PASS environment variables.')
    err.statusCode = 500
    throw err
  }

  if (SMTP_HOST) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: `${name} <${email}>`,
    to: 'estoriasquemecontaram@gmail.com',
    subject,
    text: `Nova mensagem através do site:\n\nNome: ${name}\nEmail: ${email}\nAssunto: ${subject}\n\nMensagem:\n${message}`,
  })
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
  } catch (error) {
    const err = new Error('Invalid JSON payload')
    err.statusCode = 400
    throw err
  }
}
