import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { subscribeToGroups } from 'store/slices/groupsSlice'
import { add_round, hamburger } from 'assets/icons'
import Header from 'components/Header'
import Modal from 'components/Modal'
import GroupDisplay from 'features/groups/GroupDisplay'
import AddActivity from './AddActivity'
import JoinGroup from './JoinGroup'
import CreateGroup from './CreateGroup'

const MobileGroups: FunctionComponent = () => {
	const dispatch = useDispatch()
	const groups = useSelector((state: RootState) => state.groups)
	const { uid } = useSelector((state: RootState) => state.user)
	const [groupID, setGroupID] = useState('')
	const [copied, setCopied] = useState(false)

	const [addActivityModal, setAddActivityModal] = useState(false)
	const [newGroupModal, setNewGroupModal] = useState(false)
	const [toggleNewGroupModal, setToggleNewGroupModal] = useState(false)

	const [showHam, setShowHam] = useState(false)

	useEffect(() => {
		const allGroups = Object.values(groups)
		const firstGroup = allGroups[0]

		if (allGroups.length === 0) {
			setNewGroupModal(true)
		}

		if (firstGroup && groupID === '') setGroupID(firstGroup.id)

		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		const unsubscribe = subscribeToGroups(dispatch, uid as string)

		return unsubscribe
	}, [groups, dispatch, uid])

	const group = groups[groupID]

	let isLocked = false
	if (group) {
		const { locked } = group

		isLocked =
			Object.values(locked).reduce((acc, curr) => (curr ? acc + 1 : acc), 0) >=
			Object.values(locked).length / 2
	}

	return (
		<Container onClick={() => setShowHam(false)}>
			{addActivityModal && (
				<AddActivity
					groupID={groupID}
					hideModal={() => setAddActivityModal(false)}
				/>
			)}
			{newGroupModal && (
				<Modal hideModal={() => setNewGroupModal(false)}>
					{toggleNewGroupModal ? (
						<JoinGroup
							hideModal={() => setNewGroupModal(false)}
							toggleModal={() => setToggleNewGroupModal(!toggleNewGroupModal)}
						/>
					) : (
						<CreateGroup
							hideModal={() => setNewGroupModal(false)}
							toggleModal={() => setToggleNewGroupModal(!toggleNewGroupModal)}
						/>
					)}
				</Modal>
			)}
			<Header
				groupID={groupID}
				groups={groups}
				selectGroup={setGroupID}
				Right={
					<HamburgerContainer onClick={e => e.stopPropagation()}>
						<Hamburger src={hamburger} onClick={(e) => {
							setShowHam(true)
							e.stopPropagation()
							}} />
						{showHam && (
							<HamburgerList>
								<HamburgerListItem
									onClick={() => {
										setToggleNewGroupModal(false)
										setNewGroupModal(true)
									}}
								>
									Create Group
								</HamburgerListItem>
								<HamburgerListItem
									onClick={() => {
										setToggleNewGroupModal(true)
										setNewGroupModal(true)
									}}
								>
									Join Group
								</HamburgerListItem>
								{isLocked === false && (
									<HamburgerListItem
										onClick={async () => {
											await navigator.clipboard.writeText(`${groupID}`)
											setCopied(true)
										}}
									>
										copy invite code
										{<Copied out={!copied}> copied to clipboard </Copied>}
									</HamburgerListItem>
								)}
							</HamburgerList>
						)}
					</HamburgerContainer>
				}
			/>

			<Add
				src={add_round}
				onClick={() => setAddActivityModal(!addActivityModal)}
			/>

			<OverflowContainer>
				{group ? <GroupDisplay group={group} /> : 'create or join a group'}
			</OverflowContainer>
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

interface CopiedProps {
	out: boolean
}

const fadeIn = keyframes`
  from {
    transform: scale(.75);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 0;
  }

  to {
    transform: scale(.75);
    opacity: 1;
  }
`

const Copied = styled.div<CopiedProps>`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 12px;
	line-height: 120%;
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 0.177303px;
	color: #262626;
	position: absolute;
	top: 20px;
	left: -9px;
	visibility: ${props => (props.out ? 'hidden' : 'visible')};
	animation: ${props => (props.out ? fadeOut : fadeIn)} 0.5s linear;
	transition: visibility 1s linear;
	opacity: 1;
	width: 130px;
`

const OverflowContainer = styled.div`
	overflow: scroll;
	height: 100%;
`

const Add = styled.img`
	position: fixed;
	z-index: 10;
	bottom: 90px;
	right: 10%;
`

const HamburgerContainer = styled.div`
	position: relative;
`
const HamburgerList = styled.div`
	position: absolute;
	padding: 5px;
	left: -125px;
	bottom: -109px;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	border: 1px solid black;
	border-radius: 4%;
`
const HamburgerListItem = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 120%;
	border-bottom: 1px solid black;
	margin-bottom: 15px;
	position: relative;
`

const Hamburger = styled.img``

export default MobileGroups
