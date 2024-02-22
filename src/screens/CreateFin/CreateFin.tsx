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

export const CreateFin: React.FC = () => {
	const {
		control,
		formState: { isValid },
		handleSubmit,
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

	const { submit } = useCreateFin()

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
				name="paymentForm"
				render={({ field: { onChange, value } }) => (
					<TypePicker
						selectedType={value}
						setSelectedType={onChange}
						width={"100%"}
						options={[
							{
								label: "Despesa",
								value: "despesa",
							},
							{
								label: "Receita",
								value: "receita",
							},
						]}
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
						options={[
							{
								label: "Crédito",
								value: "credito",
							},
							{
								label: "Débito",
								value: "debito",
							},
							{
								label: "Dinheiro",
								value: "dinheiro",
							},
							{
								label: "Pix",
								value: "pix",
							},
						]}
					/>
				)}
			/>

			<Controller
				control={control}
				name="paymentForm"
				render={({ field: { onChange, value } }) => (
					<TypePicker
						selectedType={value}
						setSelectedType={onChange}
						width={"100%"}
						options={[
							{
								label: "Pessoal",
								value: "pessoal",
							},
							{
								label: "Salão",
								value: "salao",
							},
						]}
					/>
				)}
			/>

			<Button
				onPress={handleSubmit(submit)}
				title="Salvar"
				isLoading={false}
				disabled={!isValid}
				width={"100%"}
			/>
		</Container>
	)
}
