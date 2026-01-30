const emailService = require('@/services/email.service');

async function sendVerificationEmailTask(payload) {
    await emailService.sendVerificationEmail(payload);
}

module.exports = sendVerificationEmailTask;
