import React, { FunctionComponent, Dispatch, SetStateAction } from 'react'
import GroupSelector from './GroupSelector'
import styled from '@emotion/styled'
import { add } from 'assets/icons'
import { GroupsState } from 'types'
interface Props {
	selectGroup: Dispatch<SetStateAction<string>>
	groups: GroupsState
	groupID: string
	handleAdd?: () => void
}

const Screen: FunctionComponent<Props> = ({
	groupID,
	groups,
	selectGroup,
	handleAdd
}) => {
	return (
		<Container>
			<div />
			<GroupSelector
				groupID={groupID}
				selectGroup={selectGroup}
				groups={groups}
			/>
			<AddIcon onClick={handleAdd} src={add} />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100px;
	border-bottom: 0.5px solid #7b8794;
	background: #ffffff;
	width: 100%;
`

const AddIcon = styled.img``

export default Screen
