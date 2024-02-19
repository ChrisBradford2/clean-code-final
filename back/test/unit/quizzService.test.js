const storageConnector = new (require('../../src/application/connectors/StorageConnector'));
const Card = require('../../src/domain/entities/Card');
const {QuizzService: QuizzServiceClass} = require("../../src/domain/services/QuizzService");
const QuizzService = new QuizzServiceClass({ storageConnector });
const Category = require('../../src/domain/entities/Category');

const generateCards = (amount) => {
    const cards = [];
    for (let i = 0; i < amount; i++) {
        cards.push(new Card(i, 'How are you ?', 'I am fine'));
    }
    return cards;
}

describe('Quizz Service test', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should return empty array', () => {
        jest.spyOn(storageConnector, "getCards").mockReturnValue([]);

        const cards = QuizzService.getQuizz();
        expect(cards).toBeInstanceOf(Array);
        expect(cards).toHaveLength(0);
    });

    it('should return array with one card', () => {
        jest.spyOn(storageConnector, "getCards").mockReturnValue(generateCards(1));

        const cards = QuizzService.getQuizz();
        expect(cards).toBeInstanceOf(Array);
        expect(cards).toHaveLength(1);
    });

    it('should return array with two cards', () => {
        jest.spyOn(storageConnector, "getCards").mockReturnValue(generateCards(2));

        const cards = QuizzService.getQuizz();
        expect(cards).toBeInstanceOf(Array);
        expect(cards).toHaveLength(2);
    });

    it('should return cards never answered', () => {
        const today = new Date('2021-01-01');

        jest.spyOn(storageConnector, "getCards").mockReturnValue([
            new Card('1', 'How are you ?', 'I am fine'),
        ]);

        const cards = QuizzService.getQuizz(today);
        expect(cards).toBeInstanceOf(Array);
        expect(cards).toHaveLength(1);
    });

    it('should return cards of category FIRST', () => {
        const yesterday = new Date('2021-01-01');
        const today = new Date('2021-01-02');

        jest.spyOn(storageConnector, "getCards").mockReturnValue([
            new Card('1', 'How are you ?', 'I am fine', null, Category.FIRST, yesterday),
        ]);

        const cards = QuizzService.getQuizz(today);
        expect(cards).toBeInstanceOf(Array);
        expect(cards).toHaveLength(1);
    });
});