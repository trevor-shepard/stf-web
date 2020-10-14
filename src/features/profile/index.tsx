import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { RootState } from 'store/rootReducer'
import { useSelector } from 'react-redux'
import { EmptyProfile, addPhoto } from 'assets/icons'
import Logout from 'components/Logout'
import AddProfile from './AddProfile'
const Profile: FunctionComponent = () => {
	const { username, photo } = useSelector((state: RootState) => state.user)
	const [editPhoto, setEditPhoto] = useState(false)
	return (
		<Container>
			<Logout />
			{editPhoto && (
				<AddProfile
					username={username as string}
					hideModal={() => setEditPhoto(false)}
				/>
			)}
			<Username>{username}</Username>
			<ProfileImageContainer onClick={() => setEditPhoto(true)}>
				{photo ? (
					<ProfileImage src={photo} />
				) : (
					<ProfileImage src={EmptyProfile} />
				)}
				<AddPhoto src={addPhoto} />
			</ProfileImageContainer>
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
	display: flex;
	flex-direction: column;
	padding-top: 10%;
`
const ProfileImageContainer = styled.div`
	position: absolute;
	margin-top: 10%;
	width: 100%;
	overflow: hidden;
	border-radius: 100px;
`

const ProfileImage = styled.img`
	height: 178px;
	width: 178px;
	border-radius: 100px;
	object-fit: cover;
`

const AddPhoto = styled.img`
	position: relative;
	left: 10;
	right: -20;
`
const Username = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 120%;
	text-align: center;
	letter-spacing: 0.15px;
`

export default Profile
