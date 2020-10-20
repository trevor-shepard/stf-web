import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { add_round } from 'assets/icons'
import Header from 'components/Header'
import RecordActivity from './RecordActivity'
import Feed from './Feed'
import Standings from './Standings'
const MobileHomepage: FunctionComponent = () => {
	const groups = useSelector((state: RootState) => state.groups)
	const [toggle, setToggle] = useState(false)
	const [groupID, setGroupID] = useState('')
	const [showRecord, setShowRecord] = useState(false)

	return (
		<Container>
			<Header
				groupID={groupID}
				groups={groups}
				selectGroup={setGroupID}
				Right={
					<Right onClick={() => setToggle(!toggle)}>
						{toggle ? 'Feed' : 'Standings'}
					</Right>
				}
			/>
			{showRecord && <RecordActivity hideModal={() => setShowRecord(false)} />}

			<Add src={add_round} onClick={() => setShowRecord(true)} />

			<OverflowContainer>
				{toggle ? (
					<Standings setGroupID={setGroupID} groupID={groupID} />
				) : (
					<Feed setGroupID={setGroupID} groupID={groupID} />
				)}
			</OverflowContainer>
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
`

const OverflowContainer = styled.div`
	overflow: scroll;
	height: 100%;
`

const Add = styled.img`
	position: absolute;
	z-index: 10;
	left: 10%;
	top: 10%;
	left: 76%;
	top: 86%;
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
