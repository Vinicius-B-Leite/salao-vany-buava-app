import React, { useState } from "react"

import { ActivityIndicator } from "react-native"
import * as S from "./styles"

import TypePicker from "../../components/TypePicker"

import { proceedingsService } from "../../models/Proceedings/proceedingsService"
import { ProceedingsTypes } from "../../models/Proceedings/types"

export default function NewProceedings() {
	const [selectedType, setSelectedType] = useState<ProceedingsTypes>("cabelo")
	const [proceedingsName, setProceedingsName] = useState("")
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")

	async function submit() {
		try {
			setLoading(true)
			if (!selectedType || !proceedingsName) {
				setLoading(false)
				setErrorMessage("Preencha todos os campos")
				return
			}
			await proceedingsService.createProceedings(proceedingsName, selectedType)
		} catch (error) {
			console.log(`submit - NewProceedings (Screen) - line 30 ${error}`)
		} finally {
			setErrorMessage("")
			setProceedingsName("")
			setLoading(false)
		}
	}

	return (
		<S.Container>
			{/* {errorMessage && <Error>{errorMessage}</Error>} */}
			<S.Input
				placeholder="Nome do procedimento"
				value={proceedingsName}
				onChangeText={(txt) => setProceedingsName(txt)}
			/>

			<TypePicker
				selectedType={selectedType}
				setSelectedType={setSelectedType}
				width="100%"
			/>

			<S.Button onPress={() => submit()}>
				<S.TextButton>
					{loading ? <ActivityIndicator size={24} color="#FFF" /> : "Cadastrar"}
				</S.TextButton>
			</S.Button>
		</S.Container>
	)
}
