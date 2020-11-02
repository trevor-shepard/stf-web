import React, { FunctionComponent, useRef } from 'react'
import styled from '@emotion/styled'
import { EmptyProfile } from 'assets/icons'
import ColorBar from './ColorBar'
import { Member } from 'types'
import useContainerDimensions from 'utils/useContainerDimentions'

interface Props {
	member: Member
	rank: number
	score: number
	highScore: number
	lowScore: number
}
const MobileGroups: FunctionComponent<Props> = ({
	member,
	score,
	rank,
	highScore,
	lowScore
}) => {
	const ref = useRef<HTMLHeadingElement>(null)

	const { photo, username } = member
	const { containerWidth } = useContainerDimensions(ref)

	const percent = Math.abs(score > 0 ? score / highScore : score / lowScore)

	const barWidth = percent * containerWidth - 50

	return (
		<Container podium={rank <= 3} ref={ref}>
			{photo ? (
				<PhotoContainer>
					<ProfileImage src={photo} />

					<Username>{username}</Username>
				</PhotoContainer>
			) : (
				<PhotoContainer>
					<ProfileImage src={EmptyProfile} />

					<Username>{username}</Username>
				</PhotoContainer>
			)}
			{containerWidth !== 0 && <ColorBar width={barWidth} score={score} />}
			<GreyContainer>
				<Rank >{rank}</Rank>
			</GreyContainer>
		</Container>
	)
}

const Container = styled.div<{podium: boolean}>`
	background: #c4c4c4 40%;
	width: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 60px;
	z-index: -20;
	${({podium}) => podium && 'background-color: #FFD218;'}
`

const Username = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 14px;
	line-height: 100%;
	/* or 14px */

	text-align: center;
	letter-spacing: 1px;
	text-transform: uppercase;
`

const PhotoContainer = styled.div`
	position: absolute;
	left: 20px;
	top: -4px;
	width: 70px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 10;
`

const ProfileImage = styled.img`
	height: 62px;
	width: 61px;
	border-radius: 45.2129020690918px;
	margin-bottom: 5px;
	border: 1px solid #7c8c9a;
	background-color: #ffffff;
`

const GreyContainer = styled.div`
	height: 55px;
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	align-content: center;
	margin-left: 60px;
	padding-left: 60px;
`
const Rank = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 28px;
	line-height: 120%;
	display: flex;
	align-items: center;
	justify-content: center;
	letter-spacing: 0.177303px;
	color: #262626;
	width: 65px;
	padding-left: 10px;
	

`

export default MobileGroups
