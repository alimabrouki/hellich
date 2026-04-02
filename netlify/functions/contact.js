import nodemailer from 'nodemailer'

const isEmail = value => /\S+@\S+\.\S+/.test(value)
const escapeHtml = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const {
      name = '',
      email = '',
      age = '',
      sex = '',
      weight = '',
      freeTimeFrom = '',
      freeTimeTo = '',
      message = ''
    } = JSON.parse(event.body || '{}')

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
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: 'Missing required fields' })
      }
    }

    if (!isEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: 'Invalid email' })
      }
    }

    const { EMAIL_USER, EMAIL_APP_PASSWORD, EMAIL_TO } = process.env

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD
      }
    })

    const subject = `طلب تدريب من ${name}`

    const text = `
الاسم: ${name}
البريد الإلكتروني: ${email}
العمر: ${age}
الجنس: ${sex}
الوزن: ${weight}
الوقت المناسب: من ${freeTimeFrom} إلى ${freeTimeTo}

الرسالة:
${message}
`

    const html = `
    <div style="font-family: Arial; direction: rtl; text-align: right;">
      <h2>طلب تدريب جديد</h2>
      <p><strong>الاسم:</strong> ${escapeHtml(name)}</p>
      <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(email)}</p>
      <p><strong>العمر:</strong> ${escapeHtml(age)}</p>
      <p><strong>الجنس:</strong> ${escapeHtml(sex)}</p>
      <p><strong>الوزن:</strong> ${escapeHtml(weight)}</p>
      <p><strong>الوقت المناسب:</strong> من ${escapeHtml(freeTimeFrom)} إلى ${escapeHtml(freeTimeTo)}</p>
      <p><strong>الرسالة:</strong></p>
      <p style="white-space: pre-line;">${escapeHtml(message)}</p>
    </div>
    `

    await transporter.sendMail({
      from: `Hellich Contact <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject,
      text,
      html
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: 'Failed to send email' })
    }
  }
}