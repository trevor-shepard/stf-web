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
					/>
					<Toggle>
						<Left onClick={()=> setToggle(false)} selected={!toggle}>
							Feed
						</Left>
						<Right onClick={()=> setToggle(true)} selected={toggle}>
							Standings
						</Right>
					</Toggle>
					<Add src={add_round} onClick={() => setRecord(true)} />
					
						{toggle ? (
							<Standings setGroupID={setGroupID} groupID={groupID} />
						) : (
							<Feed setGroupID={setGroupID} groupID={groupID} />
						)}
					
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
	position: relative;
`

const Add = styled.img`
	position: fixed;
	z-index: 10;
	bottom: 90px;
	right: 0;
`

const Toggle = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	flex-direction:row;
	justify-content: center;
	align-items: center;
  	border-bottom-left-radius: 50%;
	position: absolute;
	top: 61px;
	z-index: 20;
`

const Tab = styled.div<{selected: boolean}>`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction:row;
	align-items: center;
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 120%;
	background-color: ${({selected}) => selected ? '#F0C71B' :'#FFE36E'};
	padding-left: 40px;
	padding-right: 50px;
`

const Right = styled(Tab)`
	border-bottom-right-radius: 90%;
`
const Left = styled(Tab)`
	border-bottom-left-radius: 90%;
	justify-content: flex-end;
`

export default MobileHomepage
