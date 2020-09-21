import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

const DesktopHomepage: FunctionComponent = () => {
	const { username } = useSelector((state: RootState) => state.user)

	return (
		<Container>
			<Left>
				<Header>
					Hi {username}, select the service&#40;s&#41; you would like to have
				</Header>
			</Left>
			<Right></Right>
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: none;
	display: flex;
	flex-direction: row;
`
const Left = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 5%;
	padding-left: 5%;
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
`

const Right = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 10%;
	padding-left: 10%;
`

export default DesktopHomepage
