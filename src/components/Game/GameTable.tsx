import { DataTable } from "primereact/datatable"
import type { TeamInfo } from "@/queries/fetchTeams"
import { Column } from "primereact/column"
import useGame from "@/components/context/GameContext"

export default function Game({ teamsInf }: { teamsInf: TeamInfo[] }) {
	const { players, teams, setPlayers, setTeams } = useGame()
	console.log("GameContext in GameTable:", { players, teams })
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
		<DataTable value={teamsInf}>
			<Column field="teamName" header="Team"></Column>
			<Column field="teamGoals" header="Goals"></Column>
			<Column field="teamLogo" header="Logo" body={logoBodyTemplate}></Column>
		</DataTable>
	)
}
