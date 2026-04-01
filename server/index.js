import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 8787)

app.use(express.json({ limit: '100kb' }))

const { EMAIL_USER, EMAIL_APP_PASSWORD, EMAIL_TO } = process.env

const transporter =
  EMAIL_USER && EMAIL_APP_PASSWORD
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_APP_PASSWORD
        },
        connectionTimeout: 12000,
        greetingTimeout: 12000,
        socketTimeout: 20000
      })
    : null

if (transporter) {
  transporter
    .verify()
    .then(() => {
      console.log('Email transporter ready')
    })
    .catch(error => {
      console.error('Email transporter verify failed:', error?.message || error)
    })
}

const isEmail = value => /\S+@\S+\.\S+/.test(value)
const escapeHtml = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const {
    name = '',
    email = '',
    age = '',
    sex = '',
    weight = '',
    freeTimeFrom = '',
    freeTimeTo = '',
    message = ''
  } = req.body || {}

  const fields = {
    name,
    email,
    age,
    sex,
    weight,
    freeTimeFrom,
    freeTimeTo,
    message
  }

  const missing = Object.entries(fields)
    .filter(([, value]) => String(value ?? '').trim().length === 0)
    .map(([key]) => key)

  if (missing.length) {
    return res.status(400).json({
      ok: false,
      error: 'Missing required fields'
    })
  }

  if (!isEmail(String(email))) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid email'
    })
  }

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !EMAIL_TO || !transporter) {
    return res.status(500).json({
      ok: false,
      error: 'Server email is not configured'
    })
  }

  const subject = `طلب تدريب من ${name}`
  const text = [
    `الاسم: ${name}`,
    `البريد الإلكتروني: ${email}`,
    `العمر: ${age}`,
    `الجنس: ${sex}`,
    `الوزن: ${weight}`,
    `الوقت المناسب: من ${freeTimeFrom} إلى ${freeTimeTo}`,
    '',
    'الرسالة:',
    message
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>طلب تدريب جديد</h2>
      <p><strong>الاسم:</strong> ${escapeHtml(name)}</p>
      <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(email)}</p>
      <p><strong>العمر:</strong> ${escapeHtml(age)}</p>
      <p><strong>الجنس:</strong> ${escapeHtml(sex)}</p>
      <p><strong>الوزن:</strong> ${escapeHtml(weight)}</p>
      <p><strong>الوقت المناسب:</strong> من ${escapeHtml(
        freeTimeFrom
      )} إلى ${escapeHtml(freeTimeTo)}</p>
      <p><strong>الرسالة:</strong></p>
      <p style="white-space: pre-line;">${escapeHtml(message)}</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `Hellich Contact <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject,
      text,
      html
    })

    return res.json({ ok: true })
  } catch (error) {
    const details =
      (error && typeof error === 'object' && 'message' in error && error.message) ||
      (error && typeof error === 'object' && 'code' in error && error.code) ||
      'Failed to send email'
    console.error('Email send failed:', details)
    return res.status(500).json({
      ok: false,
      error:
        process.env.NODE_ENV === 'production'
          ? 'Failed to send email'
          : String(details)
    })
  }
})

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`)
})
