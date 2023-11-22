import React, { useCallback, useEffect, useRef, useState } from "react"

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

type ProcedingsModalProps = {
	setProccedingsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	proceddingsModalVisible: boolean
	type: ProceedingsTypes
	selectedProceedings: Proceedings[]
	setSelectedProceedings: React.Dispatch<React.SetStateAction<Proceedings[]>>
	proceedingsKeys: string[]
}

export default function ProcedingsModal({
	setProccedingsModalVisible,
	proceddingsModalVisible,
	type,
	selectedProceedings,
	setSelectedProceedings,
	proceedingsKeys,
}: ProcedingsModalProps) {
	const [searchInput, setSearchInput] = useState("")
	const searchInputRef = useRef<TextInput>(null)
	const [filterProceedings, setFilterProceedings] = useState<Proceedings[]>([])
	const [proceedings, setProceedings] = useState<Proceedings[]>([])
	const [loading, setLoading] = useState(true)

	function getProceedings() {
		get(child(ref(db), "procedimentos/" + type))
			.then((snapshot) => {
				if (!snapshot.exists()) return
				setProceedings([])
				let data: Proceedings = snapshot.val()

				let keys = Object.keys(data)

				console.log(keys)
				keys.forEach((k) => {
					let proceedginsDB = {} as Proceedings
					proceedginsDB["id"] = k
					proceedginsDB["name"] = data[k].nome
					proceedginsDB["selected"] = selectedProceedings
						.map((item) => item.id)
						.includes(k)
						? true
						: false

					if (proceedingsKeys?.includes(proceedginsDB.id)) {
						proceedginsDB["selected"] = true
						setSelectedProceedings((oldValue) => [...oldValue, proceedginsDB])
					}
					if (
						selectedProceedings
							.map((item) => item.id)
							.includes(proceedginsDB.id)
					) {
						setSelectedProceedings((oldP) => [...oldP, proceedginsDB])
					}

					setProceedings((oldProceedings) => [...oldProceedings, proceedginsDB])
				})
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		setSelectedProceedings([])
	}, [type])

	function searchIconClick() {
		if (!searchInputRef.current.isFocused()) searchInputRef.current.focus()
	}

	function filterSearch(txt: string) {
		setSearchInput(txt)
		let proceedingsFilter = proceedings.filter((item) => {
			return item.name.includes(txt.toLowerCase())
		})
		setFilterProceedings(proceedingsFilter)
	}

	return (
		<Modal
			animationType="slide"
			onRequestClose={() => setProccedingsModalVisible(false)}
			visible={proceddingsModalVisible}
			onShow={getProceedings}>
			{loading ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#0C031E",
					}}>
					<ActivityIndicator size={50} color="#54407C" />
				</View>
			) : (
				<S.Container>
					<S.Header>
						<TouchableOpacity
							onPress={() => setProccedingsModalVisible(false)}>
							<Ionicons name="arrow-back" size={30} color="#fff" />
						</TouchableOpacity>

						<S.InputContainer>
							<TouchableOpacity onPress={() => searchIconClick()}>
								<Ionicons name="search" size={24} color="#fff" />
							</TouchableOpacity>

							<S.Input
								ref={searchInputRef}
								value={searchInput}
								onChangeText={filterSearch}
							/>
						</S.InputContainer>
					</S.Header>

					<FlatList
						style={{ marginTop: "15%" }}
						data={searchInput ? filterProceedings : proceedings}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<Item
								proceeding={item}
								setSelectedProceedings={setSelectedProceedings}
								selectedProceedings={selectedProceedings}
								type={type}
								setProceedings={setProceedings}
							/>
						)}
					/>
				</S.Container>
			)}
		</Modal>
	)
}
