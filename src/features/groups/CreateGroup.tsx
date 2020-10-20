import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import TextInput from 'components/inputs/text'
import { createGroup } from 'store/slices/groupsSlice'

interface Props {
	toggleModal: () => void
	hideModal: () => void
}

const CreateGroup: FunctionComponent<Props> = ({ toggleModal, hideModal }) => {
	const [name, setName] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const handleCreate = async () => {
		if (name === '') {
			setError('name cant be blank')
		} else {
			try {
				setLoading(true)
				await dispatch(createGroup(name))
				hideModal()
			} catch (error) {
				setError('name cant be blank')
				setLoading(false)
			}
		}
	}

	return loading ? (
		<>loading</>
	) : (
		<>
			<div onClick={toggleModal}>Join Group</div>
			<Title>Start a Group</Title>
			{error !== '' && error}
			<TextInput
				handleInput={e => setName(e.target.value)}
				value={name}
				label={'Group Name'}
			/>
			<SubmitButton onClick={handleCreate}>Submit</SubmitButton>
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

export default CreateGroup
