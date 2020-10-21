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
	const activities = Object.keys(
		Object.values(groups).reduce((acc, group) => {
			const { activities } = group

			return { ...acc, ...activities }
		}, {})
	)
		.filter(_activity => _activity.includes(search))
		.map((_activity, i) => {
			const [verb, unit] = _activity.split('$')
			return (
				<GreyContainer
					key={`${i}-activity-item`}
					onClick={() => setActivity(_activity)}
				>
					<Content>{verb.split('_').join(' ')}</Content>
					<Content>{unit.split('_').join(' ')}</Content>
				</GreyContainer>
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

const GreyContainer = styled.div`
	background: #c4c4c4 40%;
	height: 15%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	margin-bottom: 2%;
`

const Content = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 20px;
	line-height: 120%;
	display: flex;
	align-items: center;
	letter-spacing: 0.177303px;
	color: #262626;
	padding: 4%;
`

const OverflowContainer = styled.div`
	height: 60%;
	overflow: scroll;
	margin-bottom: 30px;
	margin-top: 30px;
	width: 90%;
`

export default SelectActivity
