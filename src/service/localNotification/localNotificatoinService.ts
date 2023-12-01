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
	await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body,
		},
		trigger: {
			day: dateToDisplay.getDate(),
			month: dateToDisplay.getMonth(),
			year: dateToDisplay.getFullYear(),
			hour: 7,
		},
	})
}
