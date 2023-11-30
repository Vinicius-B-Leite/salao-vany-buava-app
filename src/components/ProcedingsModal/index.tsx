import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
	ActivityIndicator,
	FlatList,
	Modal,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import * as S from "./styles"
import Item from "./Item"

import { Ionicons } from "@expo/vector-icons"

import { child, get, ref } from "firebase/database"
import { db } from "../../service/firebase"
import { useFocusEffect } from "@react-navigation/native"
import { Proceedings, ProceedingsTypes } from "../../models/Proceedings/types"
import { proceedingsService } from "@/models/Proceedings/proceedingsService"
import { Box, Input, Spinner } from "@/components"

type ProcedingsModalProps = {
	setProccedingsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	proceddingsModalVisible: boolean
	type: ProceedingsTypes
	selectedProceedings: string[]
	setSelectedProceedings: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ProcedingsModal({
	setProccedingsModalVisible,
	proceddingsModalVisible,
	type,
	selectedProceedings,
	setSelectedProceedings,
}: ProcedingsModalProps) {
	const [searchInput, setSearchInput] = useState("")
	const searchInputRef = useRef<TextInput>(null)
	const [proceedings, setProceedings] = useState<Proceedings[]>([])
	const [loading, setLoading] = useState(true)

	async function getProceedings() {
		setLoading(true)
		const proceedingsResponse = await proceedingsService.getProceedings(type)
		if (proceedingsResponse) {
			setProceedings(proceedingsResponse)
		}
		setLoading(false)
	}

	useEffect(() => {
		setSelectedProceedings([])
	}, [type])

	const filterProceedings = useMemo(() => {
		let proceedingsFilter = proceedings.filter((item) => {
			return item.name.includes(searchInput.toLowerCase())
		})

		return proceedingsFilter
	}, [])

	const handleSelectProceeding = (proceedingsKey: string) => {
		const index = selectedProceedings.indexOf(proceedingsKey)
		const wasAlreadySelected = index > -1

		if (wasAlreadySelected) {
			setSelectedProceedings((oldValue) => {
				oldValue.splice(index, 1)
				return [...oldValue]
			})
			return
		}

		setSelectedProceedings([...selectedProceedings, proceedingsKey])
	}
	const handleDelete = (proceedingsItem: Proceedings) => {
		const index = proceedings.findIndex((v) => v.id === proceedingsItem.id)
		setProceedings((oldValue) => {
			oldValue.splice(index, 1)
			return [...oldValue]
		})

		if (selectedProceedings.includes(proceedingsItem.id)) {
			const indexInSelectedProceedings = selectedProceedings.indexOf(
				proceedingsItem.id
			)
			setSelectedProceedings((oldValue) => {
				oldValue.slice(indexInSelectedProceedings, 1)
				return [...oldValue]
			})
		}
	}
	return (
		<Modal
			animationType="slide"
			onRequestClose={() => setProccedingsModalVisible(false)}
			visible={proceddingsModalVisible}
			onShow={getProceedings}>
			{loading ? (
				<Box bg="bg" justifyContent="center" alignItems="center" flex={1}>
					<Spinner />
				</Box>
			) : (
				<S.Container>
					<Box
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between">
						<TouchableOpacity
							onPress={() => setProccedingsModalVisible(false)}>
							<Ionicons name="arrow-back" size={30} color="#fff" />
						</TouchableOpacity>

						<Box
							bg="contrastSecond"
							flex={0.9}
							flexDirection="row-reverse"
							alignItems="center"
							borderRadius="s5"
							paddingHorizontal="s12">
							<TouchableOpacity
								onPress={() => searchInputRef?.current?.focus()}>
								<Ionicons name="search" size={24} color="#fff" />
							</TouchableOpacity>

							<Input
								ref={searchInputRef}
								value={searchInput}
								onChangeText={setSearchInput}
								textAlign="right"
								boxProps={{
									mt: undefined,
									borderWidth: undefined,
								}}
							/>
						</Box>
					</Box>

					<Box mt="s30">
						<FlatList
							data={searchInput ? filterProceedings : proceedings}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<Item
									proceeding={item}
									type={type}
									handleSelectProceeding={(p) =>
										handleSelectProceeding(p.id)
									}
									isSelected={selectedProceedings.indexOf(item.id) > -1}
									handleDelete={handleDelete}
								/>
							)}
						/>
					</Box>
				</S.Container>
			)}
		</Modal>
	)
}
