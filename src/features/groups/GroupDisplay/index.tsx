import React, {
	FunctionComponent,
	useState,
	Dispatch,
	SetStateAction
} from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Group, Member } from 'types'
import Vote from './Vote'
import MemberComponent from './Member'
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
			<MemberComponent rank={i + 1} member={member} score={score} />
		))

	// sort activities

	const names = Object.keys(activities) as string[]

	let fameObjs: { verb: string; unit: string; score: number }[] = []
	let shameObjs: { verb: string; unit: string; score: number }[] = []
	for (const name of names) {
		const [verb, unit] = name.split('$')
		const score = activityValues[name]

		if (score > 0) {
			fameObjs = [
				...fameObjs,
				{
					verb,
					unit,
					score
				}
			]
		} else {
			shameObjs = [
				...shameObjs,
				{
					verb,
					unit,
					score
				}
			]
		}
	}

	const fame: (JSX.Element | Element)[] = fameObjs
		.sort((a, b) => a.score - b.score)
		.map(({ verb, unit, score }) => {
			return (
				<Activity onClick={() => setName(name)}>
					<ActivityDetail>
						{verb.split('_').join(' ')} 1 {unit}
					</ActivityDetail>
					<ActivityDetail>{score}</ActivityDetail>
				</Activity>
			)
		})
	const shame: (JSX.Element | Element)[] = shameObjs
		.sort((a, b) => b.score - a.score)
		.map(({ verb, unit, score }) => {
			return (
				<Activity onClick={() => setName(name)}>
					<ActivityDetail>
						{verb.split('_').join(' ')} 1 {unit}
					</ActivityDetail>
					<ActivityDetail>{score}</ActivityDetail>
				</Activity>
			)
		})

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
	width: 100%;
	justify-content: center;
	margin-top: 4%;
	margin-bottom: 4%;
`

interface ToggleSelectorProps {
	selected: boolean
}
const ToggleSelector = styled.div<ToggleSelectorProps>`
	border-radius: 6px;
	height: 32px;
	border: 0.5px solid #323f4b;
	box-sizing: border-box;
	border-radius: 6px;
	${({ selected }) =>
		selected ? 'font-weight: bold; background: #2F80ED; color: #ffffff' : null};
	padding: 6px;
	padding-left: 10px;
	padding-right: 10px;
	font-family: Mulish;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 114%;
	/* identical to box height, or 16px */

	text-align: center;
	letter-spacing: 0.2px;
`
const Activity = styled.div`
	background: #c4c4c4 40%;
	height: 55px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	padding-left: 10px;
	padding-right: 30px;
	margin-bottom: 30px;
`

const ActivityDetail = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 28px;
	line-height: 120%;
	display: flex;
	align-items: center;
	letter-spacing: 0.177303px;

	color: #262626;
`

export default GroupDisplay
