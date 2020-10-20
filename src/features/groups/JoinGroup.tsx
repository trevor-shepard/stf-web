import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import TextInput from 'components/inputs/text'
import { joinGroup } from 'store/slices/groupsSlice'

interface Props {
	toggleModal: () => void
	hideModal: () => void
}

const JoinGroup: FunctionComponent<Props> = ({ toggleModal, hideModal }) => {
	const [code, setCode] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const handleCreate = async () => {
		if (code === '') {
			setError('code cant be blank')
		} else {
			try {
				setLoading(true)
				await dispatch(joinGroup(code))
				hideModal()
			} catch (error) {
				setError('something went wrong, please check group code')
				setLoading(false)
			}
		}
	}

	return loading ? (
		<>loading</>
	) : (
		<>
			<>
				<div onClick={toggleModal}>Create Group</div>
				<Title>Join Group</Title>
				{error !== '' && error}
				<TextInput
					handleInput={e => setCode(e.target.value)}
					value={code}
					label={'Group Code'}
				/>
				<SubmitButton onClick={handleCreate}>Submit</SubmitButton>
			</>
		</>
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

export default JoinGroup
