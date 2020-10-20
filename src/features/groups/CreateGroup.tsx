import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import TextInput from 'components/inputs/text'
import { ModalTitle, SubmitButton } from 'components/styled'
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
			<Toggle onClick={toggleModal}>Join</Toggle>
			<ModalTitle>Start a Group</ModalTitle>
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

const Toggle = styled.div`
	font-family: Amsi Pro Narw;
	font-size: 10px;
	position: absolute;
	right: 10px;
	top: 10px;
`

export default CreateGroup
