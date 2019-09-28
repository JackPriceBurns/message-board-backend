module.exports = callback => {
    return async (request, response) => {
        try {
            return await callback(request, response);
        } catch (error) {
            // If app is in debug, throw the entire error.
            if (process.env.APP_DEBUG) {
                response.status(500);

                response.json({
                    message: error.message,
                    stack: error.stack,
                });

                return;
            }

            // Catch any exceptions we want to handle ourselves.
            if (error.message === 'ResourceNotFound') {
                response.status(404);
                response.json({message: 'The requested resource was not found.'});

                return;
            }

            throw error;
        }
    };
};
