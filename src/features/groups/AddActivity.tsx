import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import { addActivity } from 'store/slices/groupsSlice'
import { ModalTitle, SubmitButton } from 'components/styled'

interface Props {
	hideModal: () => void
	groupID: string
}

const AddActivityModal: FunctionComponent<Props> = ({ hideModal, groupID }) => {
	const [name, setName] = useState('')
	const [unit, setUnit] = useState('')
	const [vote, setVote] = useState(0)
	const [error, setError] = useState('')

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
			await dispatch(addActivity(groupID, activity, vote))
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
				value={unit.split('_').join(' ')}
				label={'action unit'}
			/>
			<TextInput
				handleInput={e => setVote(Math.abs(parseInt(e.target.value)))}
				value={vote.toString()}
				type={'number'}
				label={'Your Vote'}
			/>
			<SubmitButton onClick={handleAdd}>Submit</SubmitButton>
		</Modal>
	)
}

export default AddActivityModal
