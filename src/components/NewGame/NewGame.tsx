import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useGame } from "@/components/context/GameContext"
import { Button } from "primereact/button"
import InputNumberGame from "./InputNumberGame"
import createTeamsInfo from "@/queries/fetchTeams"
import { Message } from "primereact/message"
import sharedStyles from "@/styles/shared.module.css"

const checkNumberOfTeams = async function (): Promise<number> {
	const teams = await createTeamsInfo()
	return teams.length
}

export default function NewGame() {
	const navigate = useNavigate()
	const {
		playerCount: players,
		teamCount: teams,
		setPlayerCount: setPlayers,
		setTeamCount: setTeams,
	} = useGame()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const onClickNext = async function () {
		setErrorMessage(null)

		if (players === null || players === 0) {
			setErrorMessage("Vul het aantal spelers in")
			return
		}

		if (teams === null || teams === 0) {
			setErrorMessage("Vul het aantal teams per speler in")
			return
		}

		navigate({ to: "/setup-game" })
	}

	return (
		<div className={sharedStyles.gameCard}>
			<h1> Nieuw Spel </h1>
			{errorMessage && (
				<Message severity="error" text={errorMessage} className="mb-3" />
			)}
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
				label="Aantal teams per speler"
			/>
			<br />
			<Button
				label="Volgende"
				className={sharedStyles.startButton}
				onClick={onClickNext}
			/>
		</div>
	)
}
