import {useEffect, useState} from "react";
import useCardsService from "../domain/services/useCardsService.js";
import {Card} from "../domain/entities/Card";
import CardTile from "../components/CardTile";
import CardForm from "../components/CardForm";

export default function CardsList() {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const cardsService = useCardsService();

    useEffect(() => {
        loadCards();
    }, [])

    const loadCards = () => {
        cardsService.getCollection().then((cards) => {
            setCards(cards);
            setLoading(false);
        });
    }

    return (
        <>
            <h1>Mes fiches</h1>
            {loading && <p>Chargement en cours...</p>}
            <div className="flex gap-16 flex-wrap">
                <CardForm onNewCard={loadCards}/>
                {cards.map(card => <CardTile card={card}/>)}
            </div>
        </>
    )
}