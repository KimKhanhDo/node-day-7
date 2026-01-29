const jwt = require('jsonwebtoken');

const { authSecret } = require('@/config/jwt');
const { HTTP_STATUS, ERROR_MESSAGES } = require('@/config/constant');
const userModel = require('@/models/user.model');
const revokedTokenModel = require('@/models/revokedToken.model');

const authRequired = async (req, res, next) => {
    try {
        // 1. Check authorization header exists
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED,
            );
        }

        // 2. Check format "Bearer <token>"
        if (!authHeader.startsWith('Bearer ')) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED,
            );
        }

        // 3. Extract token
        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED,
            );
        }

        // 4. Verify token (tự động check expiration)
        // Nếu token hết hạn → Tự động throw error
        const payload = jwt.verify(accessToken, authSecret);

        // 5. Check token có trong blacklist không
        const isRevoked = await revokedTokenModel.isRevoked(accessToken);
        if (isRevoked) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.TOKEN_REVOKED,
            );
        }

        // 6. Lấy user từ DB
        const currentUser = await userModel.getUserById(payload.sub);

        if (!currentUser) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED,
            );
        }

        // 7. Attach object user to request
        req.user = currentUser; // ← Controller sẽ dùng thông tin này
        req.token = accessToken; // Lưu token để dùng trong logout

        // 8. Continue
        next();
    } catch (error) {
        // 7. Forward error to exceptionHandler
        next(error);
        //   ^^^^^
        //   Pass error object to next middleware
    }
};

module.exports = authRequired;
