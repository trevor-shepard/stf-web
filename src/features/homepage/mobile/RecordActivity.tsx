import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { RootState } from 'store/rootReducer'
import styled from '@emotion/styled'
import Modal from 'components/Modal'
import TextInput from 'components/inputs/text'
import { recordActivity } from 'store/slices/membersSlice'

interface Props {
	hideModal: () => void
}

const RecordActivity: FunctionComponent<Props> = ({ hideModal }) => {
	const [loading, setLoading] = useState(false)
	const groups = useSelector((state: RootState) => state.groups)
	const [activity, setActivity] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [date, setDate] = useState(moment().format('YYYY/M/D'))
	const [time, setTime] = useState(moment().format('HH:mm'))
	const [verb, unit] = activity.split('$')
	const dispatch = useDispatch()

	// get all verbs from all groups
	const activities = Object.keys(
		Object.values(groups).reduce((acc, group) => {
			const { activities } = group

			return { ...acc, ...activities }
		}, {})
	).map(_activity => {
		const [verb, unit] = _activity.split('$')
		return (
			<div onClick={() => setActivity(_activity)}>
				{verb.split('_').join(' ')} -- {unit}
			</div>
		)
	})

	const handleSubmit = async () => {
		try {
			setLoading(true)
			const dateTime = parseInt(moment(`${date} ${time}`).format('X'))
			await dispatch(recordActivity(dateTime, activity, quantity))

			hideModal()
		} catch (error) {
			setLoading(false)
		}
	}

	return activity === '' ? (
		<Modal hideModal={hideModal}>
			<Title>Record An Activity</Title>
			{activities}
		</Modal>
	) : (
		<Modal hideModal={hideModal}>
			{loading ? (
				<>loading</>
			) : (
				<>
					<Title>
						{verb.split('_').join(' ')} 1 {unit} on {date} at {time}
					</Title>
					<TextInput
						handleInput={e => setQuantity(parseInt(e.target.value))}
						value={quantity.toString()}
						type={'number'}
						label={'your Vote'}
					/>

					<TextInput
						handleInput={e => {
							setDate(e.target.value)
						}}
						value={date.toString()}
						type={'date'}
						label={'date completed'}
					/>
					<TextInput
						handleInput={e => {
							setTime(e.target.value)
						}}
						value={time.toString()}
						type={'time'}
						label={'time completed'}
					/>

					<SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
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

export default RecordActivity