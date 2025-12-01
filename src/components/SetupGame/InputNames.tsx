import { InputText } from "primereact/inputtext"
import { useState } from "react"

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
		onNamesChange(newNames) // ✅ Notify parent of changes
	}

	return (
		<div>
			{Array.from({ length: count }, (_, index) => (
				<div key={index}>
					<InputText
						placeholder={`Speler ${index + 1}`}
						className="input-text"
						value={names[index]}
						onChange={(e) => handleNameChange(index, e.target.value)}
					/>
				</div>
			))}
		</div>
	)
}
