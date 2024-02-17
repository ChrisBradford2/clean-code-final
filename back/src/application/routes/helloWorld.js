const {Router} = require("express");

const ForbiddenError = require("../errors/ForbiddenError");

module.exports = () => {
    const router = new Router();

    router.get('/', (req, res) => {
        throw new ForbiddenError('You are not allowed to access this resource');
        res.send('Hello World! :)');
    });

    return router;
};