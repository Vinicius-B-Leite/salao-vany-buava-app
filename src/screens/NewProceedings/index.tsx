import React, { useState } from "react"

import TypePicker from "../../components/TypePicker"

import { proceedingsService } from "../../models/Proceedings/proceedingsService"
import { Button, Container, FormInput, Input } from "@/components"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewProceedingsForm, newProceedingsSchema } from "./newProceedingsSchema"

export default function NewProceedings() {
	const { control, formState, handleSubmit, reset } = useForm<NewProceedingsForm>({
		resolver: zodResolver(newProceedingsSchema),
		defaultValues: {
			proceedingsName: "",
			type: "cabelo",
		},
		mode: "onChange",
	})
	const [loading, setLoading] = useState(false)

	async function submit(data: NewProceedingsForm) {
		try {
			setLoading(true)
			const { proceedingsName, type } = data
			await proceedingsService.createProceedings(proceedingsName, type)
			reset()
		} catch (error) {
			console.log(`submit - NewProceedings (Screen) - line 30 ${error}`)
		} finally {
			setLoading(false)
		}
	}

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
