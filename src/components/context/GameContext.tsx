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
				const availableTeams = teams.filter((team) => !team.assigned)

				return prevPlayers.map((player) => {
					const assignedTeams: TeamInfo[] = []

					for (
						let i = 0;
						i < teamsPerPlayer && availableTeams.length > 0;
						i++
					) {
						const index = Math.floor(Math.random() * availableTeams.length)
						assignedTeams.push(availableTeams.splice(index, 1)[0])
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
