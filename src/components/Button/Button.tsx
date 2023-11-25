import React from "react"
import { PressableProps } from "react-native"
import { BoxPressable, BoxType } from "../Box/Box"
import Text from "../Text/Text"
import Spinner from "../Spinner/Spinner"

type ButtonProps = PressableProps &
	BoxType & {
		title: string
		isLoading?: boolean
		disabled?: boolean
	}

const Button: React.FC<ButtonProps> = ({
	title,
	isLoading = false,
	disabled = false,
	...rest
}) => {
	return (
		<BoxPressable
			width={280}
			height={47}
			borderRadius="s5"
			mt={"s30"}
			backgroundColor={disabled ? "contrastSecond" : "contrast"}
			justifyContent="center"
			alignItems="center"
			disabled={disabled || isLoading}
			{...rest}>
			{isLoading ? (
				<Spinner />
			) : (
				<Text variant="pRegularBold" color={disabled ? "textSecond" : "text"}>
					{title}
				</Text>
			)}
		</BoxPressable>
	)
}

export default Button
