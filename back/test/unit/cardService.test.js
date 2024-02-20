const storageConnector = new (require('../../src/application/connectors/StorageConnector'));
const CardServiceClass = require('../../src/domain/services/CardService').CardService;
const CardService = new CardServiceClass({ storageConnector });
const Card = require('../../src/domain/entities/Card');
const CardUserData = require('../../src/domain/entities/CardUserData');
const Category = require("../../src/domain/entities/Category");
const ServiceError = require("../../src/domain/services/errors/ServiceError");
const crypto = require("crypto");
const moment = require("moment");

const generateCards = (amount) => {
    const cards = [];
    for (let i = 0; i < amount; i++) {
        cards.push(new Card(i, 'How are you ?', 'I am fine'));
    }
    return cards;
}

describe('Card Service test', () => {
    beforeEach(() => {
        jest.spyOn(storageConnector, "addCard").mockImplementation((card) => new Card(crypto.randomUUID(), card.question, card.answer, card.tag));
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should return empty array', () => {
        jest.spyOn(storageConnector, "getCards").mockReturnValue([]);

        const cards = CardService.getCards();
        expect(cards).toBeInstanceOf(Array);
        expect(cards).toHaveLength(0);
    });

    it('should return array with one card', () => {
        jest.spyOn(storageConnector, "getCards").mockReturnValue(generateCards(1));

        const cards = CardService.getCards();
        expect(cards).toBeInstanceOf(Array);
        expect(cards).toHaveLength(1);
    });

    it('should return array with two cards', () => {
        jest.spyOn(storageConnector, "getCards").mockReturnValue(generateCards(2));

        const cards = CardService.getCards();
        expect(cards).toBeInstanceOf(Array);
        expect(cards).toHaveLength(2);
    });

    it('should return array with cards corresponding to tag', () => {
        const cards = [
            new Card(1, 'How are you ?', 'I am fine', 'Test'),
            new Card(2, 'How are you ?', 'I am fine', 'Test'),
            new Card(3, 'How are you ?', 'I am fine', 'Test2'),
        ];
        jest.spyOn(storageConnector, "getCards").mockReturnValue(cards);

        const cardsWithTag = CardService.getCards(['Test']);
        expect(cardsWithTag).toBeInstanceOf(Array);
        expect(cardsWithTag).toHaveLength(2);
        expect(cardsWithTag[0].tag).toBe('Test');
        expect(cardsWithTag[1].tag).toBe('Test');
    });

    it('should return array with cards corresponding to multiple tags', () => {
        const cards = [
            new Card('1', 'How are you ?', 'I am fine', 'Test'),
            new Card('2', 'How are you ?', 'I am fine', 'Test'),
            new Card('3', 'How are you ?', 'I am fine', 'Test2'),
            new Card('4', 'How are you ?', 'I am fine', 'Test3'),
        ];
        jest.spyOn(storageConnector, "getCards").mockReturnValue(cards);

        const cardsWithTag = CardService.getCards(['Test', 'Test2']);
        expect(cardsWithTag).toBeInstanceOf(Array);
        expect(cardsWithTag).toHaveLength(3);
        expect(cardsWithTag[0].tag).toBe('Test');
        expect(cardsWithTag[1].tag).toBe('Test');
        expect(cardsWithTag[2].tag).toBe('Test2');
    });

    it('should create a card without tag', () => {
        const cardUserData = new CardUserData('What is the TDD ?', 'Test Driven development')
        const createdCard = CardService.addCard(cardUserData);

        expect(createdCard).toBeInstanceOf(Card);
        expect(typeof createdCard.id).toBe('string')
        expect(createdCard.category).toBe(Category.FIRST)
    });

    it('should create a card with a tag', () => {
        const cardUserData = new CardUserData('What is the TDD ?', 'Test Driven development', 'Test');
        const createdCard = CardService.addCard(cardUserData);

        expect(createdCard).toBeInstanceOf(Card);
        expect(typeof createdCard.id).toBe('string');
        expect(createdCard.category).toBe(Category.FIRST);
        expect(createdCard.tag).toBe('Test');
    });

    it('create should throw an error', () => {
        expect(() => CardService.addCard('dummy data')).toThrowError(ServiceError);
    });

    it('answerCard should update category and lastAnsweredDate', () => {
        const yesterday = moment().subtract(1, 'days').toDate();
        const today = moment().toDate();

        const card = new Card('1', 'How are you ?', 'I am fine', 'Test', Category.FIRST, yesterday);
        jest.spyOn(storageConnector, "getCards").mockReturnValue([card]);

        const updatedCard = CardService.answerCard(card, true);

        expect(updatedCard).toBeInstanceOf(Card);
        expect(updatedCard.category).toBe(Category.SECOND);
        expect(updatedCard.lastAnsweredDate.getDate()).toBe(today.getDate());
    });

    it('answerCard should update category to FIRST and lastAnsweredDate', () => {
        const twoDaysBefore = moment().subtract(2, 'days').toDate();
        const today = moment().toDate();

        const card = new Card('1', 'How are you ?', 'I am fine', 'Test', Category.SECOND, twoDaysBefore);
        jest.spyOn(storageConnector, "getCards").mockReturnValue([card]);

        const updatedCard = CardService.answerCard(card, false);

        expect(updatedCard).toBeInstanceOf(Card);
        expect(updatedCard.category).toBe(Category.FIRST);
        expect(updatedCard.lastAnsweredDate.getDate()).toBe(today.getDate());
    });
});