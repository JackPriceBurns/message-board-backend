const config = resolve('config');
const parser = require('stacktrace-parser');

async function handleError(error, response) {
    let errorJson = {};

    // If app is in debug, add extra error information.
    if (config('app.debug')) {
        errorJson = {
            error: error.message,
            stack: parser.parse(error.stack),
        };
    }

    // Catch any exceptions we want to handle ourselves.
    if (error.message === 'ResourceNotFound') {
        return await response.status(404).json({
            message: 'The requested resource was not found.',
            ...errorJson,
        });
    }

    if (error.message === 'ValidationError') {
        return await response.status(422).json({
            message: 'Your request has some validation errors.',
            errors: error.validationErrors,
            ...errorJson,
        });
    }

    if (error.message === 'InvalidLoginDetails') {
        return await response.status(401).json({
            message: 'Invalid login credentials.',
            ...errorJson,
        });
    }

    if (error.message === 'Unauthenticated') {
        return await response.status(401).json({
            message: 'Unauthenticated.',
            ...errorJson,
        });
    }

    if (error.message === 'invalid signature') {
        return await response.status(401).json({
            message: 'Unauthenticated.',
            ...errorJson,
        });
    }

    return await response.status(500).json({
        message: 'Internal Server Error',
        ...errorJson
    });
}

module.exports = {
    /**
     * Create an exception handler wrapper for a controller.
     *
     * @param {Function} controllerMethod
     *
     * @returns {Function}
     */
    handleController(controllerMethod) {
        return async (request, response, ...args) => {
            try {
                return await controllerMethod(request, response, ...args);
            } catch (error) {
                return await handleError(error, response);
            }
        };
    }
};
