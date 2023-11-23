import { Unsubscribe } from "firebase/database"
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

export type ScheduleService = {
	getScheduleRealtTime: (
		date: Date,
		setShedule: React.Dispatch<React.SetStateAction<Schedule[]>>
	) => Unsubscribe
}
