class CardService {
    constructor({ storageConnector }) {
        this.storageConnector = storageConnector;
    }

    getCards() {
        return this.storageConnector.getCards();
    }
}

module.exports = {
    CardService,
    cardServiceContainer: "cardService"
}