import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Logo from 'components/Logo'
import Logout from 'components/Logout'

const MobileHomepage: FunctionComponent = () => {
	const { username } = useSelector((state: RootState) => state.user)

	return (
		<Container>
			<Logo />
			<Logout />
			<Header>
				Hi {username}, select the service&#40;s&#41; you would like to have
			</Header>
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const Header = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #696868;
	width: 90%;
	padding: 16px;
	text-align: left;
	margin-top: 10%;
`

export default MobileHomepage
