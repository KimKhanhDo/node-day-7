const jwt = require('jsonwebtoken');

const userModel = require('@/models/user.model');
const strings = require('@/utils/string');
const {
    ACCESS_TOKEN_TTL_SECONDS,
    REFRESH_TOKEN_TTL_DAYS,
} = require('@/config/constant');

class AuthService {
    // Tạo access token (login, refresh, verify email)
    createAccessToken(user, secret) {
        // Payload chứa sub (userId) và exp (expiration timestamp)
        const payload = {
            sub: user.id,
            exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_TTL_SECONDS,
        };

        const token = jwt.sign(payload, secret);
        return token;
    }

    // Tạo access + refresh token pair (login & refresh)
    async issueTokenPair(user, secret) {
        const accessToken = this.createAccessToken(user, secret);
        const refreshToken = strings.createRandomString(32);
        const refreshTtl =
            Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000; // 7 ngày

        // Lưu refresh token vào DB
        await userModel.updateRefreshToken(user.id, refreshToken, refreshTtl);

        return {
            access_token: accessToken,
            access_token_ttl: ACCESS_TOKEN_TTL_SECONDS,
            refresh_token: refreshToken,
            refresh_token_ttl: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60, // 604800s (7d)
        };
    }
}

module.exports = new AuthService();
