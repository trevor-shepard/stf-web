import React, { FunctionComponent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { requestVote } from 'store/slices/groupsSlice'
import { ModalTitle, SubmitButton } from 'components/styled'

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
	const [vote, setVote] = useState(0)
	const [currAvg, setCurrAvg] = useState(0)
	const [loading, setLoading] = useState(false)

	const [verb, unit] = name.split('$')

	useEffect(() => {
		if (vote === 0 && votes[uid]) setVote(votes[uid])
		const avg =
			Object.values(votes).reduce((acc, curr) => acc + curr) /
			Object.values(votes).length
		setCurrAvg(avg)
	}, [votes, uid, vote])

	const dispatch = useDispatch()

	const handleSubmit = async () => {
		setLoading(true)
		await dispatch(requestVote(groupID, verb, vote))
		setLoading(false)
	}

	const MemberVotes = Object.keys(votes).map((uid, i) => {
		if (uid === 'example') {
			return <div>Example - {votes[uid]}</div>
		}

		const { username } = members[uid]

		const memberVote = votes[uid]

		return (
			<div key={`${i}-votes-item`}>
				{username} - {memberVote}
			</div>
		)
	})

	return (
		<Modal hideModal={hideModal}>
			{loading ? (
				<div>loading</div>
			) : (
				<>
					<ModalTitle>
						{verb} 1 {unit} - {currAvg}
					</ModalTitle>
					<TextInput
						handleInput={e => setVote(parseInt(e.target.value))}
						value={vote.toString()}
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



export default Vote
