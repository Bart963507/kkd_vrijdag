import { Outlet, createRootRoute } from "@tanstack/react-router"
import MenuBar from "@/components/MenuBar"
import { PrimeReactProvider } from "primereact/api"

import "primereact/resources/themes/lara-light-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

export const Route = createRootRoute({
	component: () => (
		<PrimeReactProvider>
			<MenuBar />
			<Outlet />
		</PrimeReactProvider>
	),
})
