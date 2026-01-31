import { TabMenu } from "primereact/tabmenu"
import type { MenuItem } from "primereact/menuitem"
import { useNavigate } from "@tanstack/react-router"

export default function MenuBar() {
	const navigate = useNavigate()

	const items: MenuItem[] = [
		{
			label: "Home",
			icon: "pi pi-home",
			command: () => navigate({ to: "/" }),
		},
		{
			label: "Spelregels",
			icon: "pi pi-book",
			command: () => navigate({ to: "/" }), //TODO: add rules page
		},
		{
			label: "Stand",
			icon: "pi pi-chart-bar",
			command: () => navigate({ to: "/" }), //TODO: add standings page
		},
		{
			label: "Programma",
			icon: "pi pi-calendar",
			command: () => navigate({ to: "/" }), //TODO: add schedule page
		},
	]

	return <TabMenu model={items} />
}
