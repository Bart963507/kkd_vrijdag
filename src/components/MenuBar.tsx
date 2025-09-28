import { TabMenu } from "primereact/tabmenu"
import type { MenuItem } from "primereact/menuitem"

const items: MenuItem[] = [
	{ label: "Home", icon: "pi pi-home", url: "/" },
	{ label: "Spelregels", icon: "pi pi-book", url: "/rules" },
	{ label: "Stand", icon: "pi pi-chart-bar", url: "/standings" },
	{ label: "Programma", icon: "pi pi-calendar", url: "/schedule" },
]

export default function MenuBar() {
	return <TabMenu model={items} />
}
