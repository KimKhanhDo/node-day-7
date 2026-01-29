const pool = require('@/config/database');

class RevokedToken {
    // Thêm token vào blacklist
    async addToBlacklist(token, expiresAt) {
        const [result] = await pool.query(
            'INSERT INTO revoked_tokens (token, expires_at) VALUES (?, ?)',
            [token, new Date(expiresAt * 1000)], // Convert timestamp to Date
        );

        return result.affectedRows > 0;
    }

    // Kiểm tra token có trong blacklist không
    async isRevoked(token) {
        const [rows] = await pool.query(
            'SELECT id FROM revoked_tokens WHERE token = ? LIMIT 1',
            [token],
        );

        return rows.length > 0;
    }

    // Xóa các token đã hết hạn
    async cleanupExpiredTokens() {
        const [result] = await pool.query(
            'DELETE FROM revoked_tokens WHERE expires_at < NOW()',
        );

        return result.affectedRows;
    }
}

module.exports = new RevokedToken();
