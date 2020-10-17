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

	const [groupID, setGroupID] = useState('')
	const [showRecord, setShowRecord] = useState(false)
	const [activityName, setActivityName] = useState('')

	return (
		<Container>
			<Header
				groupID={groupID}
				groups={groups}
				selectGroup={setGroupID}
				handleAdd={() => setShowRecord(true)}
			/>
			{showRecord && (
				<RecordActivity
					name={activityName}
					hideModal={() => setShowRecord(false)}
				/>
			)}
			<ActivityCarousel
				showRecord={setShowRecord}
				setActivity={setActivityName}
			/>
			<OverflowContainer>
				<Feed groupID={groupID} />
			</OverflowContainer>
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

const OverflowContainer = styled.div`
	overflow: scroll;
	height: 100%;
`

export default MobileHomepage
