const pool = require('@/config/database');

class Task {
    async getAllTasks() {
        const [rows] = await pool.query('SELECT * FROM tasks');
        return rows;
    }

    async getTaskById(id) {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [
            id,
        ]);
        return rows[0] || null;
    }

    async createNewTask(data) {
        // Step 1: INSERT vào database
        const [result] = await pool.query(
            'INSERT INTO tasks (title, is_completed, user_id) VALUES (?, ?, ?)', // Thêm user_id
            [data.title, data.is_completed, data.user_id],
        );
        console.log('🚀 ~ result:', result);

        // Step 2: SELECT lại để lấy đầy đủ thông tin
        const [newTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [
            result.insertId,
        ]);

        return newTask[0];
    }

    async updateTask(id, data, userId) {
        const [result] = await pool.query(
            'UPDATE tasks SET title = ?, is_completed = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
            [data.title, data.is_completed, id, userId],
        );

        if (result.affectedRows === 0) {
            return null;
        }

        const [updatedTask] = await pool.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id],
        );
        return updatedTask[0];
    }

    async deleteTask(id, userId) {
        const [result] = await pool.query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [id, userId],
        );

        return result.affectedRows > 0;
    }

    async toggleTaskCompletion(id, userId) {
        const [result] = await pool.query(
            'UPDATE tasks SET is_completed = IF(is_completed = 1, 0, 1), updated_at = NOW() WHERE id = ? AND user_id = ?',
            [id, userId],
        );

        if (result.affectedRows === 0) {
            return null;
        }

        const [updatedTask] = await pool.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id],
        );
        return updatedTask[0];
    }
}

module.exports = new Task();
