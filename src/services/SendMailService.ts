/* eslint-disable no-console */
import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

interface IRequestDTO {
  email: string
  subject: string
  variables: Record<string, string>
  path: string
}

class SendMailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })
      this.client = transporter
    })
  }

  async execute({
    email,
    subject,
    variables,
    path,
  }: IRequestDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf8')
    const parseTemplate = handlebars.compile(templateFileContent)

    const html = parseTemplate(variables)

    const message = await this.client.sendMail({
      to: email,
      subject,
      html,
      from: 'NPS <noreply@nps.com.br>',
    })

    console.log('Message sent: %s', message.messageId)
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendMailService()
