import {
	Box,
	Button,
	Container,
	DateTimeInput,
	FormInput,
	TypePicker,
} from "@/components"
import React from "react"
import { Controller, useForm } from "react-hook-form"

import { CreateFinForm, creatFinSchema } from "./createFinSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateFin } from "./useCreateFin"
import { category, moneyFlux, paymentForm } from "@/models"

export const CreateFin: React.FC = () => {
	const {
		control,
		formState: { isValid },
		handleSubmit,
		reset,
	} = useForm<CreateFinForm>({
		resolver: zodResolver(creatFinSchema),
		defaultValues: {
			clientName: "",
			proceedings: "",
			type: "despesa",
			date: new Date(),
			value: "",
			paymentForm: "pix",
			category: "salao",
		},
		mode: "onChange",
	})

	const { submit, loading } = useCreateFin(reset)

	return (
		<Container>
			<FormInput
				name="clientName"
				control={control}
				placeholder="Nome da cliente"
				boxProps={{
					width: "100%",
				}}
			/>

			<FormInput
				control={control}
				name="proceedings"
				placeholder="Procedimentos"
				boxProps={{
					width: "100%",
				}}
			/>

			<Controller
				control={control}
				name="type"
				render={({ field: { onChange, value } }) => (
					<TypePicker
						selectedType={value}
						setSelectedType={onChange}
						width={"100%"}
						options={moneyFlux}
					/>
				)}
			/>
			<Box flexDirection="row" justifyContent="space-between" alignItems="center">
				<DateTimeInput control={control} name="date" type="date" />
				<FormInput
					control={control}
					name="value"
					placeholder="R$ 00,00"
					boxProps={{ width: 100, mt: undefined }}
					keyboardType="numeric"
				/>
			</Box>

			<Controller
				control={control}
				name="paymentForm"
				render={({ field: { onChange, value } }) => (
					<TypePicker
						selectedType={value}
						setSelectedType={onChange}
						width={"100%"}
						options={paymentForm}
					/>
				)}
			/>

			<Controller
				control={control}
				name="category"
				render={({ field: { onChange, value } }) => (
					<TypePicker
						selectedType={value}
						setSelectedType={onChange}
						width={"100%"}
						options={category}
					/>
				)}
			/>

			<Button
				onPress={handleSubmit(submit)}
				title="Salvar"
				isLoading={loading}
				disabled={!isValid}
				width={"100%"}
			/>
		</Container>
	)
}
