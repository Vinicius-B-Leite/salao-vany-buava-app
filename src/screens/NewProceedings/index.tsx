import React from "react"

import { Button, Container, FormInput, TypePicker } from "@/components"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewProceedingsForm, newProceedingsSchema } from "./newProceedingsSchema"
import { useNewProceedings } from "./useNewProceedings"

export function NewProceedings() {
	const { control, formState, handleSubmit, reset } = useForm<NewProceedingsForm>({
		resolver: zodResolver(newProceedingsSchema),
		defaultValues: {
			proceedingsName: "",
			type: "cabelo",
		},
		mode: "onChange",
	})
	const { loading, submit } = useNewProceedings(reset)

	return (
		<Container scrollEnabled>
			<FormInput
				control={control}
				name="proceedingsName"
				placeholder="Nome do procedimento"
				boxProps={{ width: "100%", mb: "s16" }}
			/>

			<Controller
				control={control}
				name="type"
				render={({ field: { onChange, value } }) => (
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
						width="100%"
					/>
				)}
			/>

			<Button
				title="Cadastrar"
				isLoading={loading}
				disabled={!formState.isValid}
				onPress={handleSubmit(submit)}
				width={"100%"}
			/>
		</Container>
	)
}
