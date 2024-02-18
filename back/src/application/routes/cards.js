const {Router} = require("express");
const {cardServiceContainer} = require("../../domain/services/CardService");
const postCardRequest = require('../adapters/postCardRequest')
const postCardResponse = require('../adapters/postCardResponse')
const getCardResponse = require('../adapters/getCardResponse')

module.exports = () => {
    const router = new Router();

    router.get("/", (req, res) => {
        const CardService = req.container.resolve(cardServiceContainer);
        const cards = CardService.getCards();
        res.json(getCardResponse(cards));
    });

    router.post("/", (req, res) => {
        const CardService = req.container.resolve(cardServiceContainer);
        const cardUserData = postCardRequest(req.body);
        const createdCard = CardService.addCard(cardUserData);
        res.status(201).json(postCardResponse(createdCard));
    });

    return router;
};