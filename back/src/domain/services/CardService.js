const CardUserData = require("../entities/CardUserData");
const Card = require("../entities/Card");
const Category = require("../entities/Category");
const ServiceError = require('./errors/ServiceError');
const crypto = require('crypto');

class CardService {
    constructor({ storageConnector }) {
        this.storageConnector = storageConnector;
    }

    getCards() {
        return this.storageConnector.getCards();
    }

    addCard(cardData) {
        if (!(cardData instanceof CardUserData)) {
            throw new ServiceError('Card must be a CardUserData entity');
        }
        const newCard = new Card(crypto.randomUUID(), cardData.question, cardData.answer, cardData.tag);
        return this.storageConnector.addCard(newCard);
    }
}

module.exports = {
    CardService,
    cardServiceContainer: "cardService"
}