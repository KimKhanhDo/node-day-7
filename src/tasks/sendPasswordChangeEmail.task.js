const emailService = require('@/services/email.service');

async function sendPasswordChangeEmailTask(payload) {
    await emailService.sendPasswordChangeEmail(payload);
}

module.exports = sendPasswordChangeEmailTask;
