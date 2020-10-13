import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { RootState } from 'store/rootReducer'
import { useSelector } from 'react-redux'

import Logout from 'components/Logout'

const Profile: FunctionComponent = () => {
	const user = useSelector((state: RootState) => state.user)

	return (
		<Container>
			<Logout />
			{`${user.username} 
			${user.email}`}
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

export default Profile
