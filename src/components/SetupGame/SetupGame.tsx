import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useNavigate } from "@tanstack/react-router"
import { useGame } from "@/components/context/GameContext"
import InputNames from "./InputNames"
import { useState } from "react"
import sharedStyles from "@/styles/shared.module.css"

export default function SetupGame() {
	const navigate = useNavigate()
	const gameContext = useGame()
	console.log("GameContext in SetupGame:", gameContext)
	const playerCount = gameContext?.playerCount
	const setPlayers = gameContext?.setPlayers
	const [playerNames, setPlayerNames] = useState<string[]>([])

	if (!playerCount) {
		return <div>Het aantal spelers is niet bekend.</div>
	}

	const setUpPlayers = () => {
		const playersArray = playerNames.map((name, index) => ({
			id: index + 1,
			name: name || `Player ${index + 1}`,
			assignedTeams: [],
			beers: 0,
		}))
		setPlayers(playersArray)
		if (playersArray.length === 0) {
			throw new Error("No players to set up")
		}
		navigate({ to: "/game-reveal" })
	}

	return (
		<div className={sharedStyles.gameCard}>
			<h2> Nieuw Spel </h2>
			<p>Voer de namen van de spelers in:</p>
			<InputNames count={playerCount} onNamesChange={setPlayerNames} />
			<Button label="Bevestigen" onClick={setUpPlayers} />
		</div>
	)
}
