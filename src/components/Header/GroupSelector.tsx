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
		<GroupListItem onClick={()=> {
			
			selectGroup(group.id)
			setDrop(false)
		
		} }>{group.name}</GroupListItem>
	))

	const group = groups[groupID]

	return (
		<Container>
			<GroupName>
				{groupID ? group.name : 'AllGroups'}
			</GroupName>
			{drop && <GroupList>{listValues}</GroupList>}
			<DropDown src={dropDown} onClick={() => setDrop(!drop)} />
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

const DropDown = styled.img`
	height: 8px;
	width: 16px;
	position: absolute;
	right: -20px;
`

const GroupList = styled.div`
	z-index: 4;
	position: absolute;
	right: -75px;
    bottom: -25px;
	background-color: #ffffff;
	z-index: 10;
	border: 1px solid black;
	border-radius: 4px;
	padding: 10px;

`

const GroupListItem = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 120%;
`

export default Screen
