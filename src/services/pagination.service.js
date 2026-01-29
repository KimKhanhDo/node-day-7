class PaginationService {
    apply(service) {
        // ← service = postServiceInstance được truyền vào
        if (!service.model) {
            throw Error('Model is required for pagination');
        }

        // Gán method VÀO instance (not prototype!)
        // ← [4] Inject method pagination vào service object
        service.pagination = async (page, limit, filters) => {
            const offset = (page - 1) * limit;

            const rows = await service.model.getAllPosts(
                limit,
                offset,
                filters,
            );
            const total = await service.model.getTotalCount();

            const pagination = {
                current_page: page,
                total,
                per_page: limit,
            };

            // Chỉ thêm from/to nếu có data
            if (rows.length) {
                pagination.from = offset + 1;
                pagination.to = offset + rows.length;
            }

            return {
                rows,
                pagination,
            };
        };
    }
}

module.exports = new PaginationService();
