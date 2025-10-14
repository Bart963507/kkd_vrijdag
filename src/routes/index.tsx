import { createFileRoute } from "@tanstack/react-router"
import "../App.css"
import StartGame from "@/components/StartGame"

export const Route = createFileRoute("/")({
	component: App,
})

// const teams = fetchTeams()
function App() {
	return (
		<div className="App">
			<StartGame />
		</div>
	)
}
