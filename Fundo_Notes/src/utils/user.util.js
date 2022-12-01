const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '476576920226-p77kapoo2ssrdheiu8qjup2ee0d1p3hj.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04YeDEItp0F0kCgYIARAAGAQSNwF-L9IrCunBNrnPrTIq0_toL5Lca8x5Q5OHaUUqQ-B6VOGLu2WTfCn_079qJk12Rkte0uoQwcQ'

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

export async function sendMailToNewUser(EmailId, Firstname, Lastname) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'abhibhavekar@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'Abhishek # <abhibhavekar@gmail.com',
            to: EmailId,
            subject: 'Registration is Successfull',
            text: `Hi, ${Firstname} ${Lastname} the Registration for fundoo notes is successfull, you can login now....`,

            html: `<h2>To login to fundoo notes, please <a href="http://localhost:4000/api/v1/users/logins">Click Here.....</a></h2>`
        };

        const result = await transport.sendMail(mailOptions)
        console.log('=========>>>>', result);
        return result;

    } catch (error) {
        return error;

    }
}