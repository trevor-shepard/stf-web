import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { subscribeToGroups } from "store/slices/groupsSlice";
import Header from 'components/Header'
import GroupDisplay from 'features/groups/GroupDisplay'
import CreateGroup from './CreateGroup'
import AddActivity from './AddActivity'
import Modal from 'components/Modal'
import JoinGroup from './JoinGroup'

const MobileGroups: FunctionComponent = () => {
	const dispatch = useDispatch()
	const groups = useSelector((state: RootState) => state.groups)
	const {uid} = useSelector((state: RootState) => state.user)
	const [display, setDisplay] = useState<'fame' | 'shame' | 'members'>(
		'members'
	)
	const [groupID, setGroupID] = useState('')

	const [modal, setModal] = useState(false)
	const [join, setJoin] = useState(false)

	const group = groups[groupID]

	useEffect(() => {
		const firstGroup = Object.values(groups)[0]

		if (firstGroup && groupID === '') setGroupID(firstGroup.id)
	}, [groups, groupID])

	useEffect(() => {
		const unsubscribe = subscribeToGroups(dispatch, uid as string)

		return unsubscribe
	},  [groups, dispatch, uid])

	return (
		<Container>
			{modal && display === 'members' && (
				<Modal hideModal={() => setModal(false)}>
					{join ? (
						<JoinGroup  hideModal={() => setModal(false)} toggleModal={() => setJoin(false)} />
					) : (
						<CreateGroup hideModal={() => setModal(false)} toggleModal={() => setJoin(true)} />
					)}
				</Modal>
			)}
			{modal && (display === 'shame' || display === 'fame') && (
				<AddActivity
					display={display}
					groupID={groupID}
					hideModal={() => setModal(false)}
				/>
			)}
			<Header
				groupID={groupID}
				groups={groups}
				handleAdd={() => setModal(!modal)}
				selectGroup={setGroupID}
			/>
			{group ? (
				<GroupDisplay group={group} display={display} setDisplay={setDisplay} />
			) : (
				'create or join a group'
			)}
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
	display: flex;
	flex-direction: column;
`

export default MobileGroups
