import React, { useEffect, useState } from "react"

import * as S from "./styles"
import { AntDesign } from "@expo/vector-icons"

import { ref, remove } from "firebase/database"
import { db } from "../../../service/firebase"
import { Alert } from "react-native"
import { Proceedings, ProceedingsTypes } from "../../../models/Proceedings/types"
import { useTheme } from "@shopify/restyle"
import { BoxPressable } from "@/components"
import { proceedingsService } from "@/models/Proceedings/proceedingsService"

type ItemProps = {
	proceeding: Proceedings
	type: ProceedingsTypes
	isSelected: boolean
	handleSelectProceeding: (proceedgins: Proceedings) => void
	handleDelete: (proceedgins: Proceedings) => void
}
export default function Item({
	proceeding,
	type,
	handleSelectProceeding,
	isSelected,
	handleDelete,
}: ItemProps) {
	const { colors } = useTheme()
	function deleteItem() {
		Alert.alert("Atenção", "Deseja excluir o procedimento " + proceeding.name + "?", [
			{
				text: "Confirmar",
				onPress: async () => {
					await proceedingsService.deleteProceedings(type, proceeding.id)
					handleDelete(proceeding)
				},
				style: "default",
			},

			{
				text: "Cancelar",
				style: "cancel",
			},
		])
	}
	return (
		<BoxPressable
			bg="contrastSecond"
			flexDirection="row"
			borderRadius="s5"
			justifyContent="space-between"
			alignItems="center"
			padding="s16"
			mb="s16"
			onPress={() => handleSelectProceeding(proceeding)}
			onLongPress={() => deleteItem()}>
			<S.Proceeding>{proceeding.name}</S.Proceeding>
			<AntDesign
				name="checkcircle"
				size={24}
				color={isSelected ? colors.text : colors.bg}
			/>
		</BoxPressable>
	)
}
