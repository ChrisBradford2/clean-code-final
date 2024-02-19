import useApi from './useApi';
import { CardUserData } from "../types/CardUserData";
import { Card } from "../types/Card";

const useCardsService = () => {
    const cardAdapter = (data: any): Card => ({
        id: data.id,
        category: data.category,
        question: data.question,
        answer: data.answer,
        tag: data.tag,
    });

    const api = useApi();

    return {
        getCollection: async (tags: string[] = []): Promise<Card[]> => {
            let query = '';
            if (tags.length) {
                query = `?tags=${tags.join(',')}`;
            }

            const data = await api(`cards${query}`, {
                method: 'GET',
            });
            return data.map(cardAdapter);
        },
        post: (body: CardUserData): Promise<Card> => api(`cards`, {
            method: 'POST',
            body,
        }).then(cardAdapter),
    };
};

export default useCardsService;
