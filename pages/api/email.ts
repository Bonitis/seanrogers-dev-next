import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type EmailRequest = {
  email: string
  name: string
  company?: string
  description: string
}

export type EmailResponse = {
  message: string
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as EmailRequest

  const companyLine = body.company
    ? `<li><strong>Company: </strong>${escapeHtml(body.company)}</li>`
    : ''

  const emailres = await resend.emails.send({
    from: 'hello@seanrogers.dev',
    to: 'hello@seanrogers.dev',
    subject: `New message from ${body.name}`,
    html: `<div>
      <p>${escapeHtml(body.name)} sent you a message via seanrogers.dev:</p>
      <ul>
        <li><strong>Name: </strong>${escapeHtml(body.name)}</li>
        <li><strong>Email: </strong>${escapeHtml(body.email)}</li>
        ${companyLine}
        <li><strong>Message: </strong>${escapeHtml(body.description)}</li>
      </ul>
    </div>`,
  })

  if (emailres.error) {
    return res.status(500).json({ message: emailres.error.message })
  }
  res
    .status(200)
    .json({ message: 'Sent successfully! You should hear from me soon.' })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return sendEmail(req, res)
    default:
      res.status(405).end()
  }
}
