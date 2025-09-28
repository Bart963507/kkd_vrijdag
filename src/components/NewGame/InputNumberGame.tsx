import { InputNumber } from "primereact/inputnumber"

interface InputNumberGameProps {
	playerCount: number | null
	setPlayerCount: (value: number | null) => void
	label: string
}

export default function InputNumberGame({
	playerCount,
	setPlayerCount,
	label,
}: InputNumberGameProps) {
	return (
		<>
			<label>
				<strong>{label}</strong>
			</label>
			<InputNumber
				showButtons
				buttonLayout="horizontal"
				className="input-numbers"
				value={playerCount ?? 0}
				onChange={(e) => setPlayerCount(e.value)}
				min={0}
				max={100}
			/>
		</>
	)
}
