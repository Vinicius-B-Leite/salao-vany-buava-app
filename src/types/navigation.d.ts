import { AppRouteParamsList } from "@/routes"

declare global {
	namespace ReactNavigation {
		interface RootParamList extends AppRouteParamsList {}
	}
}
