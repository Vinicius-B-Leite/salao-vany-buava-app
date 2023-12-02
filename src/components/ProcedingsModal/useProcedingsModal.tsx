import { proceedingsService } from "@/models/Proceedings/proceedingsService"
import { Proceedings, ProceedingsTypes } from "@/models/Proceedings/types"
import { useEffect, useMemo, useRef, useState } from "react"
import { TextInput } from "react-native"

type UseProcedingsModalProps = {
	setSelectedProceedings: React.Dispatch<React.SetStateAction<string[]>>
	type: ProceedingsTypes
	selectedProceedings: string[]
}
export function useProcedingsModal({
	selectedProceedings,
	setSelectedProceedings,
	type,
}: UseProcedingsModalProps) {
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
			return item.name.toLowerCase().includes(searchInput.toLowerCase())
		})

		return proceedingsFilter
	}, [searchInput])

	const handleSelectProceeding = (proceedingsKey: string) => {
		const index = selectedProceedings.indexOf(proceedingsKey)
		const wasAlreadySelected = index > -1

		if (wasAlreadySelected) {
			const newSelectedProceedings = selectedProceedings
			newSelectedProceedings.splice(index, 1)
			setSelectedProceedings([...newSelectedProceedings])
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

	return {
		searchInputRef,
		loading,
		filterProceedings,
		handleSelectProceeding,
		handleDelete,
		proceedings,
		setSearchInput,
		getProceedings,
		searchInput,
	}
}
