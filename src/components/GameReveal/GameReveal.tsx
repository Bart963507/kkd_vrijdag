import useGame from "@/components/context/GameContext"
import type { TeamInfo } from "@/queries/fetchTeams"
import type { Player } from "@/components/context/GameContext"
import styles from "./GameReveal.module.css"

export default function GameReveal({ teamsInfo }: { teamsInfo: TeamInfo[] }) {
	const { teamCount: teams, players: playerList } = useGame()

	const assignedPlayerList = assignTeamsToPlayers(
		teamsInfo,
		teams || 0,
		playerList
	)

	console.log("Assigned Player List:", assignedPlayerList)
	return (
		<div className={styles.gameRevealContainer}>
			<p>Game Reveal Content Goes Here</p>
		</div>
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
