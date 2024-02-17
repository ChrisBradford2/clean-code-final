const {cards, users} = require('../../storage/storage');

module.exports = class StorageConnector {
    getCards() {
        return cards;
    }
}