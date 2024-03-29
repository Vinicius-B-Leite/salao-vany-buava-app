import React from "react"
import { View } from "react-native"
import { Path, Svg } from "react-native-svg"

type LeftIconProps = {
	color: string
	size: number
}
export const LeftIcon: React.FC<LeftIconProps> = ({ color, size }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
			<Path
				d="M9.5 14.4688L17.4688 6.5C18.0195 5.94922 18.9102 5.94922 19.4551 6.5L20.2852 7.42969C20.2852 7.42969 20.7852 8.42969 19.6484 9.46484L13.1426 15.4648L19.6484 21.4297C21 22.5 21.0508 22.9551 20.5 23.5L19.4609 24.4297C18.9102 24.9805 18.0195 24.9805 17.4746 24.4297L9.50586 16.4609C8.94922 15.9102 8.94922 15.0195 9.5 14.4688Z"
				fill={color}
			/>
		</Svg>
	)
}
