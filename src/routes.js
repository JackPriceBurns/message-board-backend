const app = resolve('app');
const api = require('../routes/api');

module.exports = () => {
    app.get('/', (request, response) => response.json({
        api: 'Message Board API'
    }));

    api();
};
