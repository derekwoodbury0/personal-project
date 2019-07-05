let nodemailer = require('nodemailer')
let { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env

module.exports = {
    sendEmail: (req, res) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: NODEMAILER_EMAIL,
                pass: NODEMAILER_PASSWORD
            }
        })
        const mailOptions = {
            from: 'derek@email.com',
            to: `${req.body.email}`,
            subject: 'Welcome To Our Newsletter!',
            html:   `<div>
                        <div style="color: blue">Hi, ${req.body.name}!</div> 
                        <div>Thanks for subscribing to our newsletter! Stay tuned for awesome deals and updates!</div>
                        <div>From The Jaybird Team</div>
                    </div>`
        }
        transporter.sendMail(mailOptions, function(err, res) {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', res)
            }
          })
          res.send(console.log('success'))
    },
    sendReceipt: (receipt_url, email) => { 
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: NODEMAILER_EMAIL,
              pass: NODEMAILER_PASSWORD
          }
      })
        const mailOptions = {
          from: 'derek@email.com',
          to: `${email}`,
          subject: 'Thanks for Purchasing from Jaybird!',
          html: `<div>Attached is a receipt from your Jaybird purchase. Thanks for your business!</div>`,
          // <img src="cid:unique@nodemailer.com" />`
          attachments: [
            {
              filename: 'receipt.html',
              path: `${receipt_url}`,
              cid: 'unique@nodemailer.com'
            }
          ]
      }
        transporter.sendMail(mailOptions, function(err, res) {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', res)
          }
        })
    },
    supportEmail: (req, res, next) => {
      let { name, email, message } = req.body

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NODEMAILER_EMAIL,
            pass: NODEMAILER_PASSWORD
        }
    })
      const mailOptions = {
        from: `${email}`,
        to: `jaybirdnewsletter@gmail.com`,
        subject: 'Support Page Email',
        html: `<div>${message}</div>
                <div>From: ${name}</div>
                <div>Email: ${email}</div>`
    }
      transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          res.sendStatus(200)
        }
      })
      next()
    }
}