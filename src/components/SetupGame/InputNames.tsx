import { InputText } from "primereact/inputtext"
import { useState } from "react"
import styles from "./SetupGame.module.css"

interface InputNamesProps {
	count: number
	onNamesChange: (names: string[]) => void
}

export default function InputNames({ count, onNamesChange }: InputNamesProps) {
	const [names, setNames] = useState<string[]>(Array(count).fill(""))

	const handleNameChange = (index: number, value: string) => {
		const newNames = [...names]
		newNames[index] = value
		setNames(newNames)
		onNamesChange(newNames)
	}

	return (
		<div>
			{Array.from({ length: count }, (_, index) => (
				<div key={index}>
					<InputText
						placeholder={`Speler ${index + 1}`}
						className={styles.InputPlayerName}
						value={names[index]}
						onChange={(e) => handleNameChange(index, e.target.value)}
						required={true}
					/>
				</div>
			))}
		</div>
	)
}
