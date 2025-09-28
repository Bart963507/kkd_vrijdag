import { useNavigate } from "@tanstack/react-router"

import { useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"

import InputNumberGame from "./InputNumberGame"

export default function NewGame() {
	const [playerCount, setPlayerCount] = useState<number | null>(null)
	const [teamCount, setTeamCount] = useState<number | null>(null)
	const navigate = useNavigate()

	return (
		<Card title="Nieuw Spel" className="game-card">
			<>
				<p>Stel hier de basis instellingen van het spel in:</p>
				<InputNumberGame
					playerCount={playerCount}
					setPlayerCount={setPlayerCount}
					label="Aantal spelers"
				/>
				<br />

				<InputNumberGame
					playerCount={teamCount}
					setPlayerCount={setTeamCount}
					label="Aantal teams"
				/>
				<br />
				<Button
					label="Volgende"
					className="mt-2"
					onClick={() => navigate({ to: "/" })}
				/>
			</>
		</Card>
	)
}
