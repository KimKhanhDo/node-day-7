// Token sử dụng với mục đích khác nhau thì secret phải khác nhau
const jwt = {
    authSecret: process.env.AUTH_JWT_SECRET,
    verifyEmailSecret: process.env.VERIFY_EMAIL_JWT_SECRET,
};

module.exports = jwt;
