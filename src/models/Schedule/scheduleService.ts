import { equalTo, onValue, orderByChild, query } from "firebase/database"
import { Schedule, ScheduleService } from "./types"
import { dbRef } from "../../service/firebase"
import { format } from "date-fns"

export const scheduleService: ScheduleService = {
	getScheduleRealtTime: (date: Date, setShedule) => {
		const dbQuery = query(
			dbRef,
			orderByChild("data"),
			equalTo(format(date, "dd/MM/yyyy"))
		)
		return onValue(dbQuery, (snapshot) => {
			if (snapshot.exists()) {
				setShedule([])

				let d = snapshot.val()
				let data = Object.values(d).map((i) => i)

				data.forEach((item: any) => {
					let newData: Schedule = {
						clientName: item.cliente,
						date: item.data,
						id: String(item.id),
						proceedingsKeys: item.procedimento,
						type: item.tipo,
						hour: item.hora,
						totalValue: item.valor,
					}
					setShedule((oldData) => [...oldData, newData])
				})
				// setShedule((oldP) => oldP.sort((a, b) => (a.hour > b.hour ? true : -1)))
			} else setShedule([])
		})
	},
}
