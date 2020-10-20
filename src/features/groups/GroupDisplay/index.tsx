import React, {
	FunctionComponent,
	useState,
	Dispatch,
	SetStateAction
} from 'react'
import styled from '@emotion/styled'
import { Group } from 'types'
import Vote from './Vote'
interface Props {
	group: Group
	display: 'fame' | 'shame'
	setDisplay: Dispatch<SetStateAction<'fame' | 'shame'>>
}

const GroupDisplay: FunctionComponent<Props> = ({
	group,
	display,
	setDisplay
}) => {
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

	// sort activities

	const names = Object.keys(activities) as string[]

	let fameObjs: { name: string; score: number }[] = []
	let shameObjs: { name: string; score: number }[] = []
	for (const name of names) {
		const score = activityValues[name]

		if (score > 0) {
			fameObjs = [
				...fameObjs,
				{
					name,
					score
				}
			]
		} else {
			shameObjs = [
				...shameObjs,
				{
					name,
					score
				}
			]
		}
	}

	const fame: (JSX.Element | Element)[] = fameObjs
		.sort((a, b) => a.score - b.score)
		.map(({ name, score }, i) => {
			const [verb, unit] = name.split('$')
			return (
				<Activity key={`${i}-activity-fame-item`} onClick={() => setName(name)}>
					<ActivityDetail>
						{verb.split('_').join(' ')} 1 {unit}
					</ActivityDetail>
					<ActivityDetail>{score}</ActivityDetail>
				</Activity>
			)
		})
	const shame: (JSX.Element | Element)[] = shameObjs
		.sort((a, b) => a.score - b.score)
		.map(({ name, score }, i) => {
			const [verb, unit] = name.split('$')
			return (
				<Activity key={`${i}-activity-fame-item`} onClick={() => setName(name)}>
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

			<OverflowContainer>
				{display === 'fame' && fame}
				{display === 'shame' && shame}
			</OverflowContainer>
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
	margin-left: 10px;
	margin-right: 10px;
	font-family: Mulish;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 114%;
	text-align: center;
	letter-spacing: 0.2px;
	cursor: pointer;
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

const OverflowContainer = styled.div`
	padding-top: 10px;
	overflow: scroll;
	height: 100%;
`

export default GroupDisplay
