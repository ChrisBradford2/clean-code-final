import useApi from './useApi';
import {CardUserData} from "../entities/CardUserData";
import {Card} from "../entities/Card";

const useCardsService = () => {
    const api = useApi();
    return {
        getCollection: (): Promise<Card[]> => api(`cards`, {
            method: 'GET',
        }),
        post: (body: CardUserData): Promise<Card> => api(`cards`, {
            method: 'POST',
            body,
        }),
    };
};

export default useCardsService;
