module.exports = {
    // Server
    DEFAULT_PORT: 3000,

    // Pagination
    DEFAULT_PAGE_SIZE: 20,

    // Authentication
    BCRYPT_SALT_ROUNDS: 10,
    // ACCESS_TOKEN_TTL_SECONDS: 3600, // 1 giờ = 60 * 60
    ACCESS_TOKEN_TTL_SECONDS: 12 * 60 * 60, // 12 giờ (43200s)
    REFRESH_TOKEN_TTL_DAYS: 7, // 7 ngày

    // Database
    DB_CONNECTION_LIMIT: 10,
    DB_MAX_IDLE: 10,
    DB_IDLE_TIMEOUT_MS: 60000,

    // Error Messages
    ERROR_MESSAGES: {
        // General
        BAD_REQUEST: 'Bad request',
        UNAUTHORIZED: 'Unauthorized user',
        NOT_FOUND: 'Not found',
        INVALID_JSON: 'Invalid JSON format',
        DATABASE_ERROR: 'Database operation failed',
        INTERNAL_ERROR: 'Internal server error',

        // Auth
        REGISTER_FAIL: 'Failed to register new user',
        EMAIL_EXITS: 'Email already exists',
        INVALID_CREDENTIALS: 'Invalid credentials',
        INVALID_TOKEN: 'Invalid token',
        TOKEN_REVOKED: 'Token has been revoked',

        // Tasks
        TASK_NOT_FOUND: 'Task not found',
        TASK_TITLE_REQUIRED: 'Task title is required',
        TASK_CREATE_FAILED: 'Failed to create task',
        TASK_UPDATE_FAILED: 'Failed to update task',
        TASK_DELETE_FAILED: 'Failed to delete task',
        INVALID_TASK_ID: 'Invalid task ID',
    },

    // Success Messages
    SUCCESS_MESSAGES: {
        // Auth
        REGISTER_SUCCESS: 'User registered successfully',
        LOGIN_SUCCESS: 'Login successful',
        LOGOUT_SUCCESS: 'Logged out successfully',
        TOKEN_REFRESHED: 'Token refreshed successfully',

        // Tasks
        TASK_CREATED: 'Task created successfully',
        TASK_UPDATED: 'Task updated successfully',
        TASK_DELETED: 'Task deleted successfully',
        TASK_TOGGLED: 'Task status updated successfully',

        // General
        OPERATION_SUCCESS: 'Operation completed successfully',
    },

    // HTTP Status Codes
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        CONFLICT: 409,
        UNPROCESSABLE_ENTITY: 422,
        INTERNAL_SERVER_ERROR: 500,
    },

    QUEUE_STATUS: {
        PENDING: 'Pending',
        IN_PROGRESS: 'inprogress',
        COMPLETED: 'completed',
        FAILED: 'failed',
    },
};
