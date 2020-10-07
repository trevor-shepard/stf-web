import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import { createGroup } from 'store/slices/groupsSlice'

interface Props {
	hideModal: () => void
}

const CreateGroup: FunctionComponent<Props> = ({ hideModal }) => {
	const [name, setName] = useState('')
	const [error, setError] = useState('')

	const dispatch = useDispatch()

	const handleCreate = async () => {
		if (name === '') {
			setError('name cant be blank')
		} else {
			dispatch(createGroup(name))
		}
	}

	return (
		<Modal hideModal={hideModal}>
			<Title>Start a Group</Title>
			{error !== '' && error}
			<TextInput
				handleInput={e => setName(e.target.value)}
				value={name}
				label={'Group Name'}
			/>
			<SubmitButton onClick={handleCreate}>Submit</SubmitButton>
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

export default CreateGroup
