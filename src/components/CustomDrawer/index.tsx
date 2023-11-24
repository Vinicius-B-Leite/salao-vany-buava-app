import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer"
import React from "react"
import { Dimensions, Text, View } from "react-native"
import Logo from "../../assets/logo.png"
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types"

const { height } = Dimensions.get("screen")

export default function CustomDrawer(props: DrawerContentComponentProps) {
	return (
		<DrawerContentScrollView {...props}>
			<View style={{ marginTop: "10%", marginBottom: "10%" }}>
				{/* <LogoSvg width="100%" height={height / 5.5} /> */}
				<Text
					style={{
						color: "#fff",
						textAlign: "center",
						fontSize: 15,
					}}>
					Seja bem-vinda!
				</Text>
			</View>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	)
}
