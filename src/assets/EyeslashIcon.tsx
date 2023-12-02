import { Theme } from "@/theme"
import React from "react"
import { View } from "react-native"
import { Defs, Image, Path, Pattern, Rect, Svg, Use } from "react-native-svg"

type EyeslashProps = {
	color: string
	size: number
}

const Eyeslash: React.FC<EyeslashProps> = ({ color, size }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
			<Rect width="50" height="50" fill="url(#pattern0)" />
			<Defs>
				<Pattern
					id="pattern0"
					patternContentUnits="objectBoundingBox"
					width="1"
					height="1">
					<Use xlinkHref="#image0_206_454" transform="scale(0.0104167)" />
				</Pattern>
				<Image
					id="image0_206_454"
					width="96"
					height="96"
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFXElEQVR4nO2ba4xdUxTHDzWdeiVe0VIlYbxTDC2JKuJRKaoRLSkajw8+TEVHpF6toiKRtEFrDOLxwZCQoirSQbwaTRqPkkhRmnqGBEG0FB2dn6zMmmTMzL177XP3vb1nun7J/XbPf++99j57r73WOlnmOI7jOI7jOI7jOI7jOI7jOI7jOI7jOI7jOI7jOBaARmBv4GCgGTjI9KCTD2AmsAH4BfiHgdybU9qxALRSnvtMQk4+gHmBCViYU9qxADwYmIA5JiEnH8DbgQmYGaE1DdgIfAm8C6wAOoD7gduAyTm7OTQBdgJ+D0zA+Ai9GwNabVnRAYaJawicDlwN3AU8BRyfQ+u0gMG2ACMi9J4J6M3OigpwO7C+hKsoXJhDs53yvB+htQPwfUDvvKyoAA8FBndlpN7uhu3nzgi9kwNa3cDIrKgASwIDnBWpN58wMfv/IwGtNVmRAR5N6K0cYFj9ayP09gU2B/TuzoqMunTlmByxV4e0hGsTniXCuKzIAN+kGCAw12CsH4HdjHrjgX8DequNWsfKWWZtu2YAowMD7LJ0Grgc2GqYgNaIg/wLg94Mo96L+v9NwBPARHljs20N0BIY4EcGjWsMKxU1aKPxEtdp0JNIa4NBb6x6Sv1Zr2/tmGxbIf54YJDtZZ7dGXgAG/J2TDT0pwF41qg51TjG5wI6sniaYm0XavQ44MAKb6slLzjAWcCn2Flk6PNewCtGvU6jHS4xaK3MUiFhA93v5JVbXOZ/O2pQK3RgNvQLVZwPvE4cb8q2Euj3GcDXRr3fJKtmPN8kGZTkTQo1Ng54qd9eJx0dnjNZIjyut9BZenDJhMTyObBPmX4fCjxdYo8eDPnfFIM9ZHtcadB7TxZjJYY/EXi5TAOTBnlmAvAX1WcdsH8J40wBlqmXFcMCY+650ziZE3IbXxsTT8B8SwSOAX6m+nQDdwDT1UWdrbH7tww321K0hVxHNX6vyxmioyLja4MSMjYdVhpm/pVi0mYwvlRbfGDUk/NmjxQTINtJOT6Tc0BXo8VXrzekz7cYjD9Nzzyr5ikVG18bHhNobLPuxUXkJ+DMwPhP0m0thpYkxu+z5w01ujUTt1+ZMU8Flkd4T73ck8z42plRDC1+AE7tN8Zd1M2+Sl3jvOfYkuTxH9nLGHp8q97dBk1FWoJ8IeYnNXyfCVhAejYCr6mHdYWGHY5UL6P316STPwO4CVgKfEX98UdMQinW+A1aJ5OCT7SSrVlCDhX0aaTG3ZcaMmPVRmJVR6e1+sAwcCXIXrpQkhVV6l+juofLtQylVvwtSf+Yspc8gzukghUmB90cSXpUrYOD53ZvBb6jemzV0PNhmT2FGv+2awBrXU6/uqWqK8OWbJkecWO1IvY4wdiHEcDFwIfAzZZn+j58dg43rEtdsD2zOgKYpKHqlFvPak0S3aDfJ5wDXABcquUyL2hasq/DMcra4dYc0UO5JY7N6hh6brPLErmbeXjMcphJPD4GCTdfVxeJZyPAUcCTNT6w0YlvLtWpXYFXIwXXVsuzqQVaILwY+JPasWrAYpVMkmZsrEhcZJGl8qAI0OM5zTMU5qbiov4lfjFJ7015qpiLAD0XTvFa3qG6SNnMMGnw8IgENRozqeuDNhXAEfpFzMcJDb9Fz9gma7FsX96Qb2+z7RB6Fupc9fTynBdr9EL6/8IszWBJhUOI9lC5x/YCPduUxLEu0wDlw8Dz+p3aKi1c6NAQhdwLRocEhweqHdImFpyS/v+KQTyd6wf5u1MNNBvUm/Psiv1cyEmAlmpLOeC5KfQcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcJ6sl/wFOSVkqSGzyDAAAAABJRU5ErkJggg=="
				/>
			</Defs>
		</Svg>
	)
}

export default Eyeslash
