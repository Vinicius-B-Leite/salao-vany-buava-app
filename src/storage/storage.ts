import AsyncStorage from "@react-native-async-storage/async-storage"
import { Storage } from "./type"

export const storage: Storage = {
	getItem: async (key) => {
		return await AsyncStorage.getItem(key)
	},
	setItem: async (key, value) => {
		return await AsyncStorage.setItem(key, value)
	},
}
