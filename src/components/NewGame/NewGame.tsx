import { useNavigate } from "@tanstack/react-router"

import useGame from "@/components/context/GameContext"
import { Card } from "primereact/card"
import { Button } from "primereact/button"

import InputNumberGame from "./InputNumberGame"
import createTeamsInfo from "../queries/fetchTeams"

const checkNumberOfTeams = async function (players: number) {
	createTeamsInfo()
}

export default function NewGame() {
	const gameContext = useGame()
	if (!gameContext) {
		throw new Error(
			"GameContext is undefined. Ensure the provider is set up correctly."
		)
	}
	const { players, teams, setPlayers, setTeams } = gameContext
	const navigate = useNavigate()

	return (
		<Card title="Nieuw Spel" className="game-card">
			<>
				<p>Stel hier de basis instellingen van het spel in:</p>
				<InputNumberGame
					playerCount={players}
					setCount={setPlayers}
					label="Aantal spelers"
				/>
				<br />

				<InputNumberGame
					playerCount={teams}
					setCount={setTeams}
					label="Aantal teams"
				/>
				<br />
				<Button
					label="Volgende"
					className="mt-2"
					onClick={() => navigate({ to: "/setup-game" })}
				/>
			</>
		</Card>
	)
}
