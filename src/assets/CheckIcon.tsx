import { Theme } from "@/theme"
import React from "react"
import { View } from "react-native"
import { Path, Svg } from "react-native-svg"

type CheckIconProps = {
	color: string
	size: number
}

const CheckIcon: React.FC<CheckIconProps> = ({ color, size }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 36 25" fill="none">
			<Path
				d="M34.3333 1L11.4167 23.9167L1 13.5"
				stroke={color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	)
}

export default CheckIcon
