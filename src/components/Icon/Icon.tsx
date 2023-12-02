import CheckIcon from "@/assets/CheckIcon"
import Eyeslash from "@/assets/EyeslashIcon"
import HairIcon from "@/assets/HairIcon"
import NailIcon from "@/assets/NailIcon"
import Triangle from "@/assets/Triangle"
import { useAppTheme } from "@/hooks"
import { Theme } from "@/theme"
import React from "react"

type IconProps = {
	name: keyof typeof mapIcons
	color?: keyof Theme["colors"]
	size?: number
}

export const Icon: React.FC<IconProps> = ({ color, name, size = 20 }) => {
	const theme = useAppTheme()
	const SVGIcon = mapIcons[name]
	return <SVGIcon color={theme.colors[color || "text"]} size={size} />
}
export const mapTypeProceedingsIcon = {
	eyeslash: Eyeslash,
	hair: HairIcon,
	nail: NailIcon,
}
export const mapIcons = {
	check: CheckIcon,
	triangle: Triangle,
	...mapTypeProceedingsIcon,
}
