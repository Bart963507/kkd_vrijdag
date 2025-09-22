import { Card } from "primereact/card"
import { Button } from "primereact/button"
export default function StartGame() {
	return (
		<Card title="Welkom">
			<p>
				Welkom bij het KKD-vrijdag spel. Je hebt twee opties om te beginnen:
			</p>
			<ul>
				<li>
					<strong>Nieuw Spel:</strong> Start een gloednieuw avontuur! Kies deze
					optie om een nieuw spel te creëren
				</li>
				<li>
					<strong>Bestaand Spel:</strong> Laad je meest recente gespeelde spel
					en ga verder waar je bent gebleven.{" "}
				</li>
			</ul>
			<p>
				Kies je optie en laten we beginnen met het spel! Veel plezier en succes!
			</p>
			<Button label="Click" className="mt-2"></Button>
		</Card>
	)
}
