const CardUserData = require('../../domain/entities/CardUserData');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

module.exports = (data) => {
    if (!data.question || typeof data.question !== 'string') {
        throw new UnprocessableEntityError('Question is required and must be a string')
    }
    if (!data.answer || typeof data.answer !== 'string') {
        throw new UnprocessableEntityError('Answer is required and must be a string')
    }
    if (data.tag && typeof data.tag !== 'string') {
        throw new UnprocessableEntityError('Tag must be a string or null')
    }
    return new CardUserData(data.question, data.answer, data.tag ?? null)
}