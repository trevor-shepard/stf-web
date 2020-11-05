import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import { addActivity } from 'store/slices/groupsSlice'
import { ModalTitle, SubmitButton } from 'components/styled'
import IconPicker from './IconPicker'
import { Icons } from 'types'

interface Props {
	hideModal: () => void
	groupID: string
}

const AddActivityModal: FunctionComponent<Props> = ({ hideModal, groupID }) => {
	const [name, setName] = useState('')
	const [unit, setUnit] = useState('')
	const [vote, setVote] = useState<number | '-' | null>(0)
	const [error, setError] = useState('')
	const [icon, setIcon] = useState<Icons>('run')
	const dispatch = useDispatch()

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		const num =
			val !== '' ? (val === '-' ? '-' : parseInt(val)) : null
		setVote(num)
	}


	const handleAdd = async () => {
		if (name === '') {
			setError('name cant be blank')
		} else if (unit === '') {
			setError('unit cant be blank')
		} else {

			if (!vote || vote === '-') return setError('vote invalid')
			const activity = `${name.split(' ').join('_')}$${unit
				.split(' ')
				.join('_')}`.toLocaleLowerCase()
			await dispatch(addActivity(groupID, activity, vote, icon))
			hideModal()
		}
	}

	return (
		<Modal hideModal={hideModal}>
			<TitleBar>
				<IconPicker icon={icon} setIcon={setIcon} />

				<ModalTitle>add a activity</ModalTitle>
			</TitleBar>
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
				handleInput={handleInput}
				value={vote ? vote.toString() : ''}
				type={'number'}
				label={'your vote'}
			/>
			<SubmitButton onClick={handleAdd}>Submit</SubmitButton>
		</Modal>
	)
}

const TitleBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

export default AddActivityModal
