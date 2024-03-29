import React from "react"
import { View } from "react-native"
import { Path, Svg } from "react-native-svg"

type EyeIconProps = {
	color: string
	size: number
}

const EyeIcon: React.FC<EyeIconProps> = ({ color, size }) => {
	return (
		<Svg width={size + 10} height={size} viewBox="0 0 30 20" fill="none">
			<Path
				d="M15 0C8.18182 0 2.35909 4.14667 0 10C2.35909 15.8533 8.18182 20 15 20C21.8182 20 27.6409 15.8533 30 10C27.6409 4.14667 21.8182 0 15 0ZM15 16.6667C11.2364 16.6667 8.18182 13.68 8.18182 10C8.18182 6.32 11.2364 3.33333 15 3.33333C18.7636 3.33333 21.8182 6.32 21.8182 10C21.8182 13.68 18.7636 16.6667 15 16.6667ZM15 6C12.7364 6 10.9091 7.78667 10.9091 10C10.9091 12.2133 12.7364 14 15 14C17.2636 14 19.0909 12.2133 19.0909 10C19.0909 7.78667 17.2636 6 15 6Z"
				fill={color}
			/>
		</Svg>
	)
}

export default EyeIcon
