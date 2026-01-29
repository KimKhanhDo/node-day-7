const postModel = require('@/models/task.model');
const paginationService = require('./pagination.service');

class PostService {
    model = postModel; // ← [1] Gán model vào property

    // pagination được inject TRONG constructor
    constructor() {
        paginationService.apply(this); // ← [2] Gọi apply và pass `this`
    }
}

module.exports = new PostService(); // ← [3] Export instance
