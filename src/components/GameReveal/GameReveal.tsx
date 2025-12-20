import useGame from "@/components/context/GameContext"
import type { TeamInfo } from "@/queries/fetchTeams"
import type { Player } from "@/components/context/GameContext"
import styles from "./GameReveal.module.css"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useMemo, useState } from "react"

export default function GameReveal({ teamsInfo }: { teamsInfo: TeamInfo[] }) {
	const { teamCount: teams, players: playerList } = useGame()

	// Assign teams only once using useMemo
	const assignedPlayerList = useMemo(() => {
		return assignTeamsToPlayers(teamsInfo, teams || 0, playerList)
	}, [teamsInfo, teams, playerList])

	return (
		<DataTable
			value={assignedPlayerList}
			className={styles.gameRevealContainer}
		>
			<Column field="name" header="Naam"></Column>
			{Array.from({ length: teams || 0 }).map((_, teamIndex) => (
				<Column
					key={teamIndex}
					field={`assignedTeams[${teamIndex}].teamName`}
					header={`Team ${teamIndex + 1}`}
					body={(rowData: Player, rowMeta) => {
						const playerIndex = rowMeta.rowIndex
						const totalPlayers = assignedPlayerList.length
						const globalIndex = 1 + (teamIndex * totalPlayers + playerIndex)
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
					}}
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
