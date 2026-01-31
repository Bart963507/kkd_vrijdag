import { createFileRoute } from "@tanstack/react-router"
import "../App.css"
import StartGame from "@/components/StartGame/StartGame"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	return (
		<div className="App">
			<StartGame />
		</div>
	)
}
