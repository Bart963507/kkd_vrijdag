import Game from "@/components/Game/GameTable"
import { createFileRoute } from "@tanstack/react-router"
import createTeamsInfo from "@/queries/fetchTeams"

export const Route = createFileRoute("/game")({
	component: RouteComponent,
	loader: async () => {
		const teams = await createTeamsInfo()
		return { teams }
	},
})

function RouteComponent() {
	const { teams } = Route.useLoaderData()

	return (
		<div className="App">
			<Game teamsInf={teams} />
		</div>
	)
}
