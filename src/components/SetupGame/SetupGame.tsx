import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useNavigate } from "@tanstack/react-router"
import useGame from "@/components/context/GameContext"
import InputNames from "./InputNames"

export default function SetupGame() {
	const navigate = useNavigate()
	const gameContext = useGame()
	console.log("GameContext in SetupGame:", gameContext)
	const players = gameContext?.players

	if (!players) {
		return <div>Het aantal spelers is niet bekend.</div>
	}

	return (
		<Card title="Welkom" className="game-card">
			<p>Voer de namen van de {players} spelers in:</p>
			<InputNames count={players} />
			<Button label="Bevestigen" onClick={() => navigate({ to: "/game" })} />
			<Button
				label="Annuleren"
				severity="danger"
				onClick={() => navigate({ to: "/" })}
			/>
			<Button
				label="Terug"
				severity="secondary"
				onClick={() => navigate({ to: "/new-game" })}
			/>
		</Card>
	)
}
