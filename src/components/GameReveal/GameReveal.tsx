import useGame from "@/components/context/GameContext"
import type { TeamInfo } from "@/queries/fetchTeams"
import type { Player } from "@/components/context/GameContext"
import styles from "./GameReveal.module.css"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

export default function GameReveal({ teamsInfo }: { teamsInfo: TeamInfo[] }) {
	const { teamCount: teams, players: playerList } = useGame()

	const assignedPlayerList = assignTeamsToPlayers(
		teamsInfo,
		teams || 0,
		playerList
	)

	console.log("Assigned Player List:", assignedPlayerList)
	return (
		<DataTable
			value={assignedPlayerList}
			className={styles.gameRevealContainer}
		>
			<Column field="name" header="Naam"></Column>
			{/* Dynamically Generated Columns */}
			{Array.from({ length: teams || 0 }).map((_, index) => (
				<Column
					key={index}
					field={`assignedTeams[${index}].teamName`} // Access team name dynamically
					header={`Team ${index + 1}`}
					body={(rowData: Player) =>
						rowData.assignedTeams[index]?.teamName || "N/A"
					}
				></Column>
			))}
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
