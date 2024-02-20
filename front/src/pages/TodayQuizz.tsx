import CardTile from "../components/CardTile";
import {useEffect, useState} from "react";
import useCardsService from "../domain/services/useCardsService";
import {Card} from "../domain/entities/Card.ts";


export default function TodayQuizz() {
    const cardsService = useCardsService();
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        cardsService.get().then((cards) => {
            setCards(cards);
            setLoading(false);
        });
    }, [cardsService])

    if (loading) {
        return <p>Chargement en cours...</p>
    }

    return (
        <div className="flex gap-16 flex-wrap">
            {cards.map(card => (
              <CardTile key={card.id} card={card} mustRespond={true} />
            ))}
        </div>
    )
}
