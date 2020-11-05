import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { requestVote } from 'store/slices/groupsSlice'
import { Icons } from 'types'

import { ModalTitle, SubmitButton } from 'components/styled'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import IconPicker from './IconPicker'

interface Props {
	hideModal: () => void
	name: string
	votes: {
		[uid: string]: number
	}

	groupID: string
}

const Vote: FunctionComponent<Props> = ({
	hideModal,
	groupID,
	name,
	votes
}) => {
	const uid = useSelector((state: RootState) => state.user.uid) as string
	const members = useSelector((state: RootState) => state.members)
	const group = useSelector((state: RootState) => state.groups[groupID])
	const [vote, setVote] = useState<number | '-' | null>(0)
	const [currAvg, setCurrAvg] = useState(0)
	const [loading, setLoading] = useState(false)
	const [icon, setIcon] = useState<Icons>(group.icons[name])
	const [initalVote, setInititalVote] = useState(false)

	const [verb, unit] = name.split('$')

	useEffect(() => {
		if (votes[uid] && !initalVote) {
			setVote(votes[uid])
			setInititalVote(true)
		}
		const avg =
			Object.values(votes).reduce((acc, curr) => acc + curr) /
			Object.values(votes).length
		setCurrAvg(avg)
	}, [votes, uid, initalVote])

	const dispatch = useDispatch()

	const handleSubmit = async () => {
		setLoading(true)
		if (!vote || vote === '-') return
		await dispatch(requestVote(groupID, name, vote, icon))
		setLoading(false)
	}

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		const num =
			val !== '' ? (val === '-' ? '-' : parseInt(val)) : null
		setVote(num)
	}

	const MemberVotes = group.members.map((uid, i) => {
		if (uid === 'example') {
			return <div>Example - {votes[uid]}</div>
		}

		const { username } = members[uid]

		const memberVote = votes[uid]

		return (
			<div key={`${i}-votes-item`}>
				{username} {memberVote ? memberVote : 'none'}
			</div>
		)
	})

	return (
		<Modal hideModal={hideModal}>
			{loading ? (
				<div>loading</div>
			) : (
				<>
					<TitleBar>
						<IconPicker icon={icon} setIcon={setIcon} />
						<ModalTitle>
							{verb.split('_').join(' ')} {unit.split('_').join(' ')} {currAvg}
						</ModalTitle>
					</TitleBar>

					<TextInput
						handleInput={handleInput}
						value={vote ? vote.toString() : ''}
						type={'number'}
						label={'Your Vote'}
					/>
					<SubmitButton onClick={handleSubmit}>Submit</SubmitButton>

					{MemberVotes}
				</>
			)}
		</Modal>
	)
}
const TitleBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: baseline;
`

export default Vote
