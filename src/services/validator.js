const {Validator} = require('node-input-validator');

module.exports = {
    async validate(input, rules) {
        let validator = new Validator(input, rules);

        let success = await validator.check();

        if (!success) {
            let error = new Error('ValidationError');

            error.validationErrors = validator.errors;

            throw error;
        }
    },
};
