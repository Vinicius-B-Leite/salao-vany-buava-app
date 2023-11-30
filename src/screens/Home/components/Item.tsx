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

const { height } = Dimensions.get("screen")

type HomeItemProps = {
	data: Schedule
}

export default function HomeItem({ data }: HomeItemProps) {
	const [proceedings, setProceedings] = useState<string[]>([])
	const navigation = useNavigation()

	const mapTranslateIcon: Record<
		"cabelo" | "unha" | "cilios",
		keyof typeof mapTypeProceedingsIcon
	> = {
		cabelo: "hair",
		unha: "nail",
		cilios: "eyeslash",
	}
	useEffect(() => {
		function getProceedingsName() {
			let p = data?.proceedingsKeys

			setProceedings([])
			p?.forEach(async (item) => {
				const proceedings = await proceedingsService.getSingleProceeding(
					item,
					data.type
				)
				if (!proceedings) return
				let proceedingsName = Object.values(proceedings).toString()
				function toCapitalize(str: string) {
					return str.charAt(0).toUpperCase() + str.slice(1)
				}
				setProceedings((oldP) => [...oldP, toCapitalize(proceedingsName)])
			})
		}
		getProceedingsName()
	}, [data])

	function handleRemove() {
		remove(ref(db, "agenda/" + data.id))
	}
	function handleNavigateToUpdateSchedule() {
		const newDate = new Date(data.date)

		const [day, month, year] = data.date.toString().split("/")

		newDate.setMonth(Number(month))
		newDate.setFullYear(Number(year))
		newDate.setDate(Number(day))

		navigation.navigate("ScheduleClient", { data: { ...data, date: newDate } })
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
