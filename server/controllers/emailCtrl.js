let nodemailer = require('nodemailer')

module.exports = {
    sendEmail: (req, res) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jaybirdnewsletter@gmail.com',
                pass: 'Utah9129'
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
              user: 'jaybirdnewsletter@gmail.com',
              pass: 'Utah9129'
          }
      })
        const mailOptions = {
          from: 'derek@email.com',
          to: `${email}`,
          subject: 'Thanks for Purchasing from Jaybird!',
          text: `here's a link to your receipt ${receipt_url}`
      }
        transporter.sendMail(mailOptions, function(err, res) {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', res)
          }
        })
    }
}