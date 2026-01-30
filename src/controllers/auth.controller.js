const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    BCRYPT_SALT_ROUNDS,
    HTTP_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} = require('@/config/constant');
const userModel = require('@/models/user.model');
const revokedTokenModel = require('@/models/revokedToken.model');
const authService = require('@/services/auth.service');
const { authSecret, verifyEmailSecret } = require('@/config/jwt');
const queuesService = require('@/services/queues.service');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        const user = await userModel.createNewUser(name, email, hash);
        if (!user) {
            return res.error(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                ERROR_MESSAGES.REGISTER_FAIL,
            );
        }

        const newUser = {
            id: user.id,
            name,
            email,
        };

        // TODO: Gửi verify email
        // await emailService.sendVerifyEmail(newUser);

        // TODO: queues: id, type, payload, status = pending/ inProgress/ completed/ failed, created_at, updated_at
        queuesService.push({
            type: 'sendVerifyEmail',
            payload: newUser,
        });

        res.success(newUser, HTTP_STATUS.CREATED);
    } catch (error) {
        console.error('Register error:', error);

        if (String(error).includes('Duplicate')) {
            return res.error(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.EMAIL_EXITS);
        } else {
            throw error;
        }
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Validate input
        if (!email || !password) {
            return res.error(
                HTTP_STATUS.BAD_REQUEST,
                ERROR_MESSAGES.BAD_REQUEST,
            );
        }

        // Get user
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED,
            );
        }

        // if (!user.verified_at) {
        // throw error
        // }

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            verified_at: user.verified_at,
        };

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED,
            );
        }

        // Tạo cả access + refresh token pair
        const responseTokens = await authService.issueTokenPair(
            user,
            authSecret,
        );
        res.success(userInfo, HTTP_STATUS.OK, responseTokens);
    } catch (error) {
        console.error('Register error:', error);
        return res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_ERROR,
            error,
        );
    }
};

// Đăng xuất bằng cách thêm access token vào blacklist
const logout = async (req, res) => {
    try {
        // 1. Lấy access token từ middleware
        const accessToken = req.token;

        // 2. Decode token để lấy thời gian hết hạn
        const decoded = jwt.decode(accessToken);

        // 3. Kiểm tra token có hợp lệ không
        if (!decoded || !decoded.exp) {
            return res.error(
                HTTP_STATUS.BAD_REQUEST,
                ERROR_MESSAGES.BAD_REQUEST,
            );
        }

        // 4. Thêm token vào blacklist
        await revokedTokenModel.addToBlacklist(accessToken, decoded.exp);

        res.success(
            { message: SUCCESS_MESSAGES.LOGOUT_SUCCESS },
            HTTP_STATUS.OK,
        );
    } catch (error) {
        console.error('Logout error:', error);
        return res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_ERROR,
            error,
        );
    }
};

// Dùng middleware k.tra trước khi getCurrentUser
const getCurrentUser = async (req, res) => {
    // req.user.is_verified = !!req.user.verified_at;
    // delete req.user.verified_at;
    res.success(req.user);
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refresh_token;
        if (!refreshToken) {
            return res.error(
                HTTP_STATUS.BAD_REQUEST,
                'Refresh token is required',
            );
        }

        const user = await userModel.getUserByRefreshToken(refreshToken);

        if (!user) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED,
            );
        }

        // Tạo cả access + refresh token pair mới
        const responseTokens = await authService.issueTokenPair(
            user,
            authSecret,
        );
        res.success(responseTokens, HTTP_STATUS.OK);
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_ERROR,
            error,
        );
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;

        // jwt.verify tự động check expiration, throw error nếu expired/invalid
        const payload = jwt.verify(token, verifyEmailSecret);

        const userId = payload.sub;
        const user = await userModel.getUserById(userId);

        if (user.verified_at) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                'Verification token has expired',
            );
        }

        const isVerified = await userModel.verifyEmail(userId);

        if (!isVerified) {
            return res.error(
                HTTP_STATUS.BAD_REQUEST,
                'User not found or already verified',
            );
        }

        return res.success({
            verified: true,
            message: 'Email verified successfully',
        });
    } catch (error) {
        console.error('Verify email error:', error);

        return res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_ERROR,
        );
    }
};

const resendVerifiedEmail = async (req, res) => {
    if (req.user.verified_at) {
        return res.error(HTTP_STATUS.BAD_REQUEST, 'Account is verified');
    }

    // await emailService.sendVerifyEmail(req.user);

    // TODO: queues: id, type, payload, status = pending/ inProgress/ completed/ failed, created_at, updated_at
    queuesService.push({
        type: 'sendVerifyEmail',
        payload: {
            id: req.user.id,
            email: req.user.email,
        },
    });

    res.success(
        { message: 'Resend verify email successfully' },
        HTTP_STATUS.CREATED,
    );
};

const changePassword = async (req, res) => {
    try {
        const { password, newPassword, confirmedNewPassword } = req.body;

        // 1. Validate input
        if (!password || !newPassword || !confirmedNewPassword) {
            return res.error(
                HTTP_STATUS.BAD_REQUEST,
                'All fields are required',
            );
        }

        // 2. Kiểm tra mật khẩu cũ có đúng không
        const isValidPassword = await bcrypt.compare(
            password,
            req.user.password,
        );
        if (!isValidPassword) {
            return res.error(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED,
            );
        }

        // 3. Kiểm tra mật khẩu mới và confirm có khớp không
        if (newPassword !== confirmedNewPassword) {
            return res.error(
                HTTP_STATUS.BAD_REQUEST,
                'New password and confirmation do not match',
            );
        }

        // 4. Kiểm tra mật khẩu mới không được giống mật khẩu cũ
        const isSameAsOld = await bcrypt.compare(
            newPassword,
            req.user.password,
        );
        if (isSameAsOld) {
            return res.error(
                HTTP_STATUS.BAD_REQUEST,
                'New password must be different from current password',
            );
        }

        // 5. Hash mật khẩu mới
        const hashedPassword = await bcrypt.hash(
            newPassword,
            BCRYPT_SALT_ROUNDS,
        );

        // 6. Update vào database
        const updated = await userModel.updatePassword(
            req.user.id,
            hashedPassword,
        );
        if (!updated) {
            return res.error(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                'Failed to update password',
            );
        }

        // Push job gửi email vào queue
        queuesService.push({
            type: 'sendPasswordChangeEmail',
            payload: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                changedAt: new Date().toISOString(),
            },
        });

        return res.success(
            { message: 'Password updated successfully' },
            HTTP_STATUS.OK,
        );
    } catch (error) {
        console.error('Change password error:', error);
        return res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_ERROR,
            error,
        );
    }
};

module.exports = {
    register,
    login,
    logout,
    getCurrentUser,
    refreshToken,
    verifyEmail,
    resendVerifiedEmail,
    changePassword,
};
