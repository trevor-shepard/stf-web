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
	const [error, setError] = useState('')
	const handleImageAsFile = (event: FormEvent) => {
		const target = event.target as HTMLInputElement
		const files = target.files
		if (files === null) return setError('no image found')
		const image = files[0]
		setImageAsFile(image)
	}

	const handleFireBaseUpload = async (e: FormEvent) => {
		e.preventDefault()
		console.log('start of upload')
		if (imageAsFile === null)
			return setError(`not an image, the image file is a ${typeof imageAsFile}`)
		const uploadTask = storage
			.ref(`/images/${username}/`)
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
				setError('sorry there was a problem. check internet connection and try again')
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
			<form>
				<input type="file" onChange={handleImageAsFile} />
				<SubmitButton onClick={handleFireBaseUpload} />
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

export default AddActivityModal
