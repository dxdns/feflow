// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import svelte from "@astrojs/svelte"
import path from "path"

// https://astro.build/config
export default defineConfig({
	site: "https://feflow.dxdns.dev",
	integrations: [
		starlight({
			title: "feflow",
			components: {
				PageFrame: "./src/lib/layouts/RootLayout.astro",
				Hero: "./src/lib/components/Hero.astro"
			},
			customCss: ["./src/styles/custom.css"],
			favicon: "/favicon.png",
			logo: {
				light: "./src/assets/logo_light.png",
				dark: "./src/assets/logo_dark.png",
				replacesTitle: true
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/dxdns/feflow"
				}
			],
			sidebar: [
				{
					label: "Getting Started",
					items: [
						{
							label: "Introduction",
							slug: "docs"
						},
						{
							label: "Installation",
							slug: "docs/getting-started"
						},
						{
							label: "Theming",
							slug: "docs/getting-started/theming"
						},
						{
							label: "Templates",
							slug: "docs/getting-started/templates",
							badge: "New"
						}
					]
				},
				{
					label: "Components",
					autogenerate: { directory: "docs/components" }
				},
				{
					label: "Utils",
					autogenerate: { directory: "docs/utils" }
				}
			]
		}),
		svelte()
	],
	vite: {
		resolve: {
			alias: {
				"@": path.resolve("./src/lib"),
			}
		}
	}
})
