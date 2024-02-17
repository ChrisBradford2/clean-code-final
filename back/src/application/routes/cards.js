const {Router} = require("express");
const {cardServiceContainer} = require("../../domain/services/CardService");

module.exports = () => {
    const router = new Router();

    router.get("/", (req, res) => {
        const CardService = req.container.resolve(cardServiceContainer);
        res.json(CardService.getCards());
    });

    return router;
};