import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import { logo } from 'assets/images'

const Desktop: FunctionComponent = () => {
	const { pathname } = useLocation()
	const { username } = useSelector((state: RootState) => state.user)
	useEffect(() => window.scrollTo(0, 0), [pathname])

	return (
		<Navbar>
			<Link to="/">
				<Logo src={logo} />
			</Link>

			{/* <Tab to="" current={pathname === '/profile'}>

			</Tab> */}

			<TabContainer>
				<UserTab current={pathname === '/profile'} to="/profile">
					<Username>{username}</Username>
					<EditProfile>Edit Profile</EditProfile>
				</UserTab>
			</TabContainer>
		</Navbar>
	)
}

const Navbar = styled.div`
	height: 85px;
	width: 100%;
	border-top: 1px solid #c4c4c4;
	display: flex;
	justify-content: space-between;
	align-items: center;
	opacity: 1;
	background-color: #ffff;
	background: #fffdfd;
	box-shadow: 0px 4px 4px rgba(205, 205, 205, 0.25);
`
interface TabIconProps {
	current: boolean
}

const TabContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 30%;
	margin-right: 3%;
`

// const Tab = styled(Link)<TabIconProps>`
// 	text-decoration: none;
// 	font-family: Open Sans;
// 	font-style: normal;
// 	font-weight: normal;
// 	font-size: 17px;
// 	line-height: 22px;
// 	letter-spacing: -0.408px;
// 	color: #000000;
// 	font-weight: ${({ current }) => (current ? 'bold' : 'normal')};
// 	color: ${({ current }) => (current ? '#E4BF7A' : '#000000')};
// `

const UserTab = styled(Link)<TabIconProps>`
	text-decoration: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`

const Username = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #000000;
`

const EditProfile = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 22px;
	/* identical to box height, or 169% */

	letter-spacing: -0.408px;

	color: #000000;
`

const Logo = styled.img`
	width: 113px;
	height: 22px;
	margin-left: 30px;
`
export default Desktop
