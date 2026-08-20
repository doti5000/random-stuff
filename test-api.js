require('dotenv').config();
const handler = require('./api/domain-stats.js');

const req = {
    method: 'GET',
    query: {
        url: 'http://example.com'
    }
};

const res = {
    setHeader: () => {},
    status: function(code) {
        this.statusCode = code;
        return this;
    },
    json: function(data) {
        console.log('Status:', this.statusCode);
        console.log('Response:', data);
    },
    end: () => {
        console.log('Status:', this.statusCode);
        console.log('Response Ended');
    }
};

handler(req, res).then(() => {
    console.log('Handler finished');
}).catch(err => {
    console.error('Handler error:', err);
});
