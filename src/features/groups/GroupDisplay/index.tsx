import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Group } from 'types'
import Vote from './Vote'
interface Props {
	group: Group
}

const GroupDisplay: FunctionComponent<Props> = ({ group }) => {
	const allMembers = useSelector((state: RootState) => state.members)

	const [display, setDisplay] = useState<'fame' | 'shame' | 'members'>('fame')

	const [verb, setVerb] = useState('')

	const { activities } = group
	let members: (JSX.Element | null)[] = Object.values(group.members).map(id => {
		const member = allMembers[id]
		return member ? <li>{member.username}</li> : null
	})

	// sort activities
	let fame: (JSX.Element | Element)[] = []
	let shame: (JSX.Element | Element)[] = []
	const verbs = Object.keys(activities) as string[]
	for (const verb of verbs) {
		const { votes, unit } = activities[verb]
		const vote = Object.values(votes).reduce((acc, curr) => acc + curr)
		const listItem = (
			<li onClick={() => setVerb(verb)}>
				<div>
					{verb} 1 {unit}
				</div>
				<div> vote </div>
			</li>
		)
		if (vote > 0) {
			fame = [...fame, listItem]
		} else {
			shame = [...shame, listItem]
		}
	}

	return (
		<Container>
			{verb !== '' && (
				<Vote
					hideModal={() => setVerb('')}
					groupID={group.id}
					verb={verb}
					activity={group.activities[verb]}
				/>
			)}
			<DisplayToggle>
				<ToggleSelector
					selected={display === 'fame'}
					onClick={() => setDisplay('fame')}
				>
					fame
				</ToggleSelector>
				<ToggleSelector
					selected={display === 'shame'}
					onClick={() => setDisplay('shame')}
				>
					shame
				</ToggleSelector>
				<ToggleSelector
					selected={display === 'members'}
					onClick={() => setDisplay('members')}
				>
					members
				</ToggleSelector>
			</DisplayToggle>
			{display === 'fame' && fame}
			{display === 'shame' && shame}
			{display === 'members' && members}
		</Container>
	)
}

const Container = styled.div`
	overflow: scroll;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const DisplayToggle = styled.div`
	display: flex;
	flex-direction: row;
`

interface ToggleSelectorProps {
	selected: boolean
}
const ToggleSelector = styled.div<ToggleSelectorProps>`
	border-radius: 6px;
	height: 32px;

	${({ selected }) => (selected ? 'font-weight: bold' : null)};
`

export default GroupDisplay
