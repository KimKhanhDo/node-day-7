const { HTTP_STATUS, ERROR_MESSAGES } = require('@/config/constant');
const taskModel = require('@/models/task.model');

// GET /api/tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.success(tasks);
    } catch (error) {
        res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.DATABASE_ERROR,
            error,
        );
    }
};

// GET /api/tasks/:id
const getTaskById = async (req, res) => {
    try {
        const id = +req.params.id;
        const task = await taskModel.getTaskById(id);

        if (!task) {
            return res.error(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.TASK_NOT_FOUND,
            );
        }

        res.success(task);
    } catch (error) {
        res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.DATABASE_ERROR,
            error,
        );
    }
};

// POST /api/tasks
// Tạo task mới
// - Success: 201 với { status: "success", data: task }
// - Error: Chuyển exception cho errorHandler middleware để xử lý tập trung
const createTask = async (req, res, next) => {
    try {
        const task = await taskModel.createNewTask({
            title: req.body.title,
            is_completed: req.body.is_completed || 0, // Mặc định chưa hoàn thành
            user_id: req.user.id, // lấy từ middleware authRequired
        });

        res.success(task, HTTP_STATUS.CREATED);
    } catch (error) {
        // Chuyển error cho errorHandler middleware (4 params)
        // Express sẽ SKIP notFound middleware và nhảy thẳng đến errorHandler
        next(error);
    }
};

// PUT /api/tasks/:id
// PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {
        const id = +req.params.id;

        // Lấy task hiện tại để giữ giá trị cũ
        const currentTask = await taskModel.getTaskById(id, req.user.id);

        if (!currentTask) {
            return res.error(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.TASK_NOT_FOUND,
            );
        }

        // Merge: Dùng giá trị mới nếu có, giữ giá trị cũ nếu không
        const updatedTask = await taskModel.updateTask(
            id,
            {
                title:
                    req.body.title !== undefined
                        ? req.body.title
                        : currentTask.title,
                is_completed:
                    req.body.is_completed !== undefined
                        ? req.body.is_completed
                        : currentTask.is_completed,
            },
            req.user.id,
        );

        res.success(updatedTask);
    } catch (error) {
        res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.TASK_UPDATE_FAILED,
            error,
        );
    }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const id = +req.params.id;
        const deleted = await taskModel.deleteTask(id, req.user.id);

        if (!deleted) {
            return res.error(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.TASK_NOT_FOUND,
            );
        }

        // 204 No Content (không body)
        res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
        res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.TASK_DELETE_FAILED,
            error,
        );
    }
};

// PATCH /api/tasks/:id/toggle
// Toggle trạng thái hoàn thành của task
const toggleTaskCompletion = async (req, res) => {
    try {
        const id = +req.params.id;
        const updatedTask = await taskModel.toggleTaskCompletion(
            id,
            req.user.id,
        );

        if (!updatedTask) {
            return res.error(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.TASK_NOT_FOUND,
            );
        }

        res.success(updatedTask);
    } catch (error) {
        res.error(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.TASK_UPDATE_FAILED,
            error,
        );
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
};
