import React, {
	FunctionComponent,
	useState,
	Dispatch,
	SetStateAction
} from 'react'
import {keyframes} from '@emotion/core'
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
	const [copied, setCopied] = useState(false)
	const { activities, id , locked } = group
	const isUnLocked =  Object.values(locked).reduce((acc, curr) => curr ? acc + 1 : acc, 0) < ( Object.values(locked).length / 2)


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
			{isUnLocked && <InviteCode onClick={async () => {
				await navigator.clipboard.writeText(`${id}`)
				setCopied(true)
			}}>invite code - {id} {<Copied out={!copied}> copied to clipboard </Copied>} </InviteCode>}
			

			<OverflowContainer>
				{display === 'fame' && fame}
				{display === 'shame' && shame}
				{display === 'members' && members}
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

const InviteCode = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 17px;
	line-height: 120%;
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 0.177303px;
	color: #262626;
	cursor: pointer;
	position: relative;
	margin-bottom: 10px;
`

interface CopiedProps {
	out: boolean
}

const fadeIn = keyframes`
  from {
    transform: scale(.75);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 0;
  }

  to {
    transform: scale(.75);
    opacity: 1;
  }
`;
const Copied = styled.div<CopiedProps>`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 12px;
	line-height: 120%;
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 0.177303px;
	color: #262626;
	position: absolute;
	top: 15px;
	visibility: ${props => props.out ? 'hidden' : 'visible'};
	animation: ${props => props.out ? fadeOut : fadeIn} .5s linear;
	transition: visibility 1s linear;
    opacity: 1;
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
