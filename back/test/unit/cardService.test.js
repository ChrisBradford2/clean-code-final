const storageConnector = new (require('../../src/application/connectors/StorageConnector'));
const CardServiceClass = require('../../src/domain/services/CardService').CardService;
const CardService = new CardServiceClass({ storageConnector });
const Card = require('../../src/domain/entities/Card');
const CardUserData = require('../../src/domain/entities/CardUserData');
const Category = require("../../src/domain/entities/Category");
const ServiceError = require("../../src/domain/services/errors/ServiceError");

const generateCards = (amount) => {
    const cards = [];
    for (let i = 0; i < amount; i++) {
        cards.push(new Card(i, 'How are you ?', 'I am fine'));
    }
    return cards;
}

describe('Card Service test', () => {
    beforeEach(() => {
        jest.spyOn(storageConnector, "addCard").mockImplementation((card) => card);
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
});