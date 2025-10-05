import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface GameContextType {
	players: number | null
	teams: number | null
	setPlayers: (count: number | null) => void
	setTeams: (count: number | null) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
	const [players, setPlayers] = useState<number | null>(null)
	const [teams, setTeams] = useState<number | null>(null)

	return (
		<GameContext.Provider value={{ players, teams, setPlayers, setTeams }}>
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
