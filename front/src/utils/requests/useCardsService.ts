import useApi from './useApi';
import { CardUserData } from "../types/CardUserData";
import { Card } from "../types/Card";

const buildQueryWithTags = (tags: string[]): string => tags.length ? `?tags=${tags.join(',')}` : '';

const adaptCardData = (card: Card): Card => ({
    id: card.id,
    category: card.category,
    question: card.question,
    answer: card.answer,
    tag: card.tag,
});

const useCardsService = () => {
    const api = useApi();

    return {
        getCollection: async (tags: string[] = []): Promise<Card[]> => {
            const query = buildQueryWithTags(tags);
            const data = await api(`cards${query}`, { method: 'GET' });
            return data.map(adaptCardData);
        },
        post: (body: CardUserData): Promise<Card> => api('cards', {
            method: 'POST',
            body,
        }).then(adaptCardData),
    };
};

export default useCardsService;
