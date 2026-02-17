import { Button } from "primereact/button"
import { useNavigate } from "@tanstack/react-router"
import { useGame } from "../context/GameContext"
import styles from "./startGame.module.css"
import sharedStyles from "@/styles/shared.module.css"

export default function StartGame() {
	const navigate = useNavigate()
	const setPlayers = useGame()?.setPlayers

	function onContinueGame() {
		const players = parseStoredGame()
		if (!players) {
			throw new Error("No stored game found")
		}
		setPlayers(players)
		navigate({ to: "/game" })
	}

	return (
		<div className={sharedStyles.gameCard}>
			<h1> Welkom </h1>
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
				className={sharedStyles.startButton}
				onClick={() => navigate({ to: "/new-game" })}
			/>
			<Button
				label="Bestaand Spel"
				className={sharedStyles.startButton}
				disabled={!existingGameExists()}
				onClick={() => onContinueGame()}
			/>
		</div>
	)
}

function existingGameExists() {
	if (localStorage.getItem("game")) {
		return true
	}
	return false
}

function parseStoredGame() {
	const storedGame = localStorage.getItem("game")
	if (storedGame) {
		return JSON.parse(storedGame)
	}
	return null
}
