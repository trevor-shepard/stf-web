import React, {
	FunctionComponent,
	Dispatch,
	SetStateAction,
	useState
} from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Text from 'components/inputs/text'
import { ModalTitle } from 'components/styled'
interface Props {
	setActivity: Dispatch<SetStateAction<string>>
}

const SelectActivity: FunctionComponent<Props> = ({ setActivity }) => {
	const groups = useSelector((state: RootState) => state.groups)
	const [search, setSearch] = useState('')
	// get all verbs from all groups

	const activityValues: { [name: string]: number[] } = {}
	const verbs = Object.keys(
		Object.values(groups).reduce((acc, group) => {
			const { activities } = group
			const names = Object.keys(activities)

			for (const name of names) {
				const value = Object.values(activities[name]).reduce((acc, curr, i) => {
					const prev = acc * i
					return (prev + curr) / (i + 1)
				})

				if (activityValues[name]) {
					activityValues[name].push(value)
				} else {
					activityValues[name] = [value]
				}
			}

			return { ...acc, ...activities }
		}, [])
	)

	const activities = verbs
		.map(name => {
			const value = activityValues[name].reduce((acc, curr, i) => {
				const prev = acc * i
				return (prev + curr) / (i + 1)
			})
			return {
				name,
				value
			}
		})
		.sort((a, b) => b.value - a.value)
		.map(({ name, value }, i) => {
			const [verb, unit] = name.split('$')
			return (
				<ActivityContainer
					key={`${i}-activity-item`}
					onClick={() => setActivity(name)}
					value={value >= 0}
				>
					<Title>
						{verb.split('_').join(' ')} {unit.split('_').join(' ')}
					</Title>
					<Value value={value >= 0}>{Math.floor(value)}</Value>
				</ActivityContainer>
			)
		})

	return (
		<>
			<ModalTitle>Record An Activity</ModalTitle>
			<Text
				label="search"
				value={search}
				handleInput={e => setSearch(e.target.value)}
			/>
			<OverflowContainer>{activities}</OverflowContainer>
		</>
	)
}

const ActivityContainer = styled.div<{ value: boolean }>`
	background: ${({ value }) => (value ? '#00A757' : '#F45757')};
	height: 15%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	margin-bottom: 2%;
	border-left: 5px solid ${({ value }) => (value ? '#024323' : '#720D0D')};
`

const Title = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: 800;
	font-size: 20px;
	line-height: 120%;
	display: flex;
	align-items: center;
	letter-spacing: 0.177303px;
	color: #262626;
	padding: 4%;
	color: '#ffffff';
`

const Value = styled.div<{ value: boolean }>`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 120%;
	display: flex;
	align-items: center;
	letter-spacing: 0.177303px;
	color: #262626;
	padding: 4%;
	color: ${({ value }) => (value ? '#034323' : '#710E0E')};
`

const OverflowContainer = styled.div`
	height: 60%;
	overflow: scroll;
	margin-bottom: 30px;
	margin-top: 30px;
	width: 90%;
	overflow-x: hidden;
`

export default SelectActivity
