import React, { useEffect, useState } from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { Dimensions, Text, View, TouchableWithoutFeedback, FlatList } from "react-native"
import * as S from "./styles"

import HairSvg from "../../assets/hair.svg"
import NailSvg from "../../assets/nailpolish.svg"
import Eyeslash from "../../assets/yeyslash.svg"

import { child, get, ref, remove } from "firebase/database"
import { db } from "../../service/firebase"
import { ProceedingsTypes } from "../../models/Proceedings/types"
import { Schedule } from "../../models/Schedule/types"
import { AppRouteParamsList } from "../../routes/app.route"
import { proceedingsService } from "../../models/Proceedings/proceedingsService"

const { width, height } = Dimensions.get("screen")

type HomeItemProps = {
	data: Schedule
}

export default function HomeItem({ data }: HomeItemProps) {
	const [proceedings, setProceedings] = useState<string[]>([])
	const navigation = useNavigation()

	useEffect(() => {
		function getProceedingsName() {
			let p = data?.proceedingsKeys
			setProceedings([])
			p?.forEach(async (item) => {
				const proceedings = await proceedingsService.getSingleProceeding(
					item,
					data.type
				)

				let proceedingsName = Object.values(proceedings).toString()
				function toCapitalize(str) {
					return str.charAt(0).toUpperCase() + str.slice(1)
				}
				setProceedings((oldP) => [...oldP, toCapitalize(proceedingsName)])
			})
		}
		getProceedingsName()
	}, [data])

	function choseSvg() {
		if (data.type === "cabelo")
			return <HairSvg width={width / 4.4} height={height / 4} />
		if (data.type === "unha")
			return <NailSvg width={width / 4.4} height={height / 14} />
		if (data.type === "cilios")
			return <Eyeslash width={width / 4.4} height={height / 4} />
	}
	function handleRemove() {
		remove(ref(db, "agenda/" + data.id))
	}
	return (
		<TouchableWithoutFeedback
			onPress={() =>
				navigation.navigate("ScheduleToday", {
					screen: "UpdateSchedule",
					params: { data },
				})
			}
			onLongPress={() => handleRemove()}>
			<S.Container>
				{choseSvg()}
				<S.InfoContainer>
					<S.Name>{data.clientName}</S.Name>
					<S.Hour>{data.hour}</S.Hour>
				</S.InfoContainer>
				<S.ProcedureContainer>
					<FlatList
						style={{ height: height / 18 }}
						data={proceedings}
						keyExtractor={(item) => item}
						renderItem={({ item }) => (
							<S.Procedure numberOfLines={1}>{item}</S.Procedure>
						)}
					/>
				</S.ProcedureContainer>
			</S.Container>
		</TouchableWithoutFeedback>
	)
}
