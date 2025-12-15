import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import type { Player } from "@/components/context/GameContext"
import { InputNumber } from "primereact/inputnumber"
import styles from "./gameStyles.module.css"

export default function Game(playerList: Player[]) {
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

	const gameTablePlayers = playerToGameTablePlayer(playerList)

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
