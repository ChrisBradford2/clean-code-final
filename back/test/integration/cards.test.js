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

    it('GET should return cards with provided tag', async () => {
        const response = await request(app)
            .get('/cards?tags[0]=Test')
            .set('content-type', 'application/json')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].tag).toBe('Test');
        expect(response.body[1].tag).toBe('Test');
    });

    it('POST should return created card', async () => {
        const payload = {
            question: 'What is testing ?',
            answer: 'A way to insure your app stability',
            tag: 'Test',
        };

        const response = await request(app)
            .post('/cards')
            .set('Content-Type', 'application/json')
            .send(payload);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('category');
        expect(response.body).toHaveProperty('question');
        expect(response.body).toHaveProperty('answer');
        expect(response.body).toHaveProperty('tag');
        expect(response.body.question).toBe(payload.question);
        expect(response.body.answer).toBe(payload.answer);
        expect(response.body.tag).toBe(payload.tag);
    });

    it('POST should return 422', async () => {
        const payload = {
            answer: 'A way to insure your app stability',
            tag: 'Test',
        };

        const response = await request(app)
            .post('/cards')
            .set('Content-Type', 'application/json')
            .send(payload);

        expect(response.status).toBe(422);
    });
});
