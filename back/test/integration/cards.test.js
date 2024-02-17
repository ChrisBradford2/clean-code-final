const request = require('supertest');
const app = require('../../server');

const generateCards = (amount) => {
    const Card = require('../../src/domain/entities/Card');
    const cards = [];
    for (let i = 0; i < amount; i++) {
        cards.push(new Card(i, 'How are you ?', 'I am fine'));
    }
    return cards;
};

jest.mock('../../src/storage/storage', () => {
    return {
        cards: generateCards(2),
        users: [],
    };
});

describe('/cards test', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('GET should return array with two cards', async () => {
        const response = await request(app)
            .get('/cards')
            .set('content-type', 'application/json')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('category');
        expect(response.body[0]).toHaveProperty('question');
        expect(response.body[0]).toHaveProperty('answer');
        expect(response.body[0]).toHaveProperty('tag');
    });
});
