const pool = require('@/config/database');

class User {
    async getAllUsers() {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    }

    async getUserById(id) {
        const [rows] = await pool.query(
            'SELECT id, name, email, verified_at, created_at, updated_at FROM users WHERE id = ?',
            [id],
        );

        return rows[0] || null;
    }

    async createNewUser(name, email, password) {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password],
        );

        // Lấy user vừa tạo
        return this.getUserById(result.insertId);
    }

    async getUserByEmail(email) {
        const [result] = await pool.query(
            'SELECT id, name, email, password, verified_at FROM users WHERE email = ?',
            [email],
        );

        return result[0] || null;
    }

    async updateRefreshToken(id, token, ttl) {
        // mysql2 tự động convert Date object sang TIMESTAMP
        const expiresAt = new Date(ttl);

        const [row] = await pool.query(
            'UPDATE users SET refresh_token = ?, refresh_expires_at = ? WHERE id = ?',
            [token, expiresAt, id],
        );

        return row.affectedRows > 0;
    }

    async verifyEmail(id) {
        const [result] = await pool.query(
            'UPDATE users SET verified_at = NOW() WHERE id = ?',
            [id],
        );
        return result.affectedRows > 0;
    }

    async getUserByRefreshToken(token) {
        const query = `
        SELECT id, name, email, refresh_token, refresh_expires_at
        FROM users 
        WHERE refresh_token = ? 
        AND UNIX_TIMESTAMP(refresh_expires_at) >= UNIX_TIMESTAMP()
        LIMIT 1
    `;

        const [rows] = await pool.query(query, [token]);
        return rows[0] || null;
    }
}

module.exports = new User();
