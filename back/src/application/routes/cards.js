const {Router} = require("express");
const {cardServiceContainer} = require("../../domain/services/CardService");
const postCardRequest = require('../adapters/postCardRequest')
const postCardResponse = require('../adapters/postCardResponse')
const getCardResponse = require('../adapters/getCardResponse')
const getCardRequest = require('../adapters/getCardRequest')

module.exports = () => {
    const router = new Router();

    router.get("/", (req, res) => {
        const CardService = req.container.resolve(cardServiceContainer);
        const request = getCardRequest(req.query);
        const cards = CardService.getCards(request.tags);
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