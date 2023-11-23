import { AppRouteParamsList } from "../routes/app.route"

declare global {
	namespace ReactNavigation {
		interface RootParamList extends AppRouteParamsList {}
	}
}
