import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { Group } from 'types'
import Vote from './Vote'
interface Props {
	group: Group
}

const GroupDisplay: FunctionComponent<Props> = ({ group }) => {
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

	const activityEls: JSX.Element[] = names
		.map(name => {
			const score = activityValues[name]
			return {
				name,
				score
			}
		})
		.sort((a, b) => b.score - a.score)
		.map(({ name, score }, i) => {
			const [verb, unit] = name.split('$')
			return (
				<Activity key={`${i}-activity-fame-item`} onClick={() => setName(name)}>
					<ActivityDetail>
						{verb.split('_').join(' ')} 1 {unit.split('_').join(' ')}
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
			<OverflowContainer>{activityEls}</OverflowContainer>
		</Container>
	)
}

const Container = styled.div`
	overflow: scroll;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
	padding-bottom: 50px;
`

export default GroupDisplay
