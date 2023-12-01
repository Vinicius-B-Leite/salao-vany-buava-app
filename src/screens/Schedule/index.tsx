import React, { useState } from "react"

import TypePicker from "../../components/TypePicker"
import ProcedingsModal from "../../components/ProcedingsModal"

import { scheduleService } from "../../models/Schedule/scheduleService"
import {
	Button,
	FormInput,
	DateTimeInput,
	Box,
	Container,
	InputDropdown,
	Text,
} from "@/components"
import { Controller, useForm } from "react-hook-form"
import { ScheduleForm, scheduleSchema } from "./scheduleSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Row from "./components/Row"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { AppRouteParamsList } from "@/routes/app.route"

type ScreenProps = DrawerScreenProps<AppRouteParamsList, "ScheduleClient">
export default function Schedule({ route, navigation }: ScreenProps) {
	const routeParams = route?.params?.data

	const { control, formState, handleSubmit, watch, getFieldState, reset } =
		useForm<ScheduleForm>({
			resolver: zodResolver(scheduleSchema),
			defaultValues: {
				clientName: "",
				date: new Date(),
				hour: new Date(),
				proceedgins: [],
				totalValue: "",
				type: "cabelo",
			},
			values: routeParams
				? {
						clientName: routeParams?.clientName,
						date: routeParams?.date,
						hour: routeParams?.hour,
						proceedgins: routeParams?.proceedingsKeys,
						totalValue: routeParams?.totalValue.toString(),
						type: routeParams?.type,
				  }
				: undefined,

			mode: "onChange",
		})

	const [proceddingsModalVisible, setProccedingsModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	async function submit(data: ScheduleForm) {
		setLoading(true)

		try {
			const { clientName, date, hour, proceedgins, totalValue, type } = data
			const isUpdatading = !!routeParams

			await scheduleService[isUpdatading ? "updateSchedule" : "createSchedule"]({
				clientName,
				date,
				hour,
				proceedingsKeys: proceedgins,
				totalValue: Number(totalValue),
				type: type,
				id: routeParams?.id || "",
			})
			reset({
				clientName: "",
				date: new Date(),
				hour: new Date(),
				proceedgins: [],
				totalValue: "",
				type: "cabelo",
			})
			navigation.reset({
				index: 1,
				routes: [
					{
						name: "ScheduleClient",
						state: undefined,
					},
					{
						name: "ScheduleToday",
					},
				],
			})
		} catch (error) {
			console.log(`submit - Schedule (Screen) - line 70 ${error}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container scrollEnabled>
			<FormInput
				control={control}
				name="clientName"
				placeholder="Nome da cliente"
				errorMessage={formState.errors.clientName?.message}
				boxProps={{ width: "100%" }}
			/>

			<Row mt="s30">
				<Controller
					control={control}
					name="type"
					render={({ field: { value, onChange } }) => (
						<TypePicker selectedType={value} setSelectedType={onChange} />
					)}
				/>
				<FormInput
					control={control}
					name="totalValue"
					placeholder="Valor"
					keyboardType="numeric"
					errorMessage={formState.errors.totalValue?.message}
					boxProps={{
						width: 100,
						mt: undefined,
					}}
				/>
			</Row>

			<Row>
				<DateTimeInput control={control} name="date" type="date" />
				<DateTimeInput control={control} name="hour" type="time" />
			</Row>

			<InputDropdown
				title="Procedimentos"
				onPress={() => setProccedingsModalVisible(true)}
			/>
			<Text color="alert">{getFieldState("proceedgins").error?.message}</Text>

			<Controller
				control={control}
				name="proceedgins"
				render={({ field }) => (
					<ProcedingsModal
						setProccedingsModalVisible={setProccedingsModalVisible}
						proceddingsModalVisible={proceddingsModalVisible}
						type={watch().type}
						selectedProceedings={field.value}
						setSelectedProceedings={field.onChange}
					/>
				)}
			/>

			<Button
				onPress={handleSubmit(submit)}
				title="Agendar"
				isLoading={loading}
				disabled={!formState.isValid}
				width={"100%"}
			/>
		</Container>
	)
}
