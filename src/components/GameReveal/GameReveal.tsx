import { useGame } from "@/components/context/GameContext"
import type { TeamInfo } from "@/queries/fetchTeams"
import type { Player } from "@/components/context/GameContext"
import styles from "./GameReveal.module.css"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "primereact/button"
import type { ColumnBodyOptions } from "primereact/column"
import { syncToLocalStorage } from "@/components/context/GameContext"

export default function GameReveal({ teamsInfo }: { teamsInfo: TeamInfo[] }) {
	const { teamCount: teams, players: playerList, assignTeams } = useGame()
	const navigate = useNavigate()
	useEffect(() => {
		assignTeams(teamsInfo, teams || 0)
	}, [teamsInfo, teams, assignTeams])

	return (
		<div>
			<DataTable value={playerList} className={styles.gameRevealContainer}>
				<Column field="name" header="Naam"></Column>
				{Array.from({ length: teams || 0 }).map((_, teamIndex) =>
					createColumns(teamIndex, playerList),
				)}
			</DataTable>
			<Button
				label="Bevestigen"
				className="mt-2"
				onClick={() => onStartGame(playerList)}
			/>
		</div>
	)

	function onStartGame(players: Player[]) {
		syncToLocalStorage(players)
		navigate({ to: "/game" })
	}
}

function createColumns(
	teamIndex: number,
	assignedPlayerList: Player[],
): React.ReactElement {
	return (
		<Column
			key={teamIndex}
			field={`assignedTeams[${teamIndex}].teamName`}
			header={`Team ${teamIndex + 1}`}
			body={(rowData: Player, rowMeta) => {
				const globalIndex = calcGlobalIndex(
					teamIndex,
					assignedPlayerList,
					rowMeta,
				)
				const image = renderTeamLogo(rowData, teamIndex, globalIndex)
				return image
			}}
		/>
	)
}

function calcGlobalIndex(
	teamIndex: number,
	assignedPlayerList: Player[],
	rowMeta: ColumnBodyOptions,
) {
	const playerIndex = rowMeta.rowIndex
	const totalPlayers = assignedPlayerList.length
	return 1 + (teamIndex * totalPlayers + playerIndex)
}

function renderTeamLogo(
	rowData: Player,
	teamIndex: number,
	globalIndex: number,
) {
	return (
		<img
			src={rowData.assignedTeams[teamIndex]?.teamLogo}
			className={styles.logo}
			style={
				{
					"--delay": `${globalIndex * 2}s`,
				} as any
			}
		/>
	)
}
