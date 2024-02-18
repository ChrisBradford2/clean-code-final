const {cards, users} = require('../../storage/storage');
const Card = require("../../domain/entities/Card");
const IncompatibleData = require("./errors/IncompatibleData");

module.exports = class StorageConnector {
    addCard(card) {
        if (!(card instanceof Card)) {
            throw new IncompatibleData("Card instance expected");
        }

        cards.push(card);

        return card;
    }

    getCards() {
        return cards;
    }
}