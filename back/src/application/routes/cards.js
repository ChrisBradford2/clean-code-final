const {Router} = require("express");
const {cardServiceContainer} = require("../../domain/services/CardService");
const postCardRequest = require('../adapters/postCardRequest')
const postCardResponse = require('../adapters/postCardResponse')

module.exports = () => {
    const router = new Router();

    router.get("/", (req, res) => {
        const CardService = req.container.resolve(cardServiceContainer);
        res.json(CardService.getCards());
    });

    router.post("/", (req, res) => {
        const CardService = req.container.resolve(cardServiceContainer);
        const cardUserData = postCardRequest(req.body);
        const createdCard = CardService.addCard(cardUserData);
        res.status(201).json(postCardResponse(createdCard));
    });

    return router;
};