import Game from "@/components/Game/GameTable"
import { createFileRoute } from "@tanstack/react-router"
import createTeamsInfo from "@/queries/fetchTeams"
import useGame from "@/components/context/GameContext" // Import useGame

export const Route = createFileRoute("/game")({
	component: RouteComponent,
	loader: async () => {
		const teams = await createTeamsInfo()
		return { teams }
	},
})

function RouteComponent() {
	const { players } = useGame()

	return (
		<div className="App">
			<Game playerList={players} />
		</div>
	)
}
