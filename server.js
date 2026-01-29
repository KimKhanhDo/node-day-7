require('module-alias/register');
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const appRoute = require('@/routes');
const response = require('@/middlewares/responseFormat');
const notFoundHandler = require('@/middlewares/notFoundHandler');
const exceptionHandler = require('@/middlewares/exceptionHandler');
const { DEFAULT_PORT } = require('@/config/constant');

const app = express();
const port = DEFAULT_PORT;

app.use(express.json()); // [1] Parse JSON body
app.use(
    cors({
        origin: 'http://localhost:5173', // Vite default port
        credentials: true,
    }),
);
app.use(response); // [2] Thêm res.success() & res.error()
app.use('/api', appRoute); // [3] Xử lý routes
app.use(notFoundHandler); // [4] Bắt 404 - không tìm thấy route
app.use(exceptionHandler); // [5] Bắt lỗi exception

app.listen(port, () => {
    console.log('Running on localhost: ' + port);
});
