import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react"
import type { ReactNode } from "react"
import type { TeamInfo } from "@/queries/fetchTeams"

export interface Player {
	id: number
	name: string
	assignedTeams: TeamInfo[]
	beers: number
}

interface GameContextType {
	playerCount: number | null
	teamCount: number | null
	setPlayerCount: (count: number | null) => void
	setTeamCount: (count: number | null) => void
	players: Player[]
	setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
	assignTeams: (teams: TeamInfo[], teamsPerPlayer: number) => void
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
	const [players, setPlayers] = useState<Player[]>([])
	const [teamCount, setTeamCount] = useState<number | null>(null)
	const [playerCount, setPlayerCount] = useState<number | null>(null)

	const assignTeams = useCallback(
		(teams: TeamInfo[], teamsPerPlayer: number) => {
			setPlayers((prevPlayers) => {
				const mutableTeams = teams.map((team) => ({ ...team }))

				return prevPlayers.map((player) => {
					const assignedTeams: TeamInfo[] = []

					for (let i = 0; i < teamsPerPlayer && mutableTeams.length > 0; i++) {
						const minAssigned = Math.min(
							...mutableTeams.map((team) => team.assigned),
						)
						const candidates = mutableTeams.filter(
							(team) => team.assigned === minAssigned,
						)
						const playerCandidates = candidates.filter(
							(team) =>
								!assignedTeams.some(
									(assigned) => assigned.teamName === team.teamName,
								),
						)
						const pool =
							playerCandidates.length > 0 ? playerCandidates : candidates
						const index = Math.floor(Math.random() * pool.length)
						const chosenTeam = pool[index]
						chosenTeam.assigned += 1
						assignedTeams.push({ ...chosenTeam })
					}

					return {
						...player,
						assignedTeams: assignedTeams,
					}
				})
			})
		},
		[],
	)

	const value = useMemo(
		() => ({
			playerCount,
			teamCount,
			setPlayerCount,
			setTeamCount,
			players,
			setPlayers,
			assignTeams,
		}),
		[playerCount, teamCount, players, assignTeams],
	)

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
	const context = useContext(GameContext)
	if (!context) {
		throw new Error("useGame must be used within a GameProvider")
	}

	return context
}

export function syncToLocalStorage(players: Player[]) {
	console.log("Syncing to local storage:", players)
	localStorage.setItem("game", JSON.stringify(players))
}
