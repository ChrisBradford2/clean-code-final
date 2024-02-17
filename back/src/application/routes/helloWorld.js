const {Router} = require("express");

module.exports = () => {
    const router = new Router();

    router.get('/', (req, res) => {
        res.send('Hello World! :)');
    });

    return router;
};