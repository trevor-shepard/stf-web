import React, {
	FunctionComponent,
	Dispatch,
	SetStateAction,
	useEffect
} from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Group, Member } from 'types'
import MemberComponent from './Member'

interface Props {
	groupID: string
	setGroupID: Dispatch<SetStateAction<string>>
}

const Feed: FunctionComponent<Props> = ({ groupID, setGroupID }) => {
	const allMembers = useSelector((state: RootState) => state.members)
	const groups = useSelector((state: RootState) => state.groups)

	const group = groups[groupID] as Group

	useEffect(() => {
		const firstGroup = Object.values(groups)[0]

		if (firstGroup && groupID === '') setGroupID(firstGroup.id)
	}, [groups, groupID, setGroupID])

	const { activities } = group

	const activityValues: { [name: string]: number } = Object.keys(
		activities
	).reduce((acc, name) => {
		const votes = activities[name]

		const value =
			Object.values(votes).reduce((sum, curr) => sum + curr) /
			Object.values(votes).length
		return {
			...acc,
			[name]: value
		}
	}, {})

	const memberIDs = group.members as string[]

	let members = memberIDs
		.reduce((acc: { member: Member; score: number }[], id) => {
			const member = allMembers[id]
			const actions = member.actions

			let score = 0

			for (const id of Object.keys(actions)) {
				const { name, quantity } = actions[id]
				if (activityValues[name]) {
					score = score + activityValues[name] * quantity
				}
			}

			if (member)
				return [
					...acc,
					{
						member,
						score
					}
				]

			return acc
		}, [])
		.sort((a, b) => b.score - a.score)
		.map(({ member, score }, i) => (
			<MemberComponent
				key={`${i}-member-item`}
				rank={i + 1}
				member={member}
				score={score}
			/>
		))

	return <Container>{members}</Container>
}

const Container = styled.div`
	margin-top: 4%;
	flex-direction: column;
	height: 100%;
`

export default Feed
