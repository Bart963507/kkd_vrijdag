import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useNavigate } from "@tanstack/react-router"

export default function StartGame() {
	const navigate = useNavigate()
	return (
		<Card title="Welkom" className="game-card">
			<p>
				Welkom bij het KKD-vrijdag spel. Je hebt twee opties om te beginnen:
			</p>
			<br />
			<strong>Nieuw Spel:</strong> Start een gloednieuw avontuur! Kies deze
			optie om een nieuw spel te creëren.
			<br />
			<strong>Bestaand Spel:</strong> Laad je meest recente gespeelde spel en ga
			verder waar je bent gebleven. <br />
			<p>
				Kies je optie en laten we beginnen met het spel! Veel plezier en succes!
			</p>
			<Button
				label="Nieuw Spel"
				className="mt-2"
				onClick={() => navigate({ to: "/new-game" })}
			/>
		</Card>
	)
}
