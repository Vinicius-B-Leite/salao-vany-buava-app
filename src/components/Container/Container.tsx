import React from "react"
import { ScrollView, View } from "react-native"
import { Box, BoxType } from "../Box/Box"

type ContainerProps = BoxType & {
	scrollEnabled?: boolean
	children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
	children,
	scrollEnabled = false,
	...rest
}) => {
	const Wrapper = scrollEnabled ? ScrollView : View
	return (
		<Box backgroundColor="bg" flex={1} padding="s40" {...rest}>
			<Wrapper
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled">
				{children}
			</Wrapper>
		</Box>
	)
}

export default Container
