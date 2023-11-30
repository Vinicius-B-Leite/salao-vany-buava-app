// import React, { useEffect, useState } from "react"
// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

// import {
// 	ActivityIndicator,
// 	KeyboardAvoidingView,
// 	Platform,
// 	TouchableOpacity,
// } from "react-native"
// import * as S from "../Schedule/styles"

// import DatePicker from "../../components/DatePicker"
// import HourPicker from "../../components/HourPicker"
// import TypePicker from "../../components/TypePicker"
// import ProcedingsModal from "../../components/ProcedingsModal"

// import { Feather } from "@expo/vector-icons"
// import { Entypo } from "@expo/vector-icons"

// import { format } from "date-fns"
// import { AppHomeStackParamslist } from "../../routes/appHomeStack"
// import { scheduleService } from "../../models/Schedule/scheduleService"

// type Route = RouteProp<AppHomeStackParamslist, "UpdateSchedule">

// export default function UpdateSchedule() {
// 	const params = useRoute<Route>().params.data
// 	const navigator = useNavigation()

// 	const [showDatePicker, setShowDatePicker] = useState(false)
// 	const [showHourPicker, setShowHourPicker] = useState(false)
// 	const [proceddingsModalVisible, setProccedingsModalVisible] = useState(false)
// 	const [errorMessage, setErrorMessage] = useState()
// 	const [loading, setLoading] = useState(false)

// 	const [clientName, setClientName] = useState(params.clientName)
// 	const [selectedType, setSelectedType] = useState(params.type)
// 	const [totalValue, setTotalValue] = useState(params.totalValue)
// 	const [date, setDate] = useState(new Date(params.date))
// 	const [hour, setHour] = useState(new Date(params.date))

// 	var proceedingsKeys = params.proceedingsKeys

// 	const [selectedProceedings, setSelectedProceedings] = useState([])

// 	async function updateShedule() {
// 		setLoading(true)

// 		try {
// 			await scheduleService.updateSchedule({
// 				clientName,
// 				date,
// 				hour: format(hour, "HH/mm"),
// 				id: params.id,
// 				proceedingsKeys:
// 					selectedProceedings.length > 0
// 						? selectedProceedings.map((item) => String(item.id))
// 						: proceedingsKeys,
// 				type: selectedType,
// 				totalValue,
// 			})
// 			navigator.goBack()
// 		} catch (error) {
// 		} finally {
// 			setLoading(false)
// 		}
// 	}
// 	return (
// 		<KeyboardAvoidingView
// 			style={{ flex: 1 }}
// 			behavior={Platform.OS === "ios" ? "padding" : "height"}
// 			enabled={false}>
// 			<S.Container>
// 				<S.Main>
// 					{errorMessage && <S.Error>{errorMessage}</S.Error>}
// 					<S.Input
// 						placeholder="Nome da cliente"
// 						value={clientName}
// 						onChangeText={setClientName}
// 					/>

// 					<S.Row>
// 						<TypePicker
// 							selectedType={selectedType}
// 							setSelectedType={setSelectedType}
// 						/>
// 						<S.Input
// 							placeholder="Valor"
// 							width="50%"
// 							value={totalValue}
// 							onChangeText={setTotalValue}
// 							keyboardType="numeric"
// 						/>
// 					</S.Row>

// 					<S.Row>
// 						<S.Row width="45%">
// 							<TouchableOpacity
// 								onPress={() => setShowDatePicker(!showDatePicker)}>
// 								<Entypo name="calendar" size={24} color="#fff" />
// 							</TouchableOpacity>
// 							<S.Input
// 								placeholder="Data"
// 								width="70%"
// 								value={format(date, "dd/MM/yyyy")}
// 								editable={false}
// 							/>
// 							{showDatePicker && (
// 								<DatePicker
// 									date={date}
// 									setDate={setDate}
// 									setShowDatePicker={setShowDatePicker}
// 								/>
// 							)}
// 						</S.Row>

// 						<S.Row width="45%">
// 							<TouchableOpacity
// 								onPress={() => setShowHourPicker(!showHourPicker)}>
// 								<Feather name="clock" size={24} color="#fff" />
// 							</TouchableOpacity>
// 							{showHourPicker && (
// 								<HourPicker
// 									hour={hour}
// 									setHour={setHour}
// 									setShowHourPicker={setShowHourPicker}
// 								/>
// 							)}
// 							<S.Input
// 								width="70%"
// 								value={format(hour, "HH:mm")}
// 								editable={false}
// 							/>
// 						</S.Row>
// 					</S.Row>

// 					<TouchableOpacity onPress={() => setProccedingsModalVisible(true)}>
// 						<S.Row>
// 							<S.ScheduleTitle>Procedimentos</S.ScheduleTitle>
// 							<Entypo name="triangle-down" size={24} color="#fff" />
// 							<S.Underline />
// 						</S.Row>
// 					</TouchableOpacity>
// 					<ProcedingsModal
// 						setProccedingsModalVisible={setProccedingsModalVisible}
// 						proceddingsModalVisible={proceddingsModalVisible}
// 						type={selectedType}
// 						selectedProceedings={selectedProceedings}
// 						setSelectedProceedings={setSelectedProceedings}
// 						proceedingsKeys={proceedingsKeys}
// 					/>

// 					<S.Button onPress={() => updateShedule()}>
// 						<S.ButtonText>
// 							{loading ? (
// 								<ActivityIndicator color="#fff" size={24} />
// 							) : (
// 								"Salvar"
// 							)}
// 						</S.ButtonText>
// 					</S.Button>
// 				</S.Main>
// 			</S.Container>
// 		</KeyboardAvoidingView>
// 	)
// }

export default function UpdateProcedings() {
	return <></>
}
