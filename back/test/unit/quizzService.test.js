const storageConnector = new (require('../../src/application/connectors/StorageConnector'));
const Card = require('../../src/domain/entities/Card');
const {QuizzService: QuizzServiceClass} = require("../../src/domain/services/QuizzService");
const QuizzService = new QuizzServiceClass({ storageConnector });

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

});