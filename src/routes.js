const api = require('../routes/api');
const guest = require('../routes/guest');

module.exports = () => {
    guest();
    api();
};
