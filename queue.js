require('module-alias/register');
require('dotenv').config();

require('@/config/database');

const tasks = require('@/tasks');
const { QUEUE_STATUS } = require('@/config/constant');
const queueModel = require('@/models/queue.model');
const sleep = require('@/utils/sleep');

// Consumer xử lý job (Worker chạy độc lập)
(async () => {
    while (true) {
        //  Lấy 1 job "pending" từ DB
        const pendingJob = await queueModel.getOnePending();

        if (pendingJob) {
            // "sendPasswordChangeEmail"
            const type = pendingJob.type;
            const payload = JSON.parse(pendingJob.payload); // Convert JSON string → object

            try {
                console.log(`Job: "${type}" is processing`);

                // Đổi status = "inProgress"
                await queueModel.updateStatus(
                    pendingJob.id,
                    QUEUE_STATUS.IN_PROGRESS,
                );

                // await emailService.sendVerificationEmail(payload);

                // Tìm handler tương ứng
                const handler = tasks[type];
                if (!handler) {
                    throw new Error(`There's no task to solve for '${type}'`);
                }

                // Chạy handler
                await handler(payload);

                // Đổi status = "completed"
                await queueModel.updateStatus(
                    pendingJob.id,
                    QUEUE_STATUS.COMPLETED,
                );

                console.log(`Job: "${type}" is processed`);
            } catch (error) {
                console.log('🚀 ~ error:', error);

                // Nếu lỗi → Đổi status = "failed"
                await queueModel.updateStatus(
                    pendingJob.id,
                    QUEUE_STATUS.FAILED,
                );
            }
        }

        // Ngủ 1 giây rồi lặp lại
        await sleep(1000);
    }
})();
