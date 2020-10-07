import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Logout from 'components/Logout'
import Header from 'components/Header'

const MobileHomepage: FunctionComponent = () => {
	const groups = useSelector((state: RootState) => state.groups)
	// const members = useSelector((state: RootState) => state.members)

	const [groupID, setGroupID] = useState('')

	// const groupNames = Object.values(groups).map(group => group.name)

	return (
		<Container>
			<Logout />
			<Header groupID={groupID} groups={groups} selectGroup={setGroupID} />
			<Feed>No feed yet</Feed>
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

const Feed = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
`

export default MobileHomepage