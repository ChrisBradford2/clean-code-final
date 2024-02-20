import {Card} from "../domain/entities/Card";
import {FormEvent} from "react";

export default function CardTile({
    card,
    mustRespond
}: {
    card: Card
    mustRespond: boolean
}) {
  const handleSumbit = (event: FormEvent) => {
    event.preventDefault();

    console.log("submit");
  }

    return (
        <div className="card">
            <div className="flex space-between align-center gap-8">
                <h3>{card.question}</h3>
                {card.tag && <span className="badge">{card.tag}</span>}
            </div>
            {mustRespond ? (
              <form onSubmit={handleSumbit}>
                  <input type="text" className={"mb-4"} placeholder="Réponse"/>
                  <button type="submit">Valider</button>
              </form>
            ) : (
              <p>{card.answer}</p>
            )}
        </div>
    )
}
