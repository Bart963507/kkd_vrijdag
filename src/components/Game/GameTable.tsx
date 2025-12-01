import { DataTable } from "primereact/datatable"
import type { TeamInfo } from "@/queries/fetchTeams"
import { Column } from "primereact/column"
import useGame from "@/components/context/GameContext"

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
	const logoBodyTemplate = (rowData: TeamInfo) => {
		return (
			<img
				src={rowData.teamLogo}
				alt={`${rowData.teamName} logo`}
				style={{ width: "40px", height: "40px", objectFit: "contain" }}
			/>
		)
	}

	return (
		<DataTable value={teamsInfo}>
			<Column field="teamName" header="Team"></Column>
			<Column field="teamGoals" header="Goals"></Column>
			<Column field="teamLogo" header="Logo" body={logoBodyTemplate}></Column>
		</DataTable>
	)
}
