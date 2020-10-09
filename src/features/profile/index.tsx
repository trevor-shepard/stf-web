import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

import Logout from 'components/Logout'

const Profile: FunctionComponent = () => {
	return (
		<Container>
			<Logout />
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
