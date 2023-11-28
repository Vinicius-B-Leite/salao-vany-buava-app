export type User = {
	email: string
	password: string
}

export type UserService = {
	getStorageUser: () => Promise<User | null>
	setStorageUser: (user: User) => Promise<void>
}
