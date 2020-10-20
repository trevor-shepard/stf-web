import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import TextInput from 'components/inputs/text'
import { ModalTitle, SubmitButton } from 'components/styled'
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
			<Toggle onClick={toggleModal}>Create</Toggle>

			<ModalTitle>Join Group</ModalTitle>
			{error !== '' && error}
			<TextInput
				handleInput={e => setCode(e.target.value)}
				value={code}
				label={'Group Code'}
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

export default JoinGroup
