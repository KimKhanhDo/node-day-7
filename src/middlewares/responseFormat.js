const { HTTP_STATUS } = require('@/config/constant');

const response = (_, res, next) => {
    // Thêm method success & error vào res
    res.success = (data, status = HTTP_STATUS.OK, passProps = {}) => {
        res.status(status).json({
            status: 'success',
            data,
            ...passProps,
        });
    };

    res.paginate = ({ rows, pagination }) => {
        res.success(rows, HTTP_STATUS.OK, { pagination });
    };

    res.error = (
        status = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message,
        error = null,
    ) => {
        res.status(status).json({
            status: 'error',
            message,
            error,
        });
    };

    next(); // ← Cho phép request đi tiếp
};

module.exports = response;
