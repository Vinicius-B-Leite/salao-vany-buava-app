export type ProceedingsTypes = "cabelo" | "unha" | "cilios"

export type Proceedings = {
	type: ProceedingsTypes
	id: string
	name: string
}

export type proceedingsServiceType = {
	createProceedings: (proceedingsName: string, type: ProceedingsTypes) => Promise<void>
	getSingleProceeding: (
		proceedingsKey: string,
		type: ProceedingsTypes
	) => Promise<Proceedings | null>
}
