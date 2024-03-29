import React from "react"

import {
	Button,
	FormInput,
	DateTimeInput,
	Container,
	InputDropdown,
	Text,
	ProcedingsModal,
	TypePicker,
} from "@/components"
import { Controller, useForm } from "react-hook-form"
import { ScheduleForm, scheduleSchema } from "./scheduleSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Row from "./components/Row"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { AppRouteParamsList } from "@/routes"
import useSchedule from "./useSchedule"

type ScreenProps = DrawerScreenProps<AppRouteParamsList, "ScheduleClient">
export function Schedule({ route, navigation }: ScreenProps) {
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

	const { loading, proceddingsModalVisible, submit, toggleModal } = useSchedule({
		handleReset: () => {
			reset({
				clientName: "",
				date: new Date(),
				hour: new Date(),
				proceedgins: [],
				totalValue: "",
				type: "cabelo",
			})
		},
		routeParams,
	})

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
						<TypePicker
							options={[
								{
									label: "Cabelo",
									value: "cabelo",
								},
								{
									label: "Unha",
									value: "unha",
								},
								{
									label: "Cílios",
									value: "cilios",
								},
							]}
							selectedType={value}
							setSelectedType={onChange}
						/>
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

			<InputDropdown title="Procedimentos" onPress={toggleModal} />
			<Text color="alert">{getFieldState("proceedgins").error?.message}</Text>

			<Controller
				control={control}
				name="proceedgins"
				render={({ field }) => (
					<ProcedingsModal
						setProccedingsModalVisible={toggleModal}
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
