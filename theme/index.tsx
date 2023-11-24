import { createTheme } from "@shopify/restyle"
import { darkPalette } from "./darkPallet"

const theme = createTheme({
	colors: darkPalette,
	spacing: {
		s2: 2,
		s10: 10,
		s16: 16,
		s30: 30,
		s37: 37,
		s40: 40,
		s66: 66,
	},
	textVariants: {
		pMinimun: {
			lineHeight: 15,
			fontSize: 12,
			color: "text",
		},
		pRegular: {
			lineHeight: 15,
			fontSize: 18,
			color: "text",
		},
		tRegular: {
			lineHeight: 20,
			fontSize: 24,
			color: "text",
		},
		tMax: {
			lineHeight: 32,
			fontSize: 38,
			color: "text",
		},
		defaults: {},
	},
	borderRadii: {
		s5: 5,
	},
})

export type Theme = typeof theme
export default theme
