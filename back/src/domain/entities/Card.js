const Category = require('./Category');

class Card {
    constructor(id, question, answer, category = Category.FIRST, tag = null) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.tag = tag;
    }
}

module.exports = Card;