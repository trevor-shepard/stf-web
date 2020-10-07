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
		<GroupListItem>{group.name}</GroupListItem>
	))

	const group = groups[groupID]

	return (
		<Container>
			<GroupName>
				{groupID ? group.name : 'AllGroups'}
				<DropDown src={dropDown} onClick={() => setDrop(!drop)} />
				{drop && <GroupList>{listValues}</GroupList>}
			</GroupName>
		</Container>
	)
}

const Container = styled.div``

const GroupName = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 120%;
`

const DropDown = styled.img`
	height: 8px;
	width: 16px;
	margin-left: 5px;
`

const GroupList = styled.ul`
	z-index: 4;
`

const GroupListItem = styled.li``

export default Screen
