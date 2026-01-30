const pool = require('@/config/database');

class Queue {
    async getAllPending() {
        const [rows] = await pool.query(
            'SELECT * FROM queues where status = "pending"',
        );
        return rows;
    }

    async getOnePending() {
        const [rows] = await pool.query(
            'SELECT * FROM queues where status = "pending" limit 1',
        );
        return rows[0];
    }

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

    async updateStatus(id, status) {
        const [{ affectedRows }] = await pool.query(
            'UPDATE queues SET status = ? WHERE id = ?',
            [status, id],
        );

        return affectedRows;
    }
}

module.exports = new Queue();
