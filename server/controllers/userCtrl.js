let aws = require('aws-sdk')

const {
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env

module.exports = {
    uploadToAmazon: (req, res) => {

        aws.config = {
          region: 'us-west-1',
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
        
        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
          Bucket: S3_BUCKET,
          Key: fileName,
          Expires: 60,
          ContentType: fileType,
          ACL: 'public-read'
        };
      
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
          if(err){
            console.log(err);
            return res.end();
          }
          const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
          };
      
          return res.send(returnData)
        });
      },
      uploadPhoto: async (req, res) => {
        let db = req.app.get('db')
        let {user_id} = req.session.user
        let {url:profile_image} = req.body
        let users = await db.add_image({user_id, profile_image})
        let user = users[0]
        res.send(user)
      },
      updateUser: async(req, res) => {
        let db = req.app.get('db')
        let { user_id } = req.session.user
        let { name, email, username } = req.body
        let users = await db.update_user({user_id, name, email, username})
        let user = users[0]
        let newUsers = await db.find_user_by_email(user.email)
        let newUser = newUsers[0]
        delete newUser.password
        req.session.user = newUser
        res.send(newUser)
      }
}