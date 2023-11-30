import { Box, BoxType } from "@/components"
import React from "react"
import { View } from "react-native"

type RowProp = BoxType & {
	children: React.ReactNode
}
const Row: React.FC<RowProp> = ({ children, ...rest }) => {
	return (
		<Box flexDirection="row" justifyContent="space-between" mb="s30" {...rest}>
			{children}
		</Box>
	)
}

export default Row
