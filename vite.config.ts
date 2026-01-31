import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import { resolve } from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
	base: "/kkd_vrijdag/",
	plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact()],
	build: {
		outDir: "dist",
		sourcemap: true,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
})
