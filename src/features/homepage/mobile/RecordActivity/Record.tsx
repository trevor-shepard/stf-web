import React, { FunctionComponent, useState, FormEvent } from 'react'
import styled from '@emotion/styled'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import TextInput from 'components/inputs/text'
import { recordActivity } from 'store/slices/membersSlice'
interface Props {
	activity: string
	hideModal: () => void
}

const Record: FunctionComponent<Props> = ({ activity, hideModal }) => {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
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

	return (
		<>
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
					<FileInput id="upload" type="file" onChange={handleImageAsFile} />

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
							const momentDate = moment(e.target.value)
								.set('date', moment(date).date())
								.set('month', moment(date).month())
								.set('year', moment(date).year())

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
		</>
	)
}

const Title = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 22px;
	margin-top: 5%;
`

const SubTitle = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: 200;
	font-size: 14px;
`

const FileInput = styled.input``

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

export default Record
