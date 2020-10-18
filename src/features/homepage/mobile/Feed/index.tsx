import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Group, Action } from 'types'
import FeedListItem from './FeedListItem'
import { useDispatch } from 'react-redux'
import { subscribeToMember } from 'store/slices/membersSlice'

interface Props {
	groupID: string
}

const Feed: FunctionComponent<Props> = ({ groupID }) => {
	const dispatch = useDispatch()
	const allMembers = useSelector((state: RootState) => state.members)
	const allActions: Action[] = Object.values(allMembers).reduce((acc: Action[], curr) => [...acc, ...Object.values(curr.actions)], [])
	const groups = useSelector((state: RootState) => state.groups)
	const group = groups[groupID] as Group
	const [actionValues, setActionValues] = useState<{
		[name: string]: {
			[groupID: string]: number
		}
	}>({})
	
	useEffect(() => {
		const actionGroupValues: {
			[name: string]: {
				[groupID: string]: number
			}
		} = {}
		for (const group of Object.values(groups)) {
			const { id, activities } = group

			for (const name of Object.keys(activities)) {
				const votes = activities[name]
				const score =
					Object.values(votes).reduce((acc, curr) => acc + curr) /
					Object.values(votes).length

				actionGroupValues[name]
					? (actionGroupValues[name] = {
							...actionGroupValues[name],
							[id]: score
					  })
					: (actionGroupValues[name] = { [id]: score })
			}
		}
		setActionValues(actionGroupValues)
	}, [groups])


	useEffect(() => {
		const unsubscribes: (()=> void)[] = []
		for (const uid of Object.keys(allMembers)) {
			unsubscribes.push(subscribeToMember(dispatch, uid))
		}

		return () => {
			for (const unsubscribe of unsubscribes) {
				unsubscribe()
			}
		}
	}, [dispatch, allMembers])

	const actions = Object.keys(allMembers)
		.reduce((acc: Action[], uid) => {
			if (!group) return [...acc, ...Object.values(allMembers[uid].actions)]
			if (group && group.members.includes(uid))
				return [...acc, ...Object.values(allMembers[uid].actions)]
			return acc
		}, [])
		.sort((a, b) => b.date - a.date)
		.map((action, i) => (
			<FeedListItem
				groupValues={actionValues[action.name] ? actionValues[action.name] : {}}
				action={action}
				member={allMembers[action.uid]}
				key={`${i}-feed-list-item`}
			/>
		))

	return <Container>{actions}</Container>
}

const Container = styled.div`
	margin-top: 4%;
	flex-direction: column;
	height: 100%;
`

export default Feed
