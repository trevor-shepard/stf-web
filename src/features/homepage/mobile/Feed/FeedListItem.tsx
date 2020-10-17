import React, { FunctionComponent } from 'react'
import moment from 'moment'
import styled from '@emotion/styled'
import { Action, Member } from 'types'
import { EmptyProfile } from 'assets/icons'
import Star from './Star'
interface FeedListItemProps {
	action: Action
	groupValues: {
		[groupID: string]: number
	}
	member: Member
	groupID?: string
}

const FeedListItem: FunctionComponent<FeedListItemProps> = ({
	action,
	member,
	groupID,
	groupValues
}) => {
	const { username, photo } = member
	const { date, name, quantity } = action
	const actionPhoto = action.photo
	const [verb, unit] = name.split('$')

	const value =
		Object.values(groupValues).length === 0
			? 0
			: groupID
			? groupValues[groupID]
			: Object.values(groupValues).reduce((acc, curr) => acc + curr, 0) /
			  Object.values(groupValues).length

	const score = value * quantity

	const fame = score > 0

	return (
		<FeedContainer>
			<Placeholder fame={fame}>.</Placeholder>
			<ActivityBox fame={fame}>
				<Title>{verb}</Title>
				<SubTitle>{moment(date).format('YYYY/M/D HH:mm')}</SubTitle>
			</ActivityBox>
			<ScoreBox fame={fame}>
				<ScoreTitle>{score}</ScoreTitle>
				<SubTitle>
					{quantity} {unit}
				</SubTitle>
			</ScoreBox>
			{actionPhoto ? (
				<PhotoContainer>
					<ProfileImage src={actionPhoto} />

					<Username>{username}</Username>
				</PhotoContainer>
			) : photo ? (
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
			<Star quantity={quantity} value={value} />
		</FeedContainer>
	)
}

const FeedContainer = styled.div`
	width: 80%;
	height: 55px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-left: 8%;
	position: relative;
	margin-bottom: 15%;
`

interface BoxProps {
	fame: boolean
}

const Placeholder = styled.div<BoxProps>`
	background-color: ${({ fame }) => (fame ? '#03753E' : '#C22626')};
	transform: skew(-20deg);
	width: 55px;
	border-top-left-radius: 100px;
	border-bottom-left-radius: 100px;
`

const ActivityBox = styled.div<BoxProps>`
	height: 100%;
	width: 60%;
	padding-left: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: ${({ fame }) => (fame ? '#00A757' : '#F45757')};
	transform: skew(-20deg);
`
const ScoreBox = styled.div<BoxProps>`
	height: 100%;
	width: 33%;
	padding-left: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: ${({ fame }) => (fame ? '#A0FFD2' : '#FF9595')};
	transform: skew(-20deg);
`

const Title = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 18px;
	line-height: 120%;
	transform: skew(20deg);

	display: flex;
	align-items: center;
	letter-spacing: 0.177303px;

	color: #ecfff6;
`

const SubTitle = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: normal;
	font-size: 11px;
	line-height: 150%;
	/* or 16px */
	transform: skew(20deg);

	display: flex;
	align-items: center;

	color: #03361e;
`
const ScoreTitle = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 18px;
	line-height: 120%;
	/* or 22px */
	transform: skew(20deg);

	display: flex;
	align-items: center;
	letter-spacing: 0.177303px;

	color: #03361e;
`

const PhotoContainer = styled.div`
	position: absolute;
	left: -6%;
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

export default FeedListItem
