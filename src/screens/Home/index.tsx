import React, { useEffect, useState } from "react"

import { FlatList } from "react-native"

import HomeItem from "./components/Item"
import DatePicker from "../../components/DatePicker"

import { Schedule } from "../../models/Schedule/types"
import { scheduleService } from "../../models/Schedule/scheduleService"
import Header from "./components/Header"
import DateSelected from "./components/DateSelected"

import { Spinner, Container, Text } from "@/components"

export default function Home() {
	const [data, setData] = useState<Schedule[]>([])
	const [date, setDate] = useState(new Date())
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const unsub = scheduleService.getScheduleRealtTime(date, setData, setLoading)

		return unsub
	}, [date])

	return (
		<>
			<Header />
			<Container>
				<Text variant="tMax" mb="s16">
					Olá, Vanny!
				</Text>
				<DateSelected date={date} openCalendar={() => setShowDatePicker(true)} />

				{loading ? (
					<Spinner size={40} />
				) : (
					<FlatList
						data={data}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <HomeItem data={item} />}
						ListEmptyComponent={() => (
							<Text variant="pRegular" color="alert">
								Não teve clientes agendadas este dia
							</Text>
						)}
					/>
				)}

				<DatePicker
					visible={showDatePicker}
					date={date}
					setDate={setDate}
					setShowDatePicker={setShowDatePicker}
				/>
			</Container>
		</>
	)
}
