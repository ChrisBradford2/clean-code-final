import useApi from './useApi';
import {CardUserData} from "../entities/CardUserData";
import {Card} from "../entities/Card";

const useCardsService = () => {
    const api = useApi();
    return {
        getCollection: (tags: string[] = []): Promise<Card[]> => {
            let query = '';
            if (tags.length) {
                query = `?tags=${tags.join(',')}`;
            }

            return api(`cards${query}`, {
                method: 'GET',
            });
        },
        get: (): Promise<Card[]> => api(`cards/quizz`, {
            method: 'GET',
        }),
        post: (body: CardUserData): Promise<Card> => api(`cards`, {
            method: 'POST',
            body: JSON.stringify(body),
        })
    };
};

export default useCardsService;
