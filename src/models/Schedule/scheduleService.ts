import { equalTo, onValue, orderByChild, push, query, set } from "firebase/database"
import { Schedule, ScheduleService } from "./types"
import { dbRef } from "../../service/firebase"
import { format } from "date-fns"
import { localNotification } from "../../service/localNotification/localNotificatoinService"

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
	createSchedule: async ({
		clientName,
		date,
		hour,
		totalValue,
		proceedingsKeys,
		type,
	}) => {
		try {
			let newKey = push(dbRef)

			await set(newKey, {
				cliente: clientName,
				data: format(date, "dd/MM/yyyy"),
				hora: hour,
				tipo: type,
				valor: totalValue,
				id: newKey.toString().slice(60, newKey.key.length),
				procedimento: proceedingsKeys,
			})

			let dateToDisplayNotification = new Date(date)
			dateToDisplayNotification.setHours(7)

			await localNotification({
				title: `Vany, hoje você tem cliente!!`,
				body: `A cliente ${clientName} está marcada para hoje às ${format(
					date,
					"HH:mm"
				)}`,
				dateToDisplay: dateToDisplayNotification,
			})
		} catch (error) {
			throw error
		}
	},
}
