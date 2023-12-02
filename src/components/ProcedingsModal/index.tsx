import React from "react"

import { FlatList, Modal, TouchableOpacity } from "react-native"
import Item from "./Item"

import { Ionicons } from "@expo/vector-icons"

import { ProceedingsTypes } from "@/models/Proceedings/types"

import { Box, Container, Input, Spinner } from "@/components"
import { useProcedingsModal } from "./useProcedingsModal"

type ProcedingsModalProps = {
	setProccedingsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	proceddingsModalVisible: boolean
	type: ProceedingsTypes
	selectedProceedings: string[]
	setSelectedProceedings: React.Dispatch<React.SetStateAction<string[]>>
}

export function ProcedingsModal({
	setProccedingsModalVisible,
	proceddingsModalVisible,
	type,
	selectedProceedings,
	setSelectedProceedings,
}: ProcedingsModalProps) {
	const {
		filterProceedings,
		handleDelete,
		handleSelectProceeding,
		loading,
		searchInputRef,
		getProceedings,
		searchInput,
		proceedings,
		setSearchInput,
	} = useProcedingsModal({ selectedProceedings, setSelectedProceedings, type })

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
				<Container>
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

					<Box mt="s30" mb="s66">
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
				</Container>
			)}
		</Modal>
	)
}
