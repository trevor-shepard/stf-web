import React, { FunctionComponent, Dispatch, SetStateAction } from 'react'
import GroupSelector from './GroupSelector'
import styled from '@emotion/styled'
import { GroupsState } from 'types'
interface Props {
	groups: GroupsState
	groupID: string
	selectGroup: Dispatch<SetStateAction<string>>
	Left?: FunctionComponent | JSX.Element | false
	Right?: FunctionComponent | JSX.Element | false
}

const Screen: FunctionComponent<Props> = ({
	groupID,
	groups,
	selectGroup,
	Right,
	Left
}) => {
	return (
		<Container>
			<LeftContainer>{Left ? Left : <SpaceHolder />}</LeftContainer>

			<GroupSelector
				groupID={groupID}
				selectGroup={selectGroup}
				groups={groups}
			/>

			<RightContainer>{Right ? Right : <SpaceHolder />}</RightContainer>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 60px;
	border-bottom: 0.5px solid #7b8794;
	background: #ffffff;
	width: 100%;
	position: relative;
`

const SpaceHolder = styled.div`
	width: 18px;
	padding-left: 4%;
`

const LeftContainer = styled.div`
	position: absolute;
	left: 10px;
`
const RightContainer = styled.div`
	position: absolute;
	right: 10px;
`

export default Screen
