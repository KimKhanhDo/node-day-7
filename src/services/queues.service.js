const queueModel = require('@/models/queue.model');

class QueueService {
    async push(job) {
        const { type, payload } = job;

        // Chuyển object thành JSON string và lưu vào DB
        await queueModel.createNewQueue(type, JSON.stringify(payload));
    }
}

module.exports = new QueueService();
