export type Storage = {
	getItem: (key: string) => Promise<string | null>
	setItem: (key: string, data: string) => Promise<void>
}
