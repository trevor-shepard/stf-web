import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import { addActivity } from 'store/slices/groupsSlice'
import { ModalTitle, SubmitButton } from 'components/styled'

interface Props {
	hideModal: () => void
	groupID: string
	display: 'fame' | 'shame' | 'members'
}

const AddActivityModal: FunctionComponent<Props> = ({
	hideModal,
	groupID,
	display
}) => {
	const [name, setName] = useState('')
	const [unit, setUnit] = useState('')
	const [vote, setVote] = useState(0)
	const [error, setError] = useState('')

	const isShame = display === 'shame'

	const dispatch = useDispatch()

	const handleAdd = async () => {
		if (name === '') {
			setError('name cant be blank')
		} else if (unit === '') {
			setError('unit cant be blank')
		} else {
			const activity = `${name.split(' ').join('_')}$${unit
				.split(' ')
				.join('_')}`.toLocaleLowerCase()
			await dispatch(addActivity(groupID, activity, isShame ? vote * -1 : vote))
			hideModal()
		}
	}

	return (
		<Modal hideModal={hideModal}>
			<ModalTitle>add a activity</ModalTitle>
			{error !== '' && error}
			<TextInput
				handleInput={e => setName(e.target.value)}
				value={name}
				label={'action name'}
			/>
			<TextInput
				handleInput={e => setUnit(e.target.value)}
				value={unit}
				label={'action unit'}
			/>
			<TextInput
				handleInput={e => setVote(Math.abs(parseInt(e.target.value)))}
				value={isShame ? (vote * -1).toString() : vote.toString()}
				type={'number'}
				label={'Your Vote'}
			/>
			<SubmitButton onClick={handleAdd}>Submit</SubmitButton>
		</Modal>
	)
}


export default AddActivityModal
