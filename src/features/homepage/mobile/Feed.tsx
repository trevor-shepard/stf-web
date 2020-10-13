import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

import { useSelector } from 'react-redux'
import FeedListItem from './FeedListItem'
import { RootState } from 'store/rootReducer'
import { Group, Action } from 'types'

interface Props {
	groupID: string
}

const Feed: FunctionComponent<Props> = ({ groupID }) => {
	const allMembers = useSelector((state: RootState) => state.members)
	const groups = useSelector((state: RootState) => state.groups)
	const group = groups[groupID] as Group
	
	const actions = Object.keys(allMembers)
		.reduce((acc: Action[], uid) => {
			if (!group) return [...acc, ...Object.values(allMembers[uid].actions)]
			if (group && group.members.includes(uid))
				return [...acc, ...Object.values(allMembers[uid].actions)]
			return acc
		}, [])
		.sort((a, b) => b.date - a.date)
		.map(action => (
			<FeedListItem
				action={action}
				username={allMembers[action.uid].username}
			/>
		))

	return <Container>{actions}</Container>
}

const Container = styled.div`
	flex-direction: column;
	height: 100%;
`

export default Feed
