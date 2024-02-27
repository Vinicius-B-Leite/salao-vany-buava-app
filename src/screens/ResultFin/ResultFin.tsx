import { FinStackRoutes } from "@/routes/FinStackRoutes"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect } from "react"
import { FlatList } from "react-native"
import { drawerStyle } from "@/routes"
import { Box, BoxPressable, Container, Icon, Text } from "@/components"

import { useResultFin } from "./useResultFin"
import { format } from "date-fns"
import { category } from "@/models"

export const ResultFin: React.FC = () => {
	const params = useRoute<RouteProp<FinStackRoutes, "ResultFin">>().params
	const navigation = useNavigation()
	const { activity, toogleActivity, handleDeleteFin } = useResultFin()
	useEffect(() => {
		navigation
			.getParent("drawer" as unknown as undefined)
			?.setOptions({ headerShown: false, swipeEnabled: false })

		const removeListener = navigation.addListener("beforeRemove", () => {
			navigation.getParent("drawer" as unknown as undefined)?.setOptions({
				...drawerStyle,
				unmountOnBlur: true,
				headerShown: true,
				swipeEnabled: true,
			})
		})

		return () => {
			removeListener()
		}
	}, [])

	const deleteFin = (id: string) => {
		if (params.searchBy.field === "day") {
			handleDeleteFin(id, params.category, {
				day: params.searchBy.value,
				month: "",
				year: "",
			})
		}
		if (params.searchBy.field === "month") {
			handleDeleteFin(id, params.category, {
				month: params.searchBy.value,
				year: "",
				day: "",
			})
		}
		if (params.searchBy.field === "year") {
			handleDeleteFin(id, params.category, {
				year: params.searchBy.value,
				month: "",
				day: "",
			})
		}
	}
	return (
		<Container pt="s12">
			<BoxPressable
				flexDirection="row"
				onPress={navigation.goBack}
				alignItems="center">
				<Icon name="left" size={30} />
				<Text variant="tRegular">{params.date}</Text>
			</BoxPressable>
			<Box flexDirection="row" justifyContent="space-evenly" mt="s40">
				<BoxPressable onPress={toogleActivity}>
					<Text variant="tRegular">Entrada</Text>
					{activity === "Entrada" && (
						<Box width={"100%"} height={3} backgroundColor={"contrast"} />
					)}
				</BoxPressable>
				<BoxPressable onPress={toogleActivity}>
					<Text variant="tRegular">Saída</Text>
					{activity === "Saída" && (
						<Box width={"100%"} height={3} backgroundColor={"contrast"} />
					)}
				</BoxPressable>
			</Box>
			<Box>
				<FlatList
					data={params.finances.filter((fin) =>
						activity === "Entrada"
							? fin.type == "receita"
							: fin.type == "despesa"
					)}
					renderItem={({ item }) => (
						<BoxPressable
							onPress={() => deleteFin(item.id)}
							flexDirection="row"
							justifyContent="space-between"
							mt="s12"
							bg="contrastSecond"
							p="s16"
							borderRadius="s5"
							alignItems="center">
							<Box>
								<Text variant="pRegularBold">
									{item.clientName} - {item.proceedings}
								</Text>

								<Text variant="pMinimun">
									{item.paymentForm} {format(item.date, "dd/MM/yy")}
								</Text>
							</Box>
							<Text variant="tRegular">R${item.value}</Text>
						</BoxPressable>
					)}
					ListEmptyComponent={() => (
						<Text variant="pRegular">Não há registros</Text>
					)}
				/>
			</Box>
		</Container>
	)
}
