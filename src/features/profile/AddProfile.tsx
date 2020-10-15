import React, { FunctionComponent, useState, FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Modal from 'components/Modal'
import { storage } from 'utils/firebase'
import { addUserPhoto } from 'store/slices/userSlice'
interface Props {
	hideModal: () => void
	username: string
}

const AddActivityModal: FunctionComponent<Props> = ({
	hideModal,
	username
}) => {
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

	const handleFireBaseUpload = async (e: FormEvent) => {
		e.preventDefault()
		console.log('start of upload')
		if (imageAsFile === null)
			return setError(`not an image, the image file is a ${typeof imageAsFile}`)
		const uploadTask = storage
			.ref(`/images/${username}/${imageAsFile.name}`)
			.put(imageAsFile)
		uploadTask.on(
			'state_changed',
			// monitor upload
			snapShot => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot)
			},
			err => {
				//catches the errors
				setError(
					'sorry there was a problem. check internet connection and try again'
				)
			},
			async () => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				const downloadUrl = await storage
					.ref(`/images/${username}/`)
					.child(imageAsFile.name)
					.getDownloadURL()

				await dispatch(addUserPhoto(downloadUrl))

				hideModal()
			}
		)
	}

	const dispatch = useDispatch()

	return (
		<Modal hideModal={hideModal}>
			<Title>upload a profile picture</Title>
			{error !== '' && error}
			{fileAsImage && (
				<ProfileImageContainer>
					<ProfileImage src={fileAsImage} />
				</ProfileImageContainer>
			)}
			<form>
				<input type="file" onChange={handleImageAsFile} />
				<SubmitButton onClick={handleFireBaseUpload}>submit</SubmitButton>
			</form>
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

const ProfileImageContainer = styled.div`
	margin-top: 10%;
	width: 100%;
	overflow: hidden;
	border-radius: 100px;
`

const ProfileImage = styled.img`
	height: 178px;
	width: 178px;
	border-radius: 100px;
	object-fit: cover;
`

export default AddActivityModal
