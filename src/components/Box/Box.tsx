import { Theme } from "@/theme"
import {
	createBox,
	createRestyleComponent,
	BackgroundColorProps,
	OpacityProps,
	LayoutProps,
	SpacingProps,
	BorderProps,
	ShadowProps,
	PositionProps,
	VisibleProps,
	SpacingShorthandProps,
	BackgroundColorShorthandProps,
	spacing,
	backgroundColor,
	opacity,
	layout,
	border,
	shadow,
	visible,
	spacingShorthand,
	backgroundColorShorthand,
	position,
} from "@shopify/restyle"
import React from "react"
import { Pressable, PressableProps } from "react-native"

export const Box = createBox<Theme>()
export type BoxType = React.ComponentProps<typeof Box>

type BoxPressableProps = SpacingProps<Theme> &
	BackgroundColorProps<Theme> &
	OpacityProps<Theme> &
	LayoutProps<Theme> &
	BorderProps<Theme> &
	ShadowProps<Theme> &
	PositionProps<Theme> &
	VisibleProps<Theme> &
	SpacingShorthandProps<Theme> &
	BackgroundColorShorthandProps<Theme> &
	PressableProps

export const BoxPressable = createRestyleComponent<BoxPressableProps, Theme>(
	[
		spacing,
		backgroundColor,
		opacity,
		layout,
		border,
		shadow,
		visible,
		spacingShorthand,
		backgroundColorShorthand,
	],
	Pressable
)
