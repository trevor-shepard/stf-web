import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import { addActivity } from 'store/slices/groupsSlice'

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
			<Title>add a activity</Title>
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
				handleInput={e => setVote(parseInt(e.target.value))}
				value={vote.toString()}
				type={'number'}
				label={'Your Vote'}
			/>
			<SubmitButton onClick={handleAdd}>Submit</SubmitButton>
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

export default AddActivityModal
