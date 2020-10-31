import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { add_round } from 'assets/icons'
import Header from 'components/Header'
import RecordActivity from './RecordActivity'
import Feed from './Feed'
import Standings from './Standings'
import GroupSelector from 'components/Header/GroupSelector'
const MobileHomepage: FunctionComponent = () => {
	const groups = useSelector((state: RootState) => state.groups)
	const [toggle, setToggle] = useState(false)
	const [groupID, setGroupID] = useState('')
	const [Record, setRecord] = useState(false)

	return (
		<Container>
			{Record ? (
				<RecordActivity hideModal={() => setRecord(false)} />
			) : (
				<>
					<Header
						Middle={
							<GroupSelector
								groupID={groupID}
								groups={groups}
								selectGroup={setGroupID}
							/>
						}
						Right={
							<Right onClick={() => setToggle(!toggle)}>
								{toggle ? 'Feed' : 'Standings'}
							</Right>
						}
					/>
					<Add src={add_round} onClick={() => setRecord(true)} />
					<OverflowContainer>
						{toggle ? (
							<Standings setGroupID={setGroupID} groupID={groupID} />
						) : (
							<Feed setGroupID={setGroupID} groupID={groupID} />
						)}
					</OverflowContainer>
				</>
			)}
		</Container>
	)
}

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: none;
`

const OverflowContainer = styled.div`
	overflow: scroll;
	height: 100%;
	margin-bottom: 60px;
`

const Add = styled.img`
	position: fixed;
	z-index: 10;
	bottom: 90px;
	right: 0;
`

const Right = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 120%;
	margin-left: 10px;
`

export default MobileHomepage
