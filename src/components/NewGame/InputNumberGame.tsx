import { InputNumber } from "primereact/inputnumber"
import styles from "./NewGame.module.css"

interface InputNumberGameProps {
	playerCount: number | null
	setCount: (value: number | null) => void
	label: string
}

export default function InputNumberGame({
	playerCount,
	setCount: setPlayerCount,
	label,
}: InputNumberGameProps) {
	const inputId = `input-${label.toLowerCase().replace(/\s+/g, "-")}`

	return (
		<div className={styles.inputNumberGame}>
			<label htmlFor={inputId} className={styles.inputNumberGameLabel}>
				<strong>{label}</strong>
			</label>
			<InputNumber
				inputId={inputId}
				showButtons
				buttonLayout="horizontal"
				value={playerCount ?? 0}
				onChange={(e) => setPlayerCount(e.value)}
				min={0}
				max={100}
			/>
		</div>
	)
}
