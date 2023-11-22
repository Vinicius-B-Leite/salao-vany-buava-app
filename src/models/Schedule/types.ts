import { ProceedingsTypes } from "../Proceedings/types"

export type Schedule = {
	clientName: string
	date: Date
	hour: string
	id: string
	proceedingsKeys: string[]
	type: ProceedingsTypes
	totalValue: number
}
