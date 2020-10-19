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
	Left?: FunctionComponent
}

const Screen: FunctionComponent<Props> = ({
	groupID,
	groups,
	selectGroup,
	handleAdd,
	Left
}) => {
	return (
		<Container>
			{ Left ? <Left/ > : <SpaceHolder />}
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
	height: 60px;
	border-bottom: 0.5px solid #7b8794;
	background: #ffffff;
	width: 100%;
`

const AddIcon = styled.img`
	padding-right: 4%;
`

const SpaceHolder = styled.div`
	width: 18px;
	padding-left: 4%;
`

export default Screen
