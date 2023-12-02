import React from "react"
import { View } from "react-native"
import { Path, Svg } from "react-native-svg"

type TriangleProps = {
	size: number
	color: string
}

const Triangle: React.FC<TriangleProps> = ({ color, size }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 44 38" fill="none">
			<Path
				d="M22.0498 38.004L0.361803 0.507571L43.6631 0.500532L22.0498 38.004Z"
				fill={color}
			/>
		</Svg>
	)
}

export default Triangle
