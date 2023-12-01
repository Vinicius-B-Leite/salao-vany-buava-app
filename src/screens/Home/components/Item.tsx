import React, { useEffect, useState } from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { Dimensions, FlatList } from "react-native"

import { ref, remove } from "firebase/database"
import { db } from "../../../service/firebase"

import { Schedule } from "../../../models/Schedule/types"

import { proceedingsService } from "../../../models/Proceedings/proceedingsService"
import {
	Box,
	BoxPressable,
	BoxType,
	Icon,
	mapTypeProceedingsIcon,
	Text,
} from "@/components"
import { format } from "date-fns"
import { useHomeItem } from "../hooks/useHomeItem"

const { height } = Dimensions.get("screen")

type HomeItemProps = {
	data: Schedule
}

export default function HomeItem({ data }: HomeItemProps) {
	const { handleNavigateToUpdateSchedule, handleRemove, proceedings } =
		useHomeItem(data)
	const mapTranslateIcon: Record<
		"cabelo" | "unha" | "cilios",
		keyof typeof mapTypeProceedingsIcon
	> = {
		cabelo: "hair",
		unha: "nail",
		cilios: "eyeslash",
	}
	return (
		<BoxPressable
			onPress={() => handleNavigateToUpdateSchedule()}
			onLongPress={() => handleRemove()}
			height={65}
			mb="s30">
			<Box {...wrapper}>
				<Box flex={0.25}>
					<Icon name={mapTranslateIcon[data.type] || "hair"} size={40} />
				</Box>
				<Box justifyContent="center" flex={0.5}>
					<Text variant="pRegular" mb="s2">
						{data.clientName}
					</Text>
					<Text variant="pMinimun">{format(data.hour, "HH:mm")}</Text>
				</Box>
				<Box flex={0.25}>
					<FlatList
						style={{ height: height / 18 }}
						data={proceedings}
						keyExtractor={(item) => item}
						renderItem={({ item }) => (
							<Text variant="pRegular" numberOfLines={1}>
								{item}
							</Text>
						)}
					/>
				</Box>
			</Box>
		</BoxPressable>
	)
}

const wrapper: BoxType = {
	bg: "contrastSecond",
	flexDirection: "row",
	borderRadius: "s5",
	p: "s16",
	alignItems: "center",
}
