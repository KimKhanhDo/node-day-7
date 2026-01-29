const pool = require('@/config/database');

class Queue {
    async getQueueById(id) {
        const [rows] = await pool.query('SELECT * FROM queues WHERE id = ?', [
            id,
        ]);

        return rows[0] || null;
    }

    async createNewQueue(type, payload) {
        const [result] = await pool.query(
            'INSERT INTO queues (type, payload) VALUES (?, ?)',
            [type, payload],
        );

        // Lấy queue vừa tạo
        return this.getQueueById(result.insertId);
    }
}

module.exports = new Queue();
