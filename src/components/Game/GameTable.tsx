import { DataTable } from "primereact/datatable"
import type { TeamInfo } from "@/queries/fetchTeams"
import { Column } from "primereact/column"
import useGame from "@/components/context/GameContext"
import type { Player } from "@/components/context/GameContext"
import { InputNumber } from "primereact/inputnumber"
import styles from "./gameStyles.module.css"

export default function Game({ teamsInfo }: { teamsInfo: TeamInfo[] }) {
	const {
		playerCount: players,
		teamCount: teams,
		updatePlayerCount: setPlayers,
		updateTeamCount: setTeams,
		players: playerList,
		initializePlayers: setPlayerList,
	} = useGame()

	console.log("GameContext in GameTable:", { players, teams })
	console.log(playerList)

	const logosBodyTemplate = (rowData: GameTablePlayer) => {
		return (
			<div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
				{rowData.assignedLogos.map((logoUrl, index) => (
					<img
						key={index}
						src={logoUrl}
						alt={`Team logo ${index + 1}`}
						style={{
							width: "30px",
							height: "30px",
							objectFit: "contain",
						}}
						onError={(e) => {
							// Fallback if image fails to load
							console.error(`Failed to load image: ${logoUrl}`)
							e.currentTarget.style.display = "none"
						}}
					/>
				))}
			</div>
		)
	}

	const assignedPlayerList = assignTeamsToPlayers(
		teamsInfo,
		teams || 0,
		playerList
	)
	const gameTablePlayers = playerToGameTablePlayer(assignedPlayerList)

	return (
		<DataTable value={gameTablePlayers} className={styles.gameTable}>
			<Column
				field="name"
				header="Naam"
				className={styles.gameTableColumn}
			></Column>
			<Column
				field="assignedLogos"
				header="Clubs"
				body={logosBodyTemplate}
				className={styles.gameTableColumn}
			></Column>
			<Column
				field="assignedGoals"
				header="Goals"
				className={styles.gameTableColumn}
			></Column>
			<Column
				header="Aantal"
				className={styles.gameTableColumn}
				body={(rowData: GameTablePlayer) => (
					<InputNumber
						min={0}
						className="input-numbers"
						showButtons
						buttonLayout="horizontal"
					/>
				)}
			></Column>
		</DataTable>
	)
}

function assignTeamsToPlayers(
	teamsInfo: TeamInfo[],
	teamsPerPlayer: number,
	playerList: Player[]
): Player[] {
	const availableTeams = [...teamsInfo.filter((team) => !team.assigned)]

	const assignedTeamsPerPlayer = playerList.map((player) => {
		const playerTeams: TeamInfo[] = []
		let teamCount = teamsPerPlayer

		while (teamCount > 0 && availableTeams.length > 0) {
			const randomIndex = Math.floor(Math.random() * availableTeams.length)
			const team = availableTeams.splice(randomIndex, 1)[0]
			playerTeams.push(team)
			teamCount--
		}

		return {
			...player,
			assignedTeams: [...player.assignedTeams, ...playerTeams],
		}
	})

	return assignedTeamsPerPlayer
}

interface GameTablePlayer {
	id: number
	name: string
	assignedLogos: string[]
	assignedGoals: number
}

function playerToGameTablePlayer(playerList: Player[]): GameTablePlayer[] {
	return playerList.map((player) => ({
		id: player.id,
		name: player.name,
		assignedLogos: player.assignedTeams.map((team) => team.teamLogo),
		assignedGoals: player.assignedTeams.reduce(
			(sum, team) => sum + team.teamGoals,
			0
		),
	}))
}
