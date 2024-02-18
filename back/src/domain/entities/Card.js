const Category = require('./Category');

class Card {
    constructor(id, question, answer, tag = null, category = Category.FIRST) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.tag = tag;
    }
}

module.exports = Card;