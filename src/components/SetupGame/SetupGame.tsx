import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useNavigate } from "@tanstack/react-router"
import useGame from "@/components/context/GameContext"
import InputNames from "./InputNames"
import { useState } from "react"

export default function SetupGame() {
	const navigate = useNavigate()
	const gameContext = useGame()
	console.log("GameContext in SetupGame:", gameContext)
	const playerCount = gameContext?.playerCount
	const setPlayers = gameContext?.initializePlayers
	const [playerNames, setPlayerNames] = useState<string[]>([])

	if (!playerCount) {
		return <div>Het aantal spelers is niet bekend.</div>
	}

	const setUpPlayers = () => {
		const playersArray = playerNames.map((name, index) => ({
			id: index + 1,
			name: name || `Player ${index + 1}`,
			assignedTeams: [],
		}))
		setPlayers(playersArray)
		navigate({ to: "/game" })
	}

	return (
		<Card title="Welkom" className="game-card">
			<p>Voer de namen van de {playerCount} spelers in:</p>
			<InputNames count={playerCount} onNamesChange={setPlayerNames} />
			<Button label="Bevestigen" onClick={setUpPlayers} />
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
