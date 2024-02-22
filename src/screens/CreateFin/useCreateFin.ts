import { CreateFinForm } from "./createFinSchema"

export const useCreateFin = () => {
	const submit = (data: CreateFinForm) => {
		console.log(data)
	}

	return {
		submit,
	}
}
