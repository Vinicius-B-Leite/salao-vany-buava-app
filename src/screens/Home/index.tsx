import { FlatList } from "react-native"

import HomeItem from "./components/Item"
import Header from "./components/Header"
import DateSelected from "./components/DateSelected"

import { Spinner, Container, Text, DatePicker, Box } from "@/components"
import { useHome } from "./hooks/useHome"

export function Home() {
	const { data, loading, onChangeDate, showDatePicker, toggleDatePicker, date } =
		useHome()

	return (
		<>
			<Header />
			<Container mb="s66">
				<Text variant="tMax" mb="s16">
					Olá, Vanny!
				</Text>
				<DateSelected date={date} openCalendar={toggleDatePicker} />

				{loading ? (
					<Spinner size={40} />
				) : (
					<FlatList
						data={data}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => <HomeItem data={item} />}
						ListEmptyComponent={() => (
							<Text variant="pRegular" color="alert">
								Não teve clientes agendadas este dia
							</Text>
						)}
					/>
				)}

				<DatePicker
					value={date}
					visible={showDatePicker}
					onChangeValue={onChangeDate}
					setShow={toggleDatePicker}
				/>
			</Container>
		</>
	)
}
