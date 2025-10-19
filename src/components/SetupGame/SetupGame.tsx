import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useNavigate } from "@tanstack/react-router"
import useGame from "@/components/context/GameContext"
import InputNames from "./InputNames"

export default function SetupGame() {
	const navigate = useNavigate()
	const gameContext = useGame()
	console.log("GameContext in SetupGame:", gameContext)
	const playerCount = gameContext?.playerCount
	const setPlayers = gameContext?.initializePlayers

	if (!playerCount) {
		return <div>Het aantal spelers is niet bekend.</div>
	}

	return (
		<Card title="Welkom" className="game-card">
			<p>Voer de namen van de {playerCount} spelers in:</p>
			<InputNames count={playerCount} />
			<Button label="Bevestigen" onClick={() => navigate({ to: "/game" })} />
			<Button
				label="Annuleren"
				severity="danger"
				onClick={() => navigate({ to: "/" })}
			/>
			<Button
				label="Terug"
				severity="secondary"
				onClick={() => setPlayers([])}
			/>
		</Card>
	)
}

const setUpPlayers = (setPlayers: any) => {
	const playersArray = []
	for (let i = 0; i < count; i++) {
		playersArray.push({ id: i + 1, name: i + 1, assignedTeams: [] })
	}
	setPlayers(playersArray)
	navigate({ to: "/game" })
}
