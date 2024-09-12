const logger = require('./logger');

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown Endpoint' })
}; 


module.exports = { unknownEndpoint };
