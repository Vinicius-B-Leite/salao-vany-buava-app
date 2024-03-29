import { UserService } from "./types"
import { USER_KEY, storage } from "@/storage"

export const userService: UserService = {
	getStorageUser: async () => {
		const user = await storage.getItem(USER_KEY)
		return user ? JSON.parse(user) : null
	},
	setStorageUser: async (user) => {
		await storage.setItem(USER_KEY, JSON.stringify(user))
	},
}
