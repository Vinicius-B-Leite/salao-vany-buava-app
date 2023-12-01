import {
	equalTo,
	onValue,
	orderByChild,
	push,
	query,
	ref,
	remove,
	set,
	update,
} from "firebase/database"
import { Schedule, ScheduleService } from "./types"
import { db, dbRef } from "../../service/firebase"
import { format } from "date-fns"
import { localNotification } from "../../service/localNotification/localNotificatoinService"

export const scheduleService: ScheduleService = {
	getScheduleRealtTime: (date: Date, setShedule, setLoading) => {
		const dbQuery = query(
			dbRef,
			orderByChild("data"),
			equalTo(format(date, "dd/MM/yyyy"))
		)
		return onValue(dbQuery, (snapshot) => {
			if (snapshot.exists()) {
				setLoading(true)
				setShedule([])

				let d = snapshot.val()
				let data = Object.values(d)
				const scheduleKeys = Object.keys(d)

				data.forEach((item: any, index) => {
					let newData: Schedule = {
						clientName: item.cliente,
						date: item.data,
						id: scheduleKeys[index],
						proceedingsKeys: item.procedimento,
						type: item.tipo,
						hour: new Date(item.hora),
						totalValue: item.valor,
					}

					setShedule((oldData) => [...oldData, newData])
				})
				setShedule((oldP) => oldP.sort((a, b) => (a.hour > b.hour ? 1 : -1)))
			} else setShedule([])
			setLoading(false)
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
				hora: hour.toString(),
				tipo: type,
				valor: totalValue,
				id: newKey.toString().slice(60, newKey.key?.length),
				procedimento: proceedingsKeys,
			})

			let dateToDisplayNotification = new Date(date)

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
	updateSchedule: async ({
		id,
		clientName,
		date,
		hour,
		totalValue,
		type,
		proceedingsKeys,
	}: Schedule) => {
		await update(ref(db, `agenda/${id}`), {
			cliente: clientName,
			data: format(date, "dd/MM/yyyy"),
			hora: hour.toString(),
			id: id,
			procedimento: proceedingsKeys,
			tipo: type,
			valor: totalValue,
		})
	},
	deleteSchedule: async (id) => {
		try {
			await remove(ref(db, "agenda/" + id))
		} catch (error) {
			throw error
		}
	},
}
