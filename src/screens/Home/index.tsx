import React, { useEffect, useState } from "react"

import { FlatList, Text, TouchableOpacity } from "react-native"
import * as S from "./styles"

import HomeItem from "../../components/HomeItem"
import DatePicker from "../../components/DatePicker"

import { AntDesign } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"

import { DrawerActions, NavigationProp, useNavigation } from "@react-navigation/native"
import { Schedule } from "../../models/Schedule/types"
import { scheduleService } from "../../models/Schedule/scheduleService"
import { daysOfWeek } from "../../utlis/daysOfWeek"
import { months } from "../../utlis/months"

export default function Home() {
	const navigation = useNavigation()

	const [data, setData] = useState<Schedule[]>([])
	const [date, setDate] = useState(new Date())
	const [showDatePicker, setShowDatePicker] = useState(false)

	useEffect(() => {
		const unsub = scheduleService.getScheduleRealtTime(date, setData)

		return unsub
	}, [date])

	function getWeekDayName() {
		return daysOfWeek[date.getDay()]
	}

	function getMothName() {
		return months[date.getMonth()]
	}
	return (
		<>
			<S.Header>
				<TouchableOpacity
					onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
					<Entypo name="menu" size={28} color="#fff" />
				</TouchableOpacity>
				<S.Title>Atendimentos de hoje</S.Title>
			</S.Header>
			<S.Container>
				<S.Welcome>Olá, Vanny!</S.Welcome>
				<S.DataContainer>
					<TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
						<AntDesign name="calendar" size={24} color="#fff" />
					</TouchableOpacity>
					<S.Date>
						{getWeekDayName()}, {date.getDate()} de {getMothName()} de{" "}
						{date.getFullYear()}
					</S.Date>
				</S.DataContainer>

				{data.length > 0 ? (
					<FlatList
						style={{ marginTop: "7%" }}
						data={data}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <HomeItem data={item} />}
					/>
				) : (
					<Text
						style={{
							color: "#fc1303",
							textAlign: "center",
							marginTop: "10%",
						}}>
						Não teve clientes agendadas este dia
					</Text>
				)}

				{showDatePicker && (
					<DatePicker
						date={date}
						setDate={setDate}
						setShowDatePicker={setShowDatePicker}
					/>
				)}
			</S.Container>
		</>
	)
}
