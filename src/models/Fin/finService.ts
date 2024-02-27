import { db } from "@/service"
import { format } from "date-fns"
import {
	endAt,
	equalTo,
	get,
	orderByChild,
	orderByKey,
	orderByValue,
	push,
	query,
	ref,
	remove,
	set,
	startAt,
} from "firebase/database"
import { finAdapter } from "./adapter"

export type CreateFinProps = {
	clientName: string
	proceedings: string
	type: string
	date: string
	value: string
	paymentForm: string
	category: string
}
export const finService = {
	createFin: async ({
		category,
		clientName,
		date,
		paymentForm,
		proceedings,
		type,
		value,
	}: CreateFinProps) => {
		let newKey = push(ref(db, "finances"))
		const formattedDate = format(new Date(date), "dd/MM/yy")
		const day = formattedDate.split("/")[0]
		const month = formattedDate.split("/")[1]
		const year = formattedDate.split("/")[2]
		await set(newKey, {
			clientName,
			proceedings,
			type,
			date: {
				day,
				month,
				year,
			},
			value: value.replace(",", "."),
			paymentForm,
			category,
		})
	},
	filterByDay: async (day: string, month?: string, year?: string) => {
		const yearRef = year ? year : new Date().getFullYear().toString().slice(2)
		const monthRef = month ? month : format(new Date(), "MM")
		const dayRef = day.length === 1 ? `0${day}` : day
		const response = await get(
			query(ref(db, "finances"), orderByChild("date/day"), equalTo(dayRef))
		)

		if (!response.exists()) return []
		const finances = Object.values(response.val()).filter(
			(f) =>
				f.date.day === dayRef &&
				f.date.month === monthRef &&
				f.date.year === yearRef
		)
		return finances.map((f, i) =>
			finAdapter.adapter({ ...f, id: Object.keys(response.val())[i] })
		)
	},
	filterByMonth: async (month: string, year?: string) => {
		const yearRef = year ? year : new Date().getFullYear().toString().slice(2)
		const monthRef = month.length === 1 ? `0${month}` : month
		const response = await get(
			query(ref(db, "finances"), orderByChild("date/month"), equalTo(monthRef))
		)
		if (!response.exists()) return []

		const finances = Object.values(response.val()).filter(
			(f) => f.date.year === yearRef
		)
		return finances.map((f, i) =>
			finAdapter.adapter({ ...f, id: Object.keys(response.val())[i] })
		)
	},
	filterByYear: async (year: string) => {
		const response = await get(
			query(ref(db, "finances"), orderByChild("date/year"), equalTo(year))
		)
		if (!response.exists()) return []
		return Object.values(response.val()).map((f, i) =>
			finAdapter.adapter({ ...f, id: Object.keys(response.val())[i] })
		)
	},
	deleteFin: async (id: string) => {
		await remove(ref(db, `finances/${id}`))
	},
}
