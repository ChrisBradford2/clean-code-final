const CategoryFrequency = require('../entities/CategoryFrequency');
const Category = require('../entities/Category');
const moment = require("moment");

class QuizzService {
    constructor({storageConnector}) {
        this.storageConnector = storageConnector;
    }

    getQuizz(date) {
        let cards = this.storageConnector.getCards();

        cards = cards.filter(card => {
            if (!card.lastAnsweredDate) {
                return true;
            }

            const daysToAdd = CategoryFrequency[card.category];
            const nextDateToAnswer = moment(card.lastAnsweredDate).add(daysToAdd, 'days');


            if (
                card.category === Category.FIRST &&
                nextDateToAnswer.isSameOrBefore(date)
            ) {
                return true;
            }

            if (
                card.category === Category.SECOND &&
                nextDateToAnswer.isSameOrBefore(date)
            ) {
                return true;
            }

            return false;
        });

        return cards;
    }
}

module.exports = {
    QuizzService,
    quizzServiceContainer: "quizzService"
}