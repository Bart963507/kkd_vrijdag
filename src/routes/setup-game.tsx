import { createFileRoute } from "@tanstack/react-router"
import SetupGame from "@/components/SetupGame/SetupGame"
export const Route = createFileRoute("/setup-game")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="App">
			<SetupGame />
		</div>
	)
}
