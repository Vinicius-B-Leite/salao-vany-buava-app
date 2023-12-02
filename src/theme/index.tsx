import { createTheme } from "@shopify/restyle"
import { darkPalette } from "./darkPallet"

const theme = createTheme({
	colors: darkPalette,
	spacing: {
		s2: 2,
		s12: 12,
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
			lineHeight: 18,
			fontSize: 15,
			color: "text",
		},
		pRegularBold: {
			lineHeight: 18,
			fontSize: 15,
			color: "text",
			fontWeight: "bold",
		},
		tRegular: {
			lineHeight: 27,
			fontSize: 24,
			color: "text",
		},
		tMax: {
			lineHeight: 41,
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
