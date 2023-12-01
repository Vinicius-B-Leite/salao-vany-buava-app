import * as Notifications from "expo-notifications"

type PocalNotificationProps = {
	title: string
	body: string
	dateToDisplay: Date
}
export async function localNotification({
	title,
	body,
	dateToDisplay,
}: PocalNotificationProps) {
	let date = new Date(dateToDisplay)
	date.setHours(7, 0, 0)

	await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body,
		},
		trigger: {
			date,
		},
	})
}
