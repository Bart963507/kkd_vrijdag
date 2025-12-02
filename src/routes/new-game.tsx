import NewGame from "@/components/NewGame/NewGame"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/new-game")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="App">
			<NewGame />
		</div>
	)
}
