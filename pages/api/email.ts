import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type EmailRequest = {
  email: string
  name: string
  company: string
  description: string
}

export type EmailResponse = {
  message: string
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as EmailRequest

  const emailres = await resend.emails.send({
    from: 'hello@seanrogers.dev',
    to: 'hello@seanrogers.dev',
    subject: `${body.name} wants to hire you!`,
    html: `<div>
      <p>${body.name} wants to hire you!</p>
      <ul>
        <li><strong>Name: </strong>${body.name}</li>
        <li><strong>email: </strong>${body.email}</li>
        <li><strong>Company: </strong>${body.company}</li>
        <li><strong>Description: </strong>${body.description}</li>
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
