const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '476576920226-p77kapoo2ssrdheiu8qjup2ee0d1p3hj.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04u5dbjoDs2x_CgYIARAAGAQSNwF-L9Ir6AsytvukcWAek1Q8sYU1zYvF_RLQsxPksiZ1jEC1u-d3vcNtrAv3nuqH2SgMCqWXBPk'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN })

export async function sendmail(Email){
try{
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'abhibhavekar@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        }
    })

    const mailoption = {
        from: 'Abhi  <abhibhavekar@gmail.com>',
        to: Email,
        subject: 'Forgot Password',
        text: 'Reset the Password',
       html: `<h1></h1>To reset a password ,<a href="http://localhost:3000/api/v1/users/resetPassword">Click Here</a></h1>`
    };

    const Result = await transport.sendMail(mailoption)
    return Result
}catch (error){
 return error;
}
}

// sendmail()
// .then(Result => console.log("Email Sent.....", Result))
// .catch((error) => console.log(error.message));