export type FinResponse = {
	category: string
	clientName: string
	date: {
		day: string
		month: string
		year: string
	}
	paymentForm: string
	proceedings: string
	type: string
	value: string
	id: string
}

export type FinType = {
	category: string
	clientName: string
	date: Date
	paymentForm: string
	proceedings: string
	type: string
	value: string
	id: string
}
