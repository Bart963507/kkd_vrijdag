import { createFileRoute } from "@tanstack/react-router"
import createTeamsInfo from "@/queries/fetchTeams"
import GameReveal from "@/components/GameReveal/GameReveal"

export const Route = createFileRoute("/game-reveal")({
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
			<GameReveal teamsInfo={teams} />
		</div>
	)
}
