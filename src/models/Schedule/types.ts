import { Unsubscribe } from "firebase/database"
import { ProceedingsTypes } from "../Proceedings/types"

export type Schedule = {
	clientName: string
	date: Date
	hour: Date
	id: string
	proceedingsKeys: string[]
	type: ProceedingsTypes
	totalValue: number
}

export type ScheduleService = {
	getScheduleRealtTime: (
		date: Date,
		setShedule: React.Dispatch<React.SetStateAction<Schedule[]>>,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => Unsubscribe
	createSchedule: (data: Omit<Schedule, "id">, key?: string) => Promise<void>
	updateSchedule: (newDate: Schedule) => Promise<void>
}
