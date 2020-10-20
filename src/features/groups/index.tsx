import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { subscribeToGroups } from 'store/slices/groupsSlice'
import { add_round } from 'assets/icons'
import Header from 'components/Header'
import GroupDisplay from 'features/groups/GroupDisplay'
import AddActivity from './AddActivity'

const MobileGroups: FunctionComponent = () => {
	const dispatch = useDispatch()
	const groups = useSelector((state: RootState) => state.groups)
	const { uid } = useSelector((state: RootState) => state.user)
	const [display, setDisplay] = useState<'fame' | 'shame'>('fame')
	const [groupID, setGroupID] = useState('')
	const [copied, setCopied] = useState(false)

	const [modal, setModal] = useState(false)

	useEffect(() => {
		const firstGroup = Object.values(groups)[0]

		if (firstGroup && groupID === '') setGroupID(firstGroup.id)
	}, [groups, groupID])

	useEffect(() => {
		const unsubscribe = subscribeToGroups(dispatch, uid as string)

		return unsubscribe
	}, [groups, dispatch, uid])

	const group = groups[groupID]

	if (!group) return <>loading</>

	const { locked } = group

	const isUnLocked =
		Object.values(locked).reduce((acc, curr) => (curr ? acc + 1 : acc), 0) <
		Object.values(locked).length / 2

	return (
		<Container>
			{modal && (
				<AddActivity
					display={display}
					groupID={groupID}
					hideModal={() => setModal(false)}
				/>
			)}
			<Header
				groupID={groupID}
				groups={groups}
				selectGroup={setGroupID}
				Left={
					isUnLocked && (
						<InviteCode
							onClick={async () => {
								await navigator.clipboard.writeText(`${groupID}`)
								setCopied(true)
							}}
						>
							copy invite code
							{<Copied out={!copied}> copied to clipboard </Copied>}
						</InviteCode>
					)
				}
				// Right={<AddIcon onClick={() => setModal(!modal)} src={add} />}
			/>

			<Add src={add_round} onClick={() => setModal(!modal)} />

			<OverflowContainer>
				{group ? (
					<GroupDisplay
						group={group}
						display={display}
						setDisplay={setDisplay}
					/>
				) : (
					'create or join a group'
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
	position: relative;
`

const InviteCode = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 17px;
	line-height: 120%;
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 0.177303px;
	color: #262626;
	cursor: pointer;
	position: relative;
	margin-bottom: 10px;
	width: 100px;
	margin-top: 10px;
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
	top: 37px;
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
	position: absolute;
	z-index: 10;
	bottom: 10%;
	right: 10%;
`

export default MobileGroups
