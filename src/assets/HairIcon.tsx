import React from "react"
import { View } from "react-native"
import { Defs, Image, Pattern, Rect, Svg, Use } from "react-native-svg"

type HairIconProps = {
	color: string
	size: number
}

const HairIcon: React.FC<HairIconProps> = ({ color, size }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
			<Rect width="50" height="50" fill="url(#pattern0)" />
			<Defs>
				<Pattern
					id="pattern0"
					patternContentUnits="objectBoundingBox"
					width="1"
					height="1">
					<Use xlinkHref="#image0_206_455" transform="scale(0.0104167)" />
				</Pattern>
				<Image
					id="image0_206_455"
					width="96"
					height="96"
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEpElEQVR4nO3daahVVRTA8W2aQx+elKXQgOAz630ooigUPxiFYDRIVghFRDTa8MWSRCEIKRIjicqsTBs1GwgiIyto0gibDAorXlHYRGRBlmGk/9jcTV5f93rPsPc+a5+zfvC+vMe765y17nDOvmvvbYxSSimVOOBoYDowF7gJuAdYAzzjfjYCrwHPut/fCywBrgZmApOBkVWfRzJoJWw+sAH4BT/+Bt4HVgCXA8dUfZ4Sn+ULgU+J52P3SplsmggYBswCXgb2UJ097m1shmkCYCRwFbANedYCfabGiZ8HfItsnwBHmjoBzgUGScdWYIxJHdAPvE6alpnEP2CvB/4gXX8CE0xqgNHuw6wOrjXCn+X97lLyRvcBa+8+t1Af64w09i4SuAv4nvp7w0jirt9Tfl/Pa5ORAriS5nnKSACcAOyieRYaCYC3aKYBCck/lWb60EgALKWZzjcSAJtpnl3AOCNBQ673O3kPOKTKxA8AL9Jsq6tK/hXAX1WfvQB7gZNjJ/8aF1i1PBwz+Zdp8v/nV+CgGMmf0rBxnjxODJ384a5vRnV2SegCXNclsGpZHDL544AdLpDqbGnIAtzZJaja5/6Qz/6dbYFUzBsy4IYuAdX+HgxVgE1DAqnO7guR/LHAP10Cqv2tCFEA206isvnctuH4LsCijMFVyyzfBVjlHlhl84HXV4GbV6XymeOzADr2k99nwMG+CvBFgQNQMN9XAVKaMCHJ78BRPgpgX06qmLU+CvBRweCqZXbZAuhVUDk/l5pBYzt/Sx6AgufKFGCZZtCLGWXaT1R5txQtwBkegiu4sGgBxmv2vEzoLn5nnMCyAdKbd8vdkAHPV30WCbLfod8GjCqVfFcAu0aPyuYb4GbgsNKJbyvA6RmDK7jUW+LbCjAG2K3ZzWSm9wK4IrybLX7jDYQqQFMn4eXVF3IxJXVgO4Mk3xVgQo/gCrYFK4Argr3E8j3Nc3ONKrcxdAHsqrO+G5mOAL6iHsLOEwMWeD7gV93jHg/8RPoWhS7AWZ4PeFXbY9sifEfa5saYoOfTrR3Wg/6SdE2Ksaiqz07pizvEONQtEZya7UGT35agrz0e9HEHmI15e2Jt8eEm6AXqkvihVxOr2w9gMJHOB3+jnz2S8rSng16ZMd40ZLOv0jPDZ95/m8r0jPHsRgpS2SXt54XPuv9vx7bmiHc3Mg16n4wRcVj6ghzx3iGel4BT3BpIk9yPvTSeCpwNXOQWKpkaZWGOLgnZXvIkt2SdQQL0uX1dYvnvxlAk4HAPH1iZFzYCZhPXI0Yyt91TGUuEz09bbSSz7XUlTu5tYESOWKOA34hrjZEMWF/iimF8zlhziO9RI3wfgB8LnJT9nykF4r1CfKILcFLB5A8UHHXdS3yPmRq9/9vprRMLxlpJNR43UgFvZjyJ3W4kc3TBOBMrbAJ7wkjkvrftNTRs/76u2xBzjlgPUR2xBVjQY73M5cCxHuL0R77zHepJI437cmRoO8oOtyfvOV7arx3gBaolYyuSdnbgzB2cbR25w23UMDxAnPOow8Rq39wO1acFjjFWSEeEvP3AYgAeQIb1VedCKaWUUkopZWrvX9KMz78Rze6RAAAAAElFTkSuQmCC"
				/>
			</Defs>
		</Svg>
	)
}

export default HairIcon
