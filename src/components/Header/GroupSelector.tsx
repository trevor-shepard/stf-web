import React, {
	FunctionComponent,
	useState,
	Dispatch,
	SetStateAction
} from 'react'
import styled from '@emotion/styled'
import { dropDown } from 'assets/icons'
import { GroupsState } from 'types'

interface HeaderProps {
	selectGroup: Dispatch<SetStateAction<string>>
	groups: GroupsState
	groupID: string
}

const Screen: FunctionComponent<HeaderProps> = ({
	selectGroup,
	groups,
	groupID
}) => {
	const [drop, setDrop] = useState(false)
	const listValues = Object.values(groups).map(group => (
		<GroupListItem
			onClick={e => {
				e.stopPropagation()
				selectGroup(group.id)
				setDrop(false)
			}}
		>
			{group.name}
		</GroupListItem>
	))

	const group = groups[groupID]

	return (
		<Container
			onClick={() => {
				if (drop) setDrop(false)
			}}
		>
			<GroupName>{groupID ? group.name : 'AllGroups'}</GroupName>
			{drop && <GroupList>{listValues}</GroupList>}
			<DropDown drop={drop} src={dropDown} onClick={() => setDrop(!drop)} />
		</Container>
	)
}

const Container = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	position: relative;
`

const GroupName = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 120%;
`

interface DropProps {
	drop: boolean
}

const DropDown = styled.img<DropProps>`
	${({ drop }) => (drop ? `transform: rotate(180deg);` : null)}
	height: 8px;
	width: 16px;
	position: absolute;
	right: -20px;
`

const GroupList = styled.div`
	z-index: 4;
	position: absolute;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	width: 125px; /* Need a specific value to work */
	background-color: #ffffff;
	z-index: 10;
	border: 1px solid black;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	top: 40px;
`

const GroupListItem = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-size: 12px;
	line-height: 120%;
	margin-bottom: 10px;
`

export default Screen
