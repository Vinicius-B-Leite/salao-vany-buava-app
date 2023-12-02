import React from "react"
import { View } from "react-native"
import { Defs, Image, Line, Path, Pattern, Rect, Svg, Use } from "react-native-svg"

type EyeHideProps = {
	color: string
	size: number
}

const EyeHide: React.FC<EyeHideProps> = ({ color, size }) => {
	return (
		<Svg width={size + 15} height={size + 10} viewBox="0 0 34 36" fill="none">
			<Path
				d="M17 9C10.1818 9 4.35909 13.1467 2 19C4.35909 24.8533 10.1818 29 17 29C23.8182 29 29.6409 24.8533 32 19C29.6409 13.1467 23.8182 9 17 9ZM17 25.6667C13.2364 25.6667 10.1818 22.68 10.1818 19C10.1818 15.32 13.2364 12.3333 17 12.3333C20.7636 12.3333 23.8182 15.32 23.8182 19C23.8182 22.68 20.7636 25.6667 17 25.6667ZM17 15C14.7364 15 12.9091 16.7867 12.9091 19C12.9091 21.2133 14.7364 23 17 23C19.2636 23 21.0909 21.2133 21.0909 19C21.0909 16.7867 19.2636 15 17 15Z"
				fill="white"
			/>
			<Line
				x1="2.59736"
				y1="2.654"
				x2="30.5974"
				y2="33.654"
				stroke="#0C031E"
				stroke-width="7"
			/>
			<Line
				x1="3.48421"
				y1="3.65943"
				x2="31.4842"
				y2="34.6594"
				stroke="white"
				stroke-width="4"
			/>
			<Line
				x1="3.48421"
				y1="3.65943"
				x2="31.4842"
				y2="34.6594"
				stroke="white"
				stroke-width="4"
			/>
			<Line
				x1="3.48421"
				y1="3.65943"
				x2="31.4842"
				y2="34.6594"
				stroke="white"
				stroke-width="4"
			/>
		</Svg>
	)
}

export default EyeHide
