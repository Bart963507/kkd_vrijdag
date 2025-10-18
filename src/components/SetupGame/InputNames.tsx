import { InputText } from "primereact/inputtext"

export default function InputNames({ count }: { count: number }) {
	return (
		<div>
			{Array.from({ length: count }, (_, index) => (
				<div key={index}>
					<InputText
						placeholder={`Speler ${index + 1}`}
						className="input-text"
					/>
				</div>
			))}
		</div>
	)
}
