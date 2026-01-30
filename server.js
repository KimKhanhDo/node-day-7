require('module-alias/register');
require('dotenv').config();
const cors = require('cors');
const express = require('express');

require('@/config/database');
const appRoute = require('@/routes');
const response = require('@/middlewares/responseFormat');
const notFoundHandler = require('@/middlewares/notFoundHandler');
const exceptionHandler = require('@/middlewares/exceptionHandler');
const { DEFAULT_PORT } = require('@/config/constant');

const app = express();
const port = DEFAULT_PORT;

const ALLOWED_ORIGIN = process.env.CLIENT_URL || '*';

// CORS configuration - cho phép request từ frontend domains
const corsOptions = {
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // Status code cho preflight request
};

app.use(express.json()); // [1] Parse JSON body
app.use(cors(corsOptions)); // áp dụng CORS config
app.use(response); // [2] Thêm res.success() & res.error()
app.use('/api', appRoute); // [3] Xử lý routes
app.use(notFoundHandler); // [4] Bắt 404 - không tìm thấy route
app.use(exceptionHandler); // [5] Bắt lỗi exception

app.listen(port, () => {
    console.log('Running on localhost: ' + port);
});
