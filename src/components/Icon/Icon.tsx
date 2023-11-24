import CheckIcon from "@/assets/CheckIcon"
import Eyeslash from "@/assets/EyeslashIcon"
import HairIcon from "@/assets/HairIcon"
import NailIcon from "@/assets/NailIcon"
import Triangle from "@/assets/Triangle"
import { Theme } from "@/theme"
import { useTheme } from "@shopify/restyle"
import React from "react"
import { AntDesign } from "@expo/vector-icons"
import EyeIcon from "@/assets/EyeIcon"
import EyeHide from "@/assets/EyeHideIcon"

type IconProps = {
	name: keyof typeof mapIcons
	color?: keyof Theme["colors"]
	size?: number
}

const Icon: React.FC<IconProps> = ({ color, name, size = 20 }) => {
	const theme = useTheme()
	const SVGIcon = mapIcons[name]
	return <SVGIcon color={theme.colors[color || "text"]} size={size} />
}

const mapIcons = {
	check: CheckIcon,
	eyeslash: Eyeslash,
	hair: HairIcon,
	nail: NailIcon,
	triangle: Triangle,
}

export default Icon
