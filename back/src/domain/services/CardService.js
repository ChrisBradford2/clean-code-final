const CardUserData = require("../entities/CardUserData");
const Card = require("../entities/Card");
const ServiceError = require('./errors/ServiceError');
const crypto = require('crypto');

class CardService {
    constructor({ storageConnector }) {
        this.storageConnector = storageConnector;
    }

    getCards(tags = null) {
        return tags?.length > 0 ? this.storageConnector.findCardsByTags(tags) : this.storageConnector.getCards();
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