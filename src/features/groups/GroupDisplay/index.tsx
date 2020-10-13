import React, {
	FunctionComponent,
	useState,
	Dispatch,
	SetStateAction
} from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Group } from 'types'
import Vote from './Vote'
interface Props {
	group: Group
	display: 'fame' | 'shame' | 'members'
	setDisplay: Dispatch<SetStateAction<'fame' | 'shame' | 'members'>>
}

const GroupDisplay: FunctionComponent<Props> = ({
	group,
	display,
	setDisplay
}) => {
	const allMembers = useSelector((state: RootState) => state.members)

	const [name, setName] = useState('')
	const { activities } = group

	let members: (JSX.Element | null)[] = Object.values(group.members).map(id => {
		const member = allMembers[id]
		return member ? <li>{member.username}</li> : null
	})

	// sort activities
	let fame: (JSX.Element | Element)[] = []
	let shame: (JSX.Element | Element)[] = []
	const names = Object.keys(activities) as string[]
	for (const name of names) {
		const [verb, unit] = name.split('$')
		const votes = activities[name]
		const vote = Object.values(votes).reduce((acc, curr) => acc + curr)
		const listItem = (
			<li onClick={() => setName(name)}>
				<div>
					{verb.split('_').join(' ')} 1 {unit}
				</div>
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
			{name !== '' && (
				<Vote
					hideModal={() => setName('')}
					groupID={group.id}
					name={name}
					votes={group.activities[name]}
				/>
			)}
			<DisplayToggle>
				<ToggleSelector
					selected={display === 'members'}
					onClick={() => setDisplay('members')}
				>
					members
				</ToggleSelector>
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
