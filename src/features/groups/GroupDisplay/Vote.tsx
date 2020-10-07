import React, { FunctionComponent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { requestVote } from 'store/slices/groupsSlice'
interface Props {
	hideModal: () => void

	verb: string
	activity: {
		unit: string
		votes: {
			[uid: string]: number
		}
	}
	groupID: string
}

const Vote: FunctionComponent<Props> = ({
	hideModal,
	verb,
	groupID,
	activity: { unit, votes }
}) => {
	const uid = useSelector((state: RootState) => state.user.uid) as string
	const members = useSelector((state: RootState) => state.members)
	const [vote, setVote] = useState(0)
	const [currAvg, setCurrAvg] = useState(0)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (votes[uid]) setVote(votes[uid])
	}, [])

	useEffect(() => {
		const avg =
			Object.values(votes).reduce((acc, curr) => acc + curr) /
			Object.values(votes).length
		setCurrAvg(avg)
	}, [votes])

	const dispatch = useDispatch()

	const handleSubmit = async () => {
		setLoading(true)
		await dispatch(requestVote(groupID, verb, vote))
		setLoading(false)
	}

	const MemberVotes = Object.keys(votes).map(uid => {
		if (uid === 'example') {
			return <div>Example - {votes[uid]}</div>
		}

		const { username } = members[uid]

		const memberVote = votes[uid]

		return (
			<div>
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
					<Title>
						{verb} 1 {unit} - {currAvg}
					</Title>
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

const Title = styled.div``

const SubmitButton = styled.button`
	font-family: Poppins;
	background-color: #3e3e3e;
	border-radius: 3px;
	color: white;
	display: block;
	width: 30%;
	font-weight: 500;
	line-height: 22px;
	padding: 11px;
	margin-bottom: 22px;
	text-transform: capitalize;
`

export default Vote
