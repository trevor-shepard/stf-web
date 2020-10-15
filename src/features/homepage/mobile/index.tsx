import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Header from 'components/Header'
import RecordActivity from './RecordActivity'
import Feed from './Feed'
import ActivityCarousel from './ActivityCarousel'
const MobileHomepage: FunctionComponent = () => {
	const groups = useSelector((state: RootState) => state.groups)
	// const members = useSelector((state: RootState) => state.members)

	const [groupID, setGroupID] = useState('')
	const [showRecord, setShowRecord] = useState(false)
	const [activityName, setActivityName] = useState('')	
	
	
	// const groupNames = Object.values(groups).map(group => group.name)

	return (
		<Container>
			<Header
				groupID={groupID}
				groups={groups}
				selectGroup={setGroupID}
				handleAdd={() => setShowRecord(true)}
			/>
			{showRecord && <RecordActivity name={activityName}  hideModal={() => setShowRecord(false)} />}
			<ActivityCarousel showRecord={setShowRecord}   setActivity={setActivityName} />
			<Feed groupID={groupID} />
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

export default MobileHomepage
