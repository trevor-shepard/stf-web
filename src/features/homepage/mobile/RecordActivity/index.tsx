import React, { FunctionComponent, useState } from 'react'
import Modal from 'components/Modal'
import Select from './Select'
import Record from './Record'

interface Props {
	hideModal: () => void
}

const RecordActivity: FunctionComponent<Props> = ({ hideModal }) => {
	const [activity, setActivity] = useState('')
	return (
		<Modal hideModal={hideModal}>
			{activity === '' ? (
				<Select setActivity={setActivity} />
			) : (
				<Record hideModal={hideModal} activity={activity} />
			)}
		</Modal>
	)
}

export default RecordActivity
