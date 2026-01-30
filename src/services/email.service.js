const transporter = require('@/config/nodemailer');
const authService = require('./auth.service');
const { verifyEmailSecret } = require('@/config/jwt');

class EmailService {
    async sendVerifyEmail(user) {
        const token = authService.createAccessToken(user, verifyEmailSecret);

        const clientUrl =
            process.env.CLIENT_URL || 'https://your-username.github.io';

        const info = await transporter.sendMail({
            from: '"Test Sender Verify Email" <khanh.k.do02@gmail.com>',
            to: user.email,
            subject: 'Verify user account',
            html: `<p><a href="${clientUrl}?token=${token}">Click here</a> to verify email!</p>`,
        });
        // console.log('🚀 ~ register ~ info:', info);
        return info;
    }

    async sendPasswordChangeEmail(user) {
        const info = await transporter.sendMail({
            from: '"Test Sender Update Password" <khanh.k.do02@gmail.com>',
            to: user.email,
            subject: 'Password Changed Successfully',
            html: `
            <p>Hi ${user.name},</p>
            <p>Your password was changed at ${user.changedAt}</p>
        `,
        });

        return info;
    }
}

module.exports = new EmailService();
