import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import type { TeamInfo } from "@/queries/fetchTeams"

export interface Player {
	id: number
	name: string
	assignedTeams: TeamInfo[]
}

interface GameContextType {
	playerCount: number | null
	teamCount: number | null
	updatePlayerCount: (count: number | null) => void
	updateTeamCount: (count: number | null) => void
	players: Player[]
	initializePlayers: (players: Player[]) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
	const [players, setPlayers] = useState<number | null>(null)
	const [teams, setTeams] = useState<number | null>(null)
	const [playerList, setPlayerList] = useState<Player[]>([])

	return (
		<GameContext.Provider
			value={{
				playerCount: players,
				teamCount: teams,
				updatePlayerCount: setPlayers,
				updateTeamCount: setTeams,
				players: playerList,
				initializePlayers: setPlayerList,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export default function useGame() {
	const context = useContext(GameContext)
	if (!context) {
		throw new Error("useGame must be used within a GameProvider")
	}
	return context
}
