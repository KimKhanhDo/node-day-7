const transporter = require('@/config/nodemailer');
const authService = require('./auth.service');
const { verifyEmailSecret } = require('@/config/jwt');

class EmailService {
    async sendVerifyEmail(user) {
        const token = authService.createAccessToken(user, verifyEmailSecret);
        // let isSuccess = false;
        // let count = 0;

        // do {
        //     // Send lan 1
        //     // Neu that bai
        //     // Sleep 2000
        // } while (!isSuccess);

        const info = await transporter.sendMail({
            from: '"Test Sender Verify Email" <khanh.k.do02@gmail.com>',
            to: user.email,
            subject: 'Verify user account',
            html: `<p><a href="http://localhost:5173?token=${token}">Click here</a> to verify email!</p>`,
        });
        // console.log('🚀 ~ register ~ info:', info);
        return info;
    }
}

module.exports = new EmailService();
