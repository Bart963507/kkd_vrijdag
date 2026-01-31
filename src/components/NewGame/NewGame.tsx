import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useGame } from "@/components/context/GameContext"
import { Card } from "primereact/card"
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

		try {
			const numberOfTeams = await checkNumberOfTeams()
			if (players * teams > numberOfTeams) {
				setErrorMessage(
					`Er spelen vandaag ${numberOfTeams} teams. Pas het aantal spelers of teams per speler aan.`,
				)
				return
			}

			navigate({ to: "/setup-game" })
		} catch (error) {
			setErrorMessage("Er is een fout opgetreden bij het controleren van teams")
		}
	}

	return (
		<Card title="Nieuw Spel" className={sharedStyles.gameCard}>
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
			<Button label="Volgende" className="mt-2" onClick={onClickNext} />
		</Card>
	)
}
