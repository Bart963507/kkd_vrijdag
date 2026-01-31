import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import type { Player } from "@/components/context/GameContext"
import { InputNumber } from "primereact/inputnumber"
import styles from "./gameTable.module.css"
import { syncToLocalStorage } from "@/components/context/GameContext"
import { useEffect, useRef } from "react"
import createTeamsInfo, { type TeamInfo } from "@/queries/fetchTeams"

export default function Game({ playerList }: { playerList: Player[] }) {
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	// Function to fetch scores
	const fetchScores = async () => {
		try {
			const teamsInfo = await createTeamsInfo()

			const updatedPlayerList = updatePlayerScores(playerList, teamsInfo)
			syncToLocalStorage(updatedPlayerList)

			console.log("Scores updated:", new Date().toLocaleTimeString())
		} catch (error) {
			console.error("Failed to fetch scores:", error)
		}
	}

	useEffect(() => {
		const POLL_INTERVAL = 0.5 * 60 * 1000 // 5 minutes in milliseconds
		fetchScores()
		intervalRef.current = setInterval(fetchScores, POLL_INTERVAL)
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [playerList])

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
							console.error(`Failed to load image: ${logoUrl}`)
							e.currentTarget.style.display = "none"
						}}
					/>
				))}
			</div>
		)
	}

	const gameTablePlayers = playerToGameTablePlayer(playerList)

	return (
		<DataTable value={gameTablePlayers} className={styles.gameTable}>
			<Column field="name" header="Naam" className={styles.gameTableColumn} />
			<Column
				field="assignedLogos"
				header="Clubs"
				body={logosBodyTemplate}
				className={styles.gameTableColumn}
			/>
			<Column
				field="assignedGoals"
				header="Goals"
				className={styles.gameTableColumn}
			/>
			<Column
				header="🍺"
				className={styles.gameTableColumn}
				body={(rowData: GameTablePlayer) => (
					<InputNumber
						min={0}
						className="input-numbers"
						showButtons
						buttonLayout="horizontal"
						value={rowData.beers}
						onChange={(e) => {
							const updatedPlayerList = playerList.map((player) =>
								player.id === rowData.id
									? { ...player, beers: e.value || 0 }
									: player,
							)
							syncToLocalStorage(updatedPlayerList)
						}}
					/>
				)}
			/>
		</DataTable>
	)
}

function updatePlayerScores(
	playerList: Player[],
	teamsInfo: TeamInfo[],
): Player[] {
	return playerList.map((player) => ({
		id: player.id,
		name: player.name,
		assignedTeams: teamsInfo.filter((team) =>
			player.assignedTeams.some(
				(assigned) => assigned.teamName === team.teamName,
			),
		),
		beers: player.beers,
	}))
}

interface GameTablePlayer {
	id: number
	name: string
	assignedLogos: string[]
	assignedGoals: number
	beers: number
}

function playerToGameTablePlayer(playerList: Player[]): GameTablePlayer[] {
	return playerList.map((player) => ({
		id: player.id,
		name: player.name,
		assignedLogos: player.assignedTeams.map((team) => team.teamLogo),
		assignedGoals: player.assignedTeams.reduce(
			(sum, team) => sum + team.teamGoals,
			0,
		),
		beers: player.beers,
	}))
}
