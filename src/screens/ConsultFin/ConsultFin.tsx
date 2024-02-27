import { Box, Button, Container, FormInput, TypePicker } from "@/components"
import { category } from "@/models"
import React from "react"
import { Controller, useForm } from "react-hook-form"

import { ConsultFinForm, consultFinSchema } from "./consultFinSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useConsultFin } from "./usseConsultFin"

export const ConsultFin: React.FC = () => {
	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<ConsultFinForm>({
		resolver: zodResolver(consultFinSchema),
		defaultValues: {
			category: category[0].value,
			date: {
				day: "",
				month: "",
				year: "",
			},
		},
	})
	const { handleConsultFin, isLoading } = useConsultFin()

	return (
		<Container>
			<Controller
				control={control}
				name="category"
				render={({ field: { onChange, value } }) => (
					<TypePicker
						selectedType={value}
						setSelectedType={onChange}
						options={category}
						width={"100%"}
					/>
				)}
			/>
			<Box flexDirection="row" justifyContent="space-between">
				<FormInput
					control={control}
					name="date.day"
					placeholder="Dia"
					keyboardType="numeric"
					maxLength={2}
					boxProps={{ width: 100 }}
				/>
				<FormInput
					control={control}
					name="date.month"
					placeholder="Mês"
					keyboardType="numeric"
					maxLength={2}
					boxProps={{ width: 100 }}
				/>
				<FormInput
					control={control}
					name="date.year"
					placeholder="Ano"
					keyboardType="numeric"
					maxLength={2}
					boxProps={{ width: 100 }}
				/>
			</Box>

			<Button
				title="Consultar"
				disabled={!isValid}
				isLoading={isLoading}
				width={"100%"}
				onPress={handleSubmit(handleConsultFin)}
			/>
		</Container>
	)
}
