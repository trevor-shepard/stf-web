import React, { FunctionComponent, useState, FormEvent } from 'react'
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
	name?: string
}

const RecordActivity: FunctionComponent<Props> = ({ hideModal, name }) => {
	const [loading, setLoading] = useState(false)
	const groups = useSelector((state: RootState) => state.groups)
	const [activity, setActivity] = useState(name ? name : '')
	const [quantity, setQuantity] = useState(1)
	const [date, setDate] = useState(moment().format('YYYY/M/D'))
	const [time, setTime] = useState(moment().format('HH:mm'))

	const [imageAsFile, setImageAsFile] = useState<null | File>(null)
	const [fileAsImage, setFileAsImage] = useState<null | string>(null)
	const [error, setError] = useState('')

	const handleImageAsFile = (event: FormEvent) => {
		const target = event.target as HTMLInputElement
		const files = target.files
		if (files === null) return setError('no image found')
		const file = files[0]
		const image = URL.createObjectURL(file)
		setImageAsFile(file)
		setFileAsImage(image)
	}

	const [verb, unit] = activity.split('$')
	const dispatch = useDispatch()

	// get all verbs from all groups
	const activities = Object.keys(
		Object.values(groups).reduce((acc, group) => {
			const { activities } = group

			return { ...acc, ...activities }
		}, {})
	).map((_activity, i) => {
		const [verb, unit] = _activity.split('$')
		return (
			<div key={`${i}-activity-item`} onClick={() => setActivity(_activity)}>
				{verb.split('_').join(' ')} -- {unit}
			</div>
		)
	})

	const handleSubmit = async () => {
		try {
			setLoading(true)
			const dateTime = parseInt(moment(`${date} ${time}`).format('X'))
			await dispatch(recordActivity(dateTime, activity, quantity, imageAsFile))

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
						{verb.split('_').join(' ')} {unit}
					</Title>
					{error && <Error>{error}</Error>}
					
					<SubTitle>
						{date} at {time}
					</SubTitle>
					{fileAsImage && (
						<ImgContainer>
							<Image src={fileAsImage} />
						</ImgContainer>
					)}

					<input type="file" onChange={handleImageAsFile} />

					<TextInput
						handleInput={e => setQuantity(parseInt(e.target.value))}
						value={quantity.toString()}
						type={'number'}
						label={'amount'}
					/>

					<TextInput
						handleInput={e => {

							const date = e.target.value
							const future = moment(date).isAfter()
							
							if (future) {
								setError('date cannot be in the future')
							} else {
								setDate(e.target.value)
							}

							
						}}
						value={date.toString()}
						type={'date'}
						label={'date'}

					/>
					<TextInput
						handleInput={e => {
							const momentDate = moment(e.target.value).set('date', moment(date).date()).set('month', moment(date).month()).set('year', moment(date).year())
							
							const future = momentDate.isAfter()
							
							if (future) {
								setError('date cannot be in the future')

							} else {
								setTime(e.target.value)
							}
							
						}}
						value={time.toString()}
						type={'time'}
						label={'time'}
					/>

					<SubmitButton onClick={handleSubmit}>submit</SubmitButton>
				</>
			)}
		</Modal>
	)
}

const Title = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 22px;
`

const SubTitle = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: 200;
	font-size: 14px;
`

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

const ImgContainer = styled.div`
	margin-top: 10%;
	width: 100%;
	overflow: hidden;
	border-radius: 100px;
`

const Image = styled.img`
	height: 178px;
	width: 178px;
	border-radius: 100px;
	object-fit: cover;
`

const Error = styled.div`
	border-radius: 2px;
	background: #cc3b3b
		url(//assets.squarespace.com/universal/images-v6/standard/icon_close_7_light.png)
		no-repeat 9px 50%;
	color: #fff;
	display: inline-block;
	font-size: 13px;
	line-height: 23px;
	margin: 12px 0;
	padding: 5px 15px 3px 25px;
`

export default RecordActivity
