import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { EmptyProfile } from 'assets/icons'

import { Member } from 'types'

interface Props {
	member: Member
	rank: number
	score: number
}
const MobileGroups: FunctionComponent<Props> = ({ member, score, rank }) => {
	const { photo, username } = member
	return (
		<Container>
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
			<GreyContainer>
				<Rank>{rank}</Rank>
				<Score>{score}</Score>
			</GreyContainer>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 60px;
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
`

const GreyContainer = styled.div`
	background: #c4c4c4 40%;
	height: 55px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	margin-left: 60px;
	padding-left: 60px;
	padding-right: 30px;
`

const Rank = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 28px;
	line-height: 120%;
	display: flex;
	align-items: center;
	letter-spacing: 0.177303px;
	color: #262626;
`

const Score = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 47px;
	line-height: 120%;
	/* or 56px */

	display: flex;
	align-items: center;
	text-align: right;
	letter-spacing: 0.177303px;
	padding-top: 8px;
`

export default MobileGroups
